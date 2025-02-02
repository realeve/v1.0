<?php

/*
Copyright [2014] [Diagramo]

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

/* This page is used for both logged users and outsiders to */
require_once dirname(__FILE__) . '/common/delegate.php';



if (!isset($_SESSION)) {
    session_start();
}

if (!isset($_SESSION['userId'])) {
    echo "Sic";
    exit();
}

if (!isset($_REQUEST['diagramId'])) {
    echo "No diagram selected";
    exit();
}

$delegate = new Delegate();


$diagram = $delegate->diagramGetById($_REQUEST['diagramId']);

//print_r($diagram);
//exit();

$page = 'editDiagram';
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Diagramo - 编辑图表</title>
        <meta http-equiv="X-UA-Compatible" content="IE=9" />
        <meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8" />
        <link rel="shortcut icon" href="./favicon.ico" type="image/x-icon" />
        <link href="./assets/css/style.css" type="text/css" rel="stylesheet"/>
        
        <script type="text/javascript" src="./assets/javascript/dropdownmenu.js?<?=time()?>"></script>    
        <script type="text/javascript" src="./lib/browserReady.js?<?=time()?>"></script>
        <script type="text/javascript" src="./lib/log.js?<?=time()?>"></script>
    </head>
    <body>
        <div id="page">
            <? require_once dirname(__FILE__) . '/header.php'; ?>

            

            <div id="content">
                
                <? require_once dirname(__FILE__) . '/common/messages.php'; ?>
                <br/>
                <div class="form" style="width: 400px;">
                    <div class="formTitle" >
                        <span class="menuText" style="font-size: 14px; font-family: Arial; color: #6E6E6E;">编辑</span>
                    </div>
                    
                    <form  style="position: relative; height: 270px;" action="./common/controller.php" method="post">
                        <input type="hidden" name="action" value="editDiagramExe"/>
                        <input type="hidden" name="diagramId" value="<?=$diagram->id ?>"/>
                        <div style="position: absolute; top: 10px; left: 20px; right: 20px;">
                            <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td><span class="formLabel">标题</span></td>
                                    <td width="100%">&nbsp;</td>
                                    <td> <input class="formField" style="margin-right: 0;" type="text" name="title" size="40" value="<?=$diagram->title?>"/></td>
                                </tr>
                            </table>
                        </div>

                        <div style="position: absolute; top: 50px; left: 20px;">
                             <span class="formLabel">描述(可选)</span>
                        </div>

                        <div style="position: absolute; top: 70px; left: 20px; right: 20px; text-align: right;">
                            <textarea name="description" style="left: 0; right: 0; width: 100%; height: 75px;"><?=$diagram->description ?></textarea>
                        </div>

                        <div style="position: absolute; top: 160px; left: 20px;">
                            <input type="checkbox" name="public" value="true" <?=$diagram->public ? 'checked' : '' ?>/><span class="formLabel">共享给所有人</span>
                        </div>
                        
                        <div style="position: absolute; top: 180px; left: 20px; color: gray; text-align: left;">
                            <b>共享</b>后的流程图所有人都可以查看，但仅只有您本人允许编辑它.
                        </div>
                        
                        <div style="position: absolute; top: 230px; left: 20px; right: 20px;">
                            <input type="image" src="./assets/images/save.gif" style="display: block; margin-left: auto; margin-right: 0;" value="保存"/>
                        </div>
                    </form>
                </div>
                <p>&nbsp;</p>
            </div>

            <p/>

            <div class="copyright">&copy; <?=date('Y') ?> Diagramo</div>
        </div>
    </body>
</html>

