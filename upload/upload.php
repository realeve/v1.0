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
          $filename = base64_encode($filename);
          
          //base64中的'/'不能作为文件名内容
          $filename = str_replace("/",'-',$filename); 
          $filename = str_replace("=",'-',$filename); 
          $fileType = str_replace("image/svg",'svg',$fileType);
          //图片文件处理：1.获取宽高;2.转换为webp
          if(strripos($file["type"],'image')>-1){
            $size = getimagesize($file["tmp_name"]);
            $return['width'] = $size[0];
            $return['height'] = $size[1];
            $distFile = "./image/".$filename.$fileType;
          }else{            
            $return['width'] = 0;
            $return['height'] = 0;
            $distFile = "./file/".$filename.$fileType;
          }
          
          move_uploaded_file($file["tmp_name"],$distFile); 
          $return['size'] = round($file["size"] / 1024,2)+'kb';
          $return['type'] = $file["type"];
          $return['url'] = "/file/".$filename.$fileType;;
            
          //图片文件处理：1.获取宽高;2.转换为webp
          if($return['width']){              
            // php.ini  memory_limit = 1024M
            /*$imgageDir = $_SERVER['DOCUMENT_ROOT'] .'/upload/image/';
            $srcFile = $imgageDir.$filename.$fileType;            
            $distFile = $imgageDir.$filename.'.webp';
            $isSupported = true;
            if($fileType == '.jpg'){
              $image = imagecreatefromjpeg($srcFile);
            }else if($fileType == '.gif'){
              $image = imagecreatefromgif($srcFile);
            }else if($fileType == '.png'){
              $image = imagecreatefrompng($srcFile);
            }else if($fileType == '.bmp'){
              $image = imagecreatefrombmp($srcFile);
            }else{
              $isSupported = false;
            }
            
            if($isSupported){
              if(imagewebp($image,$distFile)){
                imagedestroy($image);
                //暂不删除原图片
                //unlink($srcFile);
                
                $size = filesize($distFile);
                $return['size'] = round($size / 1024,2)+'kb';
                $return['type'] = 'images/webp';   
              }              
            }*/
            
            
            //apache GD库默认对webp处理有较多BUG，转用 imagick方案
            $imgageDir = $_SERVER['DOCUMENT_ROOT'] .'/upload/image/';
            
            $srcFile = $imgageDir.$filename.$fileType;            
            $distFile = $imgageDir.$filename.'.webp';          
            $thumbFile = $imgageDir.'thumb_'.$filename.'.webp';
            
            $image = new Imagick($srcFile);
            $image->stripImage();//去掉exif等信息，如果是新闻网站则不应去掉
            $image->setImageFormat('webp');
            $image->setImageCompression(Imagick::COMPRESSION_JPEG); 
            $image->setImageCompressionQuality(80); 
            //转换效果与谷歌官方 cwebp -q 80 input.jpg -o oubput.webp 接近
            $image->writeImage($distFile);
            //生成缩略图
            $image->thumbnailImage(360,null); 
            $image->writeImage($thumbFile); 
            //删除原图片
            unlink($srcFile);
            
            $size = filesize($distFile);
            $return['size'] = round($size / 1024,2)+'kb';
            $return['type'] = 'images/webp';
            $return['url'] = '/image/'.$filename.'.webp';
          } 
          
          $return['status'] = 1;
          $return['msg'] = '上传成功';
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