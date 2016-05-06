<?php
	$htmlContents = $_POST["contents"];
	$filename = "/topic/share/chart/" . $_POST["filename"];
	$shareCode = file_put_contents("..".$filename,$htmlContents); 
	if($shareCode > 0 ){
		echo '{"status":1,"url":"'. $filename .'"}';
	}else{
		echo '{"status":0,"url":"'. $filename .'"}';
	}
?>