<?php
	/*$imgfile = $_GET['img'];
	$imgID = $_GET['id'];
  echo $imgfile.$imgID;*/
  //$file = fopen("http://ww1.sinaimg.cn/mw690/005uYVSPgw1fa0vtfszldj30xc0m8q61.jpg", "r") or die("Unable to open file!");
  //$img = fgets($file);
  //fclose($file);
  //$img = file_get_contents("http://localhost/topic/slide/markdown/_image/%E6%9C%AA%E5%91%BD%E5%90%8D.bmp");
  //echo $img;

  /*echo "<br>";  
  $strInfo  = unpack("H*",$img);
  //print_r($strInfo[1]);
  
  echo '<br><img src="';  
  $packimg  = pack("H*",$strInfo[1]);
  
  $base64_image_content = "data:image/bmp;base64," . chunk_split(base64_encode(imagejpeg($packimg)));
  
  //echo $packimg;
  
  echo $base64_image_content;
  echo '">';*/
  include "bmp.php";
  $pic = '1.bmp';  
  $res = ImageCreateFromBmp($pic);  
  //imagepng($res, '1.png');  
  //imagejpeg($res, '1.jpeg');  
  //echo "data:image/jpeg;base64," .base64_encode(imagejpeg($res)); 
  
  //echo imagejpeg($res); 
  
  // 设置内容类型标头 —— 这个例子里是 image/jpeg
  //header('Content-Type: image/jpeg');
  imagejpeg($res, '1.jpeg'); // 释放内存
  imagedestroy($res);
  $img = file_get_contents("1.jpeg");
  $base64_image_content = "data:image/bmp;base64," . chunk_split(base64_encode($img));
  
  echo '<br><img src="'.$base64_image_content.'">';  
  /*
  bool imagejpeg ( resource $image [, string $filename [, int $quality ]] );
  
  image
  由图象创建函数(例如imagecreatetruecolor())返回的图象资源。

  filename
  文件保存的路径，如果未设置或为 NULL，将会直接输出原始图象流。

  如果要省略这个参数而提供 quality 参数，使用NULL。

  quality
  quality 为可选项，范围从 0（最差质量，文件更小）到 100（最佳质量，文件最大）。默认为 IJG 默认的质量值（大约 75）。
    
  */
  
  
  /*
  a：NULL填充的字节串
A：空格填充的字节串
h：十六进制数，低四位字节优先
H：十六进制数，高四位字节优先
c：有符号字符
C：无符号字符
s：有符号短整型(总是16位，机器字节序)
S：无符号短整型(总是16位，机器字节序)
n：无符号短整型(总是16位，大尾字节序)
v：无符号短整型(总是16位，小尾字节序)
I：有符号整型(机器相关大小和字节序)
I：无符号整型(机器相关大小和字节序)
l：有符号长整型(总是32位，机器字节序)
L：无符号长整型(总是32位，机器字节序)
N：无符号长整型(总是32位，大尾字节序)
V：无符号长整型(总是32位，小尾字节序)
f：浮点数(机器相关大小和表示)
d：双精度数(机器相关大小和表示)
x：空字节
X：倒退一个字节
@：用NULL填充绝对
  */
?>