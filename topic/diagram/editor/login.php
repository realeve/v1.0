﻿<?php

/*
Copyright [2014] [Scriptoid s.r.l]

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

require_once dirname(__FILE__) . '/common/delegate.php';

if (!isset($_SESSION)) {
    session_start();
}

$delegate = new Delegate();

$VERSION = $delegate->settingsGetByKeyNative('VERSION');


/**
 * Redirect to 'draw' if we are alredy logged or if we have 'remember me' option active
 * 
 * [1] Session method
 * Check is user id session is set and is numeric
 */
if (isset($_SESSION['userId']) AND is_numeric($_SESSION['userId'])) {

    // Load user as object, from SQL by id
    $loggedUser = $delegate->userGetById(abs(intval($_SESSION['userId'])));

    // If exists a logged user
    if (isset($loggedUser) && is_numeric($loggedUser->id)) {
        redirect('./editor.php');
    }

    /**
     * [2] Cookie method
     * Check if user cookie is set
     */
} elseif (isset($_COOKIE['biscuit'])) {

    // Decode the cookie data
    $userCookie = packer($_COOKIE['biscuit'], PACKER_UNPACK);

    // Validate data
    if (validateEmail($userCookie['email'], null) AND validateString($userCookie['password'], null, 1)) {
        // Load user as object, from SQL by id
        $loggedUser = $delegate->userGetByEmailAndCryptedPassword($userCookie['email'], $userCookie['password']);

        // If user is an object
        if (is_object($loggedUser)) {
            $_SESSION['userId'] = $loggedUser->id;
            redirect('./editor.php');
        }
    }
}
?>

<!DOCTYPE html>
<html>

<?
$title = "Login | Diagramo";
$description = $title;

$key = explode(" ", $description);
$keywords = trim($key[0]);
for ($i = 1; $i < count($key); $i++)
    $keywords .= "," . trim($key[$i]);
?>
    <head>
        <title><? echo $title; ?></title>
        <meta http-equiv="X-UA-Compatible" content="IE=9" />
        <meta name="description" content="<? echo $description; ?>" />
        <meta name="keywords" content="<? echo $keywords; ?>" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
        <meta name="author" content="http://diagramo.com" />
        <meta name="language" content="en-us" />
        <meta name="robots" content="index,follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />

        <link rel="stylesheet" type="text/css" href="./assets/css/style.css" />
        <link rel="stylesheet" type="text/css" href="./assets/css/style_1.css" />

        <? include "qunit-tests-header.php"; ?>
    </head>

    <body>

<? include "outsideheader.php"; ?>

        <h1>登录</h1>

        <div class="content">
            <?require_once './common/messages.php';?>

            <form action="./common/controller.php" method="POST">
                <input type="hidden" name="action" value="loginExe"/>
                <table>
                    <tr>
                        <td>用户名:<br /><input tabindex="1" type="text" name="email" value="test" class="myinput" /></td>
                    </tr>
					<!--<?=@$_REQUEST['password']?>-->
                    <tr>
                        <td><br />密码:<br /><input tabindex="2" type="password" name="password" size="15" class="myinput" value="test" /></td>
                    </tr>
                    <tr>
                        <td><input type="checkbox" checked name="rememberMe" value="true" /> 保持登录状态 </td>
                    </tr>
                    <tr>
                        <td valign="middle"><br /><input type="submit" value="登录" class="mysubmit" /></td>
                    </tr>
                </table>
                <br/>
                <!-- <a style="font-size: smaller;" href="./register.php">Create account</a> | -->
                <!-- <a style="font-size: smaller;" href="./forgot-password.php">Forgot password?</a>                 -->
            </form>

        </div>

        <? include "footer.php"; ?>

    </body>
</html>