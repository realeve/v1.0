<?php

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


/**Colaborators are per diagram*/

require_once dirname(__FILE__) . '/common/delegate.php';

if (!isset($_SESSION)) {
    session_start();
}

require_once dirname(__FILE__) . '/common/rememberme.php';

if (!isset($_SESSION['userId']) || !is_numeric($_SESSION['userId'])) {
    addError("Access denied");
    redirect('./index.php');
}




$delegate = new Delegate();

$loggedUser = $delegate->userGetById($_SESSION['userId']);
$users = $delegate->userGetAll();

$page = 'users';

$rawLicense = $delegate->settingsGetByKeyNative('LICENSE');
$l = new License();
if(trim($rawLicense) != ''){
    $l->load($rawLicense);
}

$currentHost = $_SERVER['HTTP_HOST'];
if(strpos($currentHost, ':')){
    $currentHost = substr($currentHost, 0, strpos($currentHost, ':'));
}

?>

<!DOCTYPE html>
<html>
    <!--Copyright 2010 Scriptoid s.r.l-->
    <head>
        <title>用户 - Diagramo</title>
        <meta http-equiv="X-UA-Compatible" content="IE=9" />
        <link rel="stylesheet" media="screen" type="text/css" href="assets/css/style.css" />
        <script type="text/javascript" src="./assets/javascript/dropdownmenu.js?<?=time()?>"></script>    
        <script type="text/javascript">
            function confirmation(message){
                var answer = confirm(message);
                if(answer){
                    return true;
                }

                return false;
            }                        
        </script>
        
        <script type="text/javascript" src="./assets/javascript/dropdownmenu.js?<?=time()?>"></script>    
        <script type="text/javascript" src="./lib/browserReady.js?<?=time()?>"></script>
        <script type="text/javascript" src="./lib/log.js?<?=time()?>"></script>
    </head>
    <body>
        <? require_once dirname(__FILE__) . '/header.php'; ?>

        <div id="content" style="text-align: left; /*border: solid 1px red;*/ padding-left: 100px;">
            <? require_once dirname(__FILE__) . '/common/messages.php'; ?>
            <br/>

            <?if(!$l->checkLicense() ){ ?>    
                <div>
                    <div style="margin: 10px auto; width: 600px;">
                        This feature is disable in free version. 
                        <p/>
                        Please <a href="./license.php"><img style="vertical-align: middle;" src="assets/images/upgrade-button.png" /></a> to be enable these feature.
                    </div> 
                </div>            
            <?} else if(false && $l->host != $currentHost) {?>
                <div style="margin: 10px auto; width: 600px;">
                    License host (<?=$l->host?>) is wrong. IT should be <?=$currentHost?> 
                    <p/> 
                    Please <a href="./license.php"><img style="vertical-align: middle;" src="assets/images/upgrade-button.png" /></a> to be enable these feature.
                </div>            
            <?} else {?>
                <!--Collaborators-->
                <?if(count($users) > 0 ){?>
                <!--div class="form"  style="width: 600px;">
                    <div class="formTitle" >
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="400"><span class="formLabel" style="font-size: 14px; font-family: Arial; color: #6E6E6E;">用户列表</span></td>
                                <td colspan="2">&nbsp;</td>
                            </tr>
                        </table>
                    </div>

                    <table border="0" width="100%">
                        <tr>
                            <td><span class="formLabel">名字</span></td>
                            <td align="center"><span class="formLabel">删除</span></td>
                        </tr>
                        <?foreach($users as $user){                        
                        ?>
                        <tr>
                            <td align="left">
                                <?=$user->email?>
                            </td>

                            <td align="center">
                                <? if($user->id == $_SESSION['userId']){?>
                                    N/A
                                <?}else{?>                            
                                    <a onclick="return confirmation('Are you sure you want to remove the collaborator?');" href="./common/controller.php?action=removeUser&userId=<?=$user->id?>"><img style="vertical-align:middle; margin-right: 3px;" src="./assets/images/remove.gif" border="0" width="24" height="24"/></a>                        
                                <?}?>
                            </td>
                        </tr>
                        <?}?>
                    </table>
                </div-->            
                <?}else{?>
                    无用户
                <?}?>
                <!--End collaborators-->


                <p/>

                <!--Add known people-->

                <div class="form"  style="width: 600px;">
                    <div class="formTitle" >
                        <table width="100%" border="0" cellpadding="0" cellspacing="0">
                            <tr>
                                <td width="400"><span class="formLabel" style="font-size: 14px; font-family: Arial; color: #6E6E6E;">添加帐户</span></td>
                                <td colspan="2">&nbsp;</td>
                            </tr>
                        </table>
                    </div>

                    <form action="./common/controller.php" method="POST">
                        <input type="hidden" name="action" value="addUserExe"/>
                        <label for="email">用户名</label><br/>
                        <input type="text" name="email" id="email" /><br/>
                        <label for="password">密码</label><br/>
                        <input type="text" name="password" id="password" /><br/>                    
                        <input type="submit" value="添加"/>
                    </form>
                </div>

                <!--End add collaborator-->




                <p/>
    <!--            <div class="form"  style="width: 600px;">
                    <a href="./editor.php?diagramId=<?=$_REQUEST['diagramId']?>">back to diagram</a>
                </div>-->
            
            <?}?>
        </div>

        <p></p>
        <div class="copyright">&copy; <?=date('Y') ?> Diagramo</div>

    </body>
</html>
