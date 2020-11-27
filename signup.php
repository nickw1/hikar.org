<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Hikar - OpenStreetMap Augmented Reality for Walkers and Hikers</title>
<link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
<link rel='stylesheet' type='text/css' href='css/hikar.css' />
</head>
<body>
<div id='main'>
    <div id='heading'>
        <div id='headingContainer'>
            <p id='headingLinks' style='float: right'>
                <a href='index.html'>Back to main page</a>
            </p>
            <h1>Hikar - Signup</h1>
        </div>
    </div>
<?php
$displayForm = true;
if(isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["password2"])) {
    echo "<strong>";
    if($_POST["username"]=="" || $_POST["password"]=="") {
        echo "Username and/or password blank.";
    } elseif(!filter_var($_POST["username"], FILTER_VALIDATE_EMAIL)) {
        echo "That is not a valid email address."; 
    } elseif(strlen($_POST['password'])<8) {
        echo "Password should be at least 8 characters.";
    } elseif($_POST["password"] != $_POST["password2"]) {
       echo "Passwords do not match."; 
    } else {
        $conn= new PDO("pgsql:host=localhost;dbname=gis", "gis");
        $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
        $stmt->execute([$_POST["username"]]);
        if($stmt->fetch()) {
           echo "This username already exists."; 
        } else {
            $stmt=$conn->prepare("INSERT INTO users (username, password) VALUES(?,?)");
            $stmt->execute([$_POST["username"], password_hash($_POST["password"], PASSWORD_DEFAULT)]);
            echo "Signup successful!";
            $displayForm = false;
        }
    }
    echo "</strong>";
} else {
?>
<p>Signing up allows you to add virtual noticeboards from within the app.
Please supply your email address and password below. <strong>Please avoid using a password that you use for security-critical activities such as email, online banking, social networks, etc</strong>; though this site takes standard security measures to protect your data (e.g. the use of HTTPS, password hashing, and protection from common vulnerabilities in web applications), it is a personal rather than corporate site and has not had a security audit carried out by an experienced security professional.</p>
<p>Signing up for an account will also register you for <a href='https://opentrailview.org'>OpenTrailView</a>.</p>
<?php
}
if($displayForm) {
?>
<form method='post'>
<label for='username'>Email:</label><br />
<input name='username' id='username' type='text' /><br />
<label for='password'>Password:</label><br />
<input name='password' id='password' type='password' /><br />
<label for='password2'>Repeat Password:</label><br />
<input name='password2' id='password2' type='password' /><br />
<input type='submit' value='Go!' />
</form>
<?php
}
?>
</body>
</html>
