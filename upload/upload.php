<?php    
    $requestType = $_SERVER['REQUEST_METHOD'];
    
    // 指定允许其他域名访问
    header('Access-Control-Allow-Origin:http://localhost:8080');
    // 响应类型
    header('Access-Control-Allow-Methods:GET,POST,PUT,OPTIONS');
    header('Access-Control-Allow-Headers:x-requested-with,content-type');   
    
    
    if($requestType == "OPTIONS"){   
      header('Access-Control-Allow-Credentials:true');
	  header('Access-Control-Max-Age:1728000');
      header('Content-Type:text/plain charset=UTF-8');
	  header('Content-Length: 0',true);
      header("status: 204"); 
      header("HTTP/1.0 204 No Content");
    }else if($requestType == "POST"){  
	  header("Content-type: application/json");
      // 100M大小限制
      if ($_FILES["file"]["size"] < 1024*1024*100){
        if ($_FILES["file"]["error"] > 0)
        {
          echo '{"status":"0","msg":"文件类型或大小错误"}';
        }
        else{
          $file = $_FILES["file"];
          $name = $file["name"];
          $filename = $file["name"];
          if(strpos($name,'.')==-1){
            $arr = explode('/',$file['type']);
            $fileType = '.'.$arr[count($arr)-1];
          }else{
            $arr = explode('.',$filename);
            $fileType = '.'.$arr[count($arr)-1];
            $arr[count($arr)-1]='';
            $filename = implode('',$arr);
          }
          
          //随机值          
          $filename = time().'_'.(microtime()*1000000).'_'.$filename;
          $filename = base64_encode($filename).$fileType;
          
          //base64中的'/'不能作为文件名内容
          $filename = str_replace("/",'-',$filename); 
          
          move_uploaded_file($file["tmp_name"],"./file/".$filename);
          $return['status'] = 1;
          $return['msg'] = '上传成功';
          $return['type'] = $file["type"];
          $return['size'] = round($file["size"] / 1024,2)+'kb';
          $return['url'] = '/file/'.$filename;
          $return['name'] = $name;
          echo json_encode($return);
        }
      }
    }else if($requestType == "GET"){     
	  header("Content-type: application/json");
      if(isset($_GET['name'])){
        $filename = '.'.$_GET['name'];
        if(file_exists($filename)){
          unlink($filename);
          $return['status'] = 1;
          $return['msg'] = '文件删除成功'; 
        }else{
		  $return['status'] = 0;
          $return['msg'] = '文件'.$filename.'不存在';
        }            
      }else{
		  $return['status'] = 0;
          $return['msg'] = '请求参数错误';
      }
	  if(isset($_GET['callback'])){
		  echo $_GET['callback'].'('.json_encode($return).')';
	  }else{
		  echo json_encode($return);
	  }      
    }else{
	  header("Content-type: application/json");
	  $return['status'] = 0;
	  $return['msg'] = '上传文件失败';
	  echo json_encode($return);
    }
?>