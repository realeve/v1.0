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

require_once dirname(__FILE__) . '/common/delegate.php';



if (!isset($_SESSION)) {
    session_start();
}

if(!is_numeric ($_REQUEST['diagramId'])){
    echo 'No diagram Id';
    exit();
}

$delegate = new Delegate();
$diagram = $delegate->diagramGetById($_REQUEST['diagramId']);
$diagramdata = $delegate->diagramdataGetByDiagramIdAndType($_REQUEST['diagramId'], Diagramdata::TYPE_CSV);


$links = array();
if($diagramdata->fileSize > 0){ 
    $fh = fopen(getStorageFolder() . '/' . $diagramdata->diagramId . '.csv', 'r');
    $data = fread($fh, $diagramdata->fileSize);    
    fclose($fh);
    
    $csvLines = explode("\n", $data);
    
    foreach($csvLines as $csvLine){
    $shards = explode(',', $csvLine);
        $links[] = $shards;
    }
}




//check if diagram is public
if(!is_object($diagram)){
    print "No diagram found";
    exit();
}

if(!$diagram->public){
    print "Diagram is not public. A Diagram must be public to be publicly visible.";
    exit();
}
//end check
$WEBADDRESS = $delegate->settingsGetByKeyNative('WEBADDRESS');

//exit("here");
?>

<!DOCTYPE html>
<html>
    <!--Copyright 2010 Scriptoid s.r.l-->
    <head>
        <title><?=$diagram->title?></title>
        <meta charset="UTF-8">
        <meta name="description" content="<?=$diagram->description?>" />
        <meta http-equiv="X-UA-Compatible" content="IE=9" />
        <link rel="stylesheet" media="screen" type="text/css" href="http://<?=$WEBADDRESS?>/assets/css/style.css" />
    </head>
    <body>
        <div id="content">
		<center>
            <h1>《<?=$diagram->title?>》</h1>
            <div><?=$diagram->description?></div>
            <div id="container">
                <img usemap="#linkLayer" src="<?=$WEBADDRESS?>/editor/png.php?diagramId=<?=$diagram->id?>"  border="0"/> <!--width="800" height="600"-->           
            </div>
            <map name="linkLayer" id="linkLayer">
                <!-- <area shape="rect" coords="100,100,200,200" href="http://scriptoid.com" alt="Scriptoid"> -->
                <?foreach($links as $link){?>
                <area shape="rect" coords="<?=$link[0]?>, <?=$link[1]?>, <?=$link[2]?>, <?=$link[3]?>" href="<?=$link[4]?>" alt="<?=$link[4]?>" target="_blank">
                <?}?>
            </map>
            <!-- <textarea><?=$data?></textarea> -->
		</center>
        </div>
    </body>
</html>