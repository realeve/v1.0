<?php
	include 'db.php';
	
	$sql = "SELECT * FROM `tbl_exam_jz`";
	echo getData($sql);
	
?>