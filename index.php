<?php

session_start();

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require_once('controllers/UserController.php');
require_once('defines.php');

$app = new \Slim\App;

$container = $app->getContainer();
$container['db'] = function() {
    $conn = new PDO("pgsql:host=localhost;dbname=".DB_DBASE, DB_USER);
    return $conn;
};
$container['view'] = new \Slim\Views\PhpRenderer('views');

$container["UserController"] = function($c) {
    return new UserController($c->get('view'), $c->get('router'), $c->get('db'));
};

$app->get('/', function(Request $req, Response $res, array $args) {
        return $this->view->render($res, "index.phtml", ["router"=>$this->router]);
} )->setName('root');


$app->get('/login', \UserController::class.':getLogin');
$app->post('/login', \UserController::class.':login'); 
$app->post('/logout', \UserController::class.':logout'); 
$app->post('/signup', \UserController::class.':signup'); 
$app->get('/forgotPassword', \UserController::class.':forgotPassword'); 
$app->post('/forgotPasswordAction', \UserController::class.':forgotPasswordAction'); 
$app->get('/resetPassword', \UserController::class.':resetPassword')->setName('resetPassword');
$app->post('/doResetPassword', \UserController::class.':doResetPassword'); 
$app->run();

?>
