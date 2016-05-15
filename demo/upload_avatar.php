<?php
	if ((($_FILES["file"]["type"] == "image/gif")
	|| ($_FILES["file"]["type"] == "image/jpeg")
	|| ($_FILES["file"]["type"] == "image/png")
	|| ($_FILES["file"]["type"] == "image/pjpeg"))
	&& ($_FILES["file"]["size"] < 1024000)){
		if ($_FILES["file"]["error"] > 0)
		{
			echo '{"status":0,"msg":"文件类型或大小错误"}';
		}
		else{
			//$filename = iconv("UTF-8","GBK",$_FILES["file"]["name"]);			
			
			$filename = $_POST['avatarName'].".jpg";//.str_replace('jpeg','jpg',str_replace("image/",".",$_FILES["file"]["type"]));

			move_uploaded_file($_FILES["file"]["tmp_name"],"./upload/".$filename);
			echo '{"status":1,"msg":"上传成功","type":"'.$_FILES["file"]["type"].'","size":"'.round($_FILES["file"]["size"] / 1024,2).'Kb","url":"/upload/'.$filename.'"}';
		}	}
	else{
	  echo '{"status":0,"msg":"上传文件失败"}';
	}
	
?>