<?php
	include 'db.php';	
	$user_name = $_GET['user_name'];
	$user_id = $_GET['user_id'];
	$score =  $_GET['score'];
	$errors =  $_GET['errors'];
	$rec_time =  $_GET['rec_time'];
	$sql = "INSERT INTO tbl_exam_jz (user_name, user_id, score, errors, rec_time) VALUES ('".$user_name."', '".$user_id."', '".$score."', '". $errors ."', '".$rec_time."')";
	echo setData($sql);	
?>