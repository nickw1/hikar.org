<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\OAuth;
use League\OAuth2\Client\Provider\Google;

require_once('private/defines.php');

class UserController {

    protected $view, $router, $db;

    public function __construct($view, $router, $db) {
        $this->view = $view;
        $this->router = $router;
        $this->db = $db;
    }

    public function getLogin(Request $req, Response $res, array $args){
        return $res->withJson(["username"=>(isset($_SESSION["userid"])) ? $this->getUsername($_SESSION["userid"]):null, "userid"=>isset($_SESSION["userid"]) ? $_SESSION["userid"]:0]);
    }

    public function login(Request $req, Response $res, array $args) {
        $post = $req->getParsedBody();
        $stmt = $this->db->prepare("SELECT * FROM users WHERE username=?");
        $stmt->execute([$post["username"]]);
        $row = $stmt->fetch();
        if($row == false) {
            return $res->withStatus(401)->withJson(["error"=>"Unknown username."]);
        } elseif(password_verify($post["password"], $row["password"])) {
            $_SESSION["userid"] = $row["id"];
            if($row["isadmin"]==1) {
                $_SESSION["isadmin"] = $row["isadmin"];
            }
            return $res->withJson(["username"=>$this->getUsername($_SESSION["userid"]), "userid"=>$_SESSION["userid"]]);
        } else {
            return $res->withStatus(401)->withJson(["error"=>"Incorrect password."]);
        }
    }

    public function logout(Request $req, Response $res, array $args) {
        session_destroy();
        return $res;
    }

    public function signup(Request $req, Response $res, array $args) {
        $post = $req->getParsedBody();
        if($post["username"]=="" || $post["password"]=="") {
            return $res->withJson(["error"=>"Username and/or password blank."]);
        } elseif(!filter_var($post["username"], FILTER_VALIDATE_EMAIL)) {
            return $res->withJson(["error"=>"That is not a valid email address."]); 
        } elseif(strlen($post['password'])<8) {
            return $res->withJson(["error"=>"Password should be at least 8 characters."]); 
        } elseif($post["password"] != $post["password2"]) {
            return $res->withJson(["error"=>"Passwords do not match."]); 
        } else {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE username=?");
            $stmt->execute([$post["username"]]);
            if($stmt->fetch()) {
                return $res->withJson(["error"=>"This username already exists, please choose another one."]);
            } else {
                   $stmt=$this->db->prepare("INSERT INTO users (username, password) VALUES(?,?)");
                $stmt->execute([$post["username"], password_hash($post["password"], PASSWORD_DEFAULT)]);
        
                return $res->withJson(["username"=>$post["username"]]);
            }
        }
    }



    public function forgotPassword(Request $req, Response $res, array $args) {
        return $this->view->render($res, 'forgotpassword.phtml', ["router"=>$this->router]);
    }

    public function forgotPasswordAction(Request $req, Response $res, array $args) {
        $post = $req->getParsedBody();
        if(!filter_var ($post["email"], FILTER_VALIDATE_EMAIL)) {
            $res = $this->view->render($res, 'forgotpassword.phtml', ["msg"=>"That is not a valid email address.", "router"=>$this->router]);
        } else {
            $stmt = $this->db->prepare("SELECT * FROM users WHERE username=?");
            $stmt->execute([$post["email"]]);
            if(($row = $stmt->fetch()) === false) {
                $res = $this->view->render($res, 'forgotpassword.phtml',["msg"=>"No user matching email address '$post[email]'.", "router"=>$this->router]);
            } else {
                $stmt = $this->db->prepare("DELETE FROM forgotten_passwords WHERE userid=?");
                $stmt->execute([$row["id"]]);
                $token = bin2hex(random_bytes(64));
                $stmt = $this->db->prepare("INSERT INTO forgotten_passwords (userid, token, timestamp) VALUES (?,?,?)");
                $stmt->execute([$row["id"], $token, time()]);
                $this->mailForgottenPassword($post["email"], $row["id"], $token);
                $res = $this->view->render($res, 'forgotpassword.phtml',["msg"=>"An email has been sent, please check your inbox and if nothing appears, please also check your spam folder.", "router"=>$this->router]);
            }
        }
        return $res;
    }


    public function resetPassword(Request $req, Response $res, array $args) {
        $get = $req->getQueryParams();
        return $this->view->render($res, 'forgotpassword.phtml',["userid"=>$get["userid"], "token"=>$get["token"], "router"=>$this->router]);
    }

    public function doResetPassword (Request $req, Response $res, array $args) {
        $post = $req->getParsedBody();
        if(!isset($post["password"]) || strlen($post['password'])<8) {
            $res = $this->view->render($res, 'forgotpassword.phtml',["msg"=>"Invalid password, must be at least 8 characters.", "router"=>$this->router]);
        } else {    
            $stmt = $this->db->prepare("SELECT * FROM forgotten_passwords WHERE userid=? AND token=? AND timestamp > ".(time()-3600));
            $stmt->execute([$post["userid"], $post["token"]]);
            if (($row = $stmt->fetch()) === false) {
                $res = $this->view->render($res, 'forgotpassword.phtml',["msg"=>"The attempt to update the password failed. Note that you must respond to the forgotten password email within an hour.", "router"=>$this->router]);
            } else {
                $stmt = $this->db->prepare("UPDATE users SET password=? WHERE id=?");
                $stmt->execute([password_hash($post["password"], PASSWORD_DEFAULT), $post["userid"]]);
                $res = $this->view->render($res, 'forgotpassword.phtml',["msg"=>"Successfully updated password. Please access the site via logging in.", "router"=>$this->router]);
            }
        }
        $stmt = $this->db->prepare("DELETE FROM forgotten_passwords WHERE userid=?");
        $stmt->execute([$post["userid"]]);
        return $res;
    }

    private function getUsername($userid) {
    
        $stmt = $this->db->prepare("SELECT username FROM users WHERE id=?");
        $stmt->execute([$userid]);
        $row = $stmt->fetch();
        return $row["username"];
    
    }

    private function mailForgottenPassword($email, $userid, $token) {

        date_default_timezone_set('Europe/London');

        $mail = new PHPMailer(true);

        try {

            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->AuthType = 'XOAUTH2';
            $from = 'hikar.app@gmail.com';

            $mail->SMTPSecure = 'tls';
            $mail->Port = 587;

            $provider = new Google(["clientId"=>MAIL_CLIENT_ID,
                                "clientSecret"=>MAIL_CLIENT_SECRET]);

            $mail->setOAuth(new OAuth(["provider"=>$provider, 
                                   "clientId"=>MAIL_CLIENT_ID, 
                                   "clientSecret"=>MAIL_CLIENT_SECRET, 
                                   "refreshToken"=>MAIL_REFRESH_TOKEN,
                                   "userName"=>$from]));

            $mail->setFrom($from, 'Hikar Admin');
            $mail->addAddress($email, $email);
            $mail->isHTML(true);
            $mail->Subject = 'Hikar Password Reset';
            $mail->Body = "<p>You recently requested to reset your Hikar password. Please click <a href='{$_SERVER['SERVER_NAME']}{$this->router->pathFor('resetPassword')}?userid=$userid&amp;token=$token'>here</a> to reset your password. Please do it within one hour of receiving this email, otherwise the link will expire and you'll have to do another forgotten password request.</p><p>The Hikar administrators. <a href='mailto:hikar.app@gmail.com'>hikar.app@gmail.com</a></p>";
            $mail->send();
        } catch(Exception $e) {
//            echo $mail->ErrorInfo;
        }
    }
}
