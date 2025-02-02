<?

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

$WEBADDRESS = $delegate->settingsGetByKeyNative('WEBADDRESS');
?>
<div id="header">    
    <!--Logo menu-->
    <div class="dropdown_menu">
        <a style="padding: 0;" href="../../../" target="blank"><img src="./assets/images/logo-36x36.png"/></a>
    </div>
    <!-- /File menu-->
        
    <div id="dropdown">
        
        <!--File menu-->
        <div class="dropdown_menu"><a href="#" onmouseover="dropdownSpace.menuOpen('file')" onmouseout="dropdownSpace.menuCloseTime()">文件</a>
            <div class="dropdown_menu_panel" id="file" onmouseover="dropdownSpace.menuCancelCloseTime()" onmouseout="dropdownSpace.menuCloseTime()">
                <a style="text-decoration: none;" href="./common/controller.php?action=newDiagramExe" title="New diagram"><img style="vertical-align:middle; margin-right: 3px;" src="assets/images/icon_new.jpg" border="0" width="20" height="21"/><span class="menuText">新建</span></a>
                <a style="text-decoration: none; border-bottom: 1px solid #666;" href="./myDiagrams.php" title="Open diagram"><img style="vertical-align:middle; margin-right: 3px;" src="assets/images/icon_open.jpg" border="0" width="20" height="21"/><span class="menuText">打开...</span></a>
                <?if($page=='editor'){?>
                    <a style="text-decoration: none;" href="javascript:save();"  title="Save diagram (Ctrl-S)"><img style="vertical-align:middle; margin-right: 3px;" src="assets/images/icon_save.jpg" border="0" width="22" height="22"/><span class="menuText">保存</span></a>
                    <a style="text-decoration: none; border-bottom: 1px solid #666;" href="javascript:saveAs();"  title="Save diagram as..."><img style="vertical-align:middle; margin-right: 3px;" src="assets/images/icon_save_as.jpg" border="0" width="22" height="22"/><span class="menuText">另存为...</span></a>
                    <a style="text-decoration: none; border-bottom: 1px solid #666;" href="javascript:void(0)" onclick="showImport();"  title="Import diagram"><img style="vertical-align:middle; margin-right: 3px;" src="assets/images/icon_import.gif" border="0" width="25" height="21"/><span class="menuText">导入</span></a>
                    <?if(isset($_REQUEST['diagramId']) &&  is_numeric($_REQUEST['diagramId']) ){//option available ony when the diagram was saved?>
                        <a style="text-decoration: none; border-bottom: 1px solid #666;" href="./exportDiagram.php?diagramId=<?=$_REQUEST['diagramId']?>"  title="Export diagram"><img style="vertical-align:middle; margin-right: 3px;" src="assets/images/icon_export.jpg" border="0" width="22" height="22"/><span class="menuText">导出</span></a>
                        <a style="text-decoration: none; border-bottom: 1px solid #666;" href="javascript:print_diagram();" title="Print diagram"><img style="vertical-align:middle; margin-right: 3px;" src="assets/images/icon_print.png" border="0" width="20" height="21"/><span class="menuText">打印</span></a>
                    <?}?>
                <?}?>
                <?if (is_object($loggedUser)) { ?>    
                <a style="text-decoration: none;" href="./common/controller.php?action=logoutExe"><img style="vertical-align:middle;" src="<?=$WEBADDRESS?>/editor/assets/images/icon_logout.gif" border="0" width="16" height="16"/><span class="menuText">退出 (<?= $loggedUser->email ?>)</span></a>
                <?}?>
            </div>
        </div>
        <!-- /File menu-->

        <!--Settings menu-->
        <div class="dropdown_menu"><a href="#" onmouseover="dropdownSpace.menuOpen('settings')" onmouseout="dropdownSpace.menuCloseTime()">设置</a>
            <div class="dropdown_menu_panel"  id="settings" onmouseover="dropdownSpace.menuCancelCloseTime()" onmouseout="dropdownSpace.menuCloseTime()">
                <a href="./settings.php">个人设置</a>
            </div>
        </div>
        <!--Settings menu-->
        
        <!--Users menu-->
        <div class="dropdown_menu"><a href="#" onmouseover="dropdownSpace.menuOpen('users')" onmouseout="dropdownSpace.menuCloseTime()">用户</a>
            <div class="dropdown_menu_panel"  id="users" onmouseover="dropdownSpace.menuCancelCloseTime()" onmouseout="dropdownSpace.menuCloseTime()">
                <a style="text-decoration: none;" href="./users.php"  title="Invite/Manage collaborators"><img style="vertical-align:middle; margin-right: 3px;" src="assets/images/collaborators.gif" border="0" width="22" height="22"/><span class="menuText">用户列表</span></a>
            </div>
        </div>
        <!--Help menu-->
        
        <!--Help menu-->
        <div class="dropdown_menu"><a href="#" onmouseover="dropdownSpace.menuOpen('help')" onmouseout="dropdownSpace.menuCloseTime()">帮助</a>            
            <div class="dropdown_menu_panel" id="help"    onmouseover="dropdownSpace.menuCancelCloseTime()" onmouseout="dropdownSpace.menuCloseTime()" >
                <a href="javascript:void(0);" onclick="javascript:DIAGRAMO.switchDebug()"><img id="iconDebug"  src="./assets/images/icon_debug_false.gif" style="vertical-align: middle;"/> 调试模式</a>
				<a href="./editor.php?diagramId=quickstart">快速示例</a>
                <!--<a href="./license.php">License</a>>
                <a href="javascript:void(0);" onclick="buildNo()">关于</a>
                <script type="text/javascript">
                    var msg = "Build number: v 0.1";
                    function buildNo(){
                        alert(msg);
                    }
                </script-->                
            </div>                        
        </div>
        <!--Help menu-->
        
        
        <!--Direct link-->
        <?if($page=='editor'){?>
            <?if($loggedUser->tutorial && isset($_REQUEST['diagramId']) && $_REQUEST['diagramId'] == 'quickstart'){?>                
                <a style="padding: 6px; display: table-cell; " href="./common/controller.php?action=closeQuickStart">关闭示例页面</a>
            <?}?>
            <?if(isset($_REQUEST['diagramId']) &&  is_numeric($_REQUEST['diagramId']) ){ //these options should appear ONLY if we have a saved diagram
                $diagram = $delegate->diagramGetById($_REQUEST['diagramId']);
                $url = $WEBADDRESS . '/editor/viewDiagram.php?diagramId=' . $diagram->id ;
            ?>                
            <div style="padding-top: 6px;">
                <img style="vertical-align:middle;" src="assets/images/upper_bar_separator.jpg" border="0" width="2" height="16"/>
                <span class="menuText" title="Use this URL to share diagram to others">外部引用链接 : </span> <input style="font-size: 10px;" title="External direct URL to diagram" type="text" class="text" size="100" value="<?=$url?>"/>
                <input type="button" style="" value="预览查看" onclick="window.open('<?=$url?>')"/>
            </div>
            <?}?>
        <?}?>
        <!-- //Direct link-->
        
        
        
        <!-- alfa
            <td valign="middle">
                <a style="text-decoration: none;" href="javascript:exportCanvas();"><img style="vertical-align:middle; margin-right: 3px;" src="../assets/images/icon_export.jpg" border="0" width="22" height="22"/><span class="menuText">Debug Export</span></a>
            </td>
            <td width="20" align="center">
                <img style="vertical-align:middle;" src="../assets/images/upper_bar_separator.jpg" border="0" width="2" height="16"/>
            </td>
        -->    

        <script type="text/javascript">
            //check if browser is ready
            if(!isBrowserReady()){                
                document.write('<span style="background-color: red;" >');
                document.write("No support for HTML5. More <a href=\"http://<?=$WEBADDRESS?>/htm5-support.php\">here</a></a>");
                document.write("</span>");                
            }
        </script>   
        
    </div>
</div>