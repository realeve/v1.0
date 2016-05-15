<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
	$targ_w = $targ_h = 240;
	$jpeg_quality = 100;

	//$src = './demos/demo_files/image5.jpg';
	$src = $_GET['src'];
	$file_name= './avatar/'.$_GET['filename'].'.jpg';
	$img_r = imagecreatefromjpeg($src);

	$dst_r = ImageCreateTrueColor( $targ_w, $targ_h );

	imagecopyresampled($dst_r,$img_r,0,0,intval($_GET['x']),intval($_GET['y']), $targ_w,$targ_h, intval($_GET['w']),intval($_GET['h']));

	$result = imagejpeg($dst_r,$file_name,$jpeg_quality);
	imagedestroy($dst_r); 
	
	if($result == 1){
		echo '{"status":1,"msg":"保存成功","url":"/demo/avatar/'.$file_name.'"}';
	}else{
		echo '{"status":0,"msg":"保存失败"}';
	}
	exit;
}
?>