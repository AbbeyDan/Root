<?php
   header("Content-Type:text/html;charset:utf8");//设置文件编码
   $image =$_FILES['image'];
   //判断获得变量
   if ($image['error'] > 0) {
       $error = "上传失败了,原因是";
       switch ($image['error']) {
           case 1:
               $error .= "大小超过了服务器设置的限制！";
               break;
           case 2:
               $error .= "文件大小超过了表单的限制！";
               break;
           case 3:
               $error .= "文件只有部分被上传！";
               break;
           case 4:
               $error .= "没有文件被上传!";
               break;
           case 6:
               $error .= "上传文件的临时目录不存在！";
               break;
           case 7:
               $error .= "写入失败!";
               break;
           default:
               $error .= "未知的错误！";
               break;
       }
       //输出错误
       exit($error);
   } else {
       //截取文件后缀名
       $type = strrchr($image['name'], ".");
       //设置上传路径，我把它放在了upload下的interview目录下（需要在linux中给interview设置文件夹权限）
       $path = "./upload/" . $image['name']; 

       //判断上传的文件是否为图片格式
        if (strtolower($type) == '.png' || strtolower($type) == '.jpg' || strtolower($type) == '.bmp' || strtolower($type) == '.gif') {
           //将图片文件移到该目录下
           move_uploaded_file($image['tmp_name'], $path);
           echo 1;
       }else{
           echo 0;
       }
   }
?>