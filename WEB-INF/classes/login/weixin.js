function main(tbl){
	var gourl="/user/";
	if(sattr("goto")!=null){
		gourl=sattr("goto");
	}
	if(tbl.code==undefined) {// 是微信浏览器
		  attr("_httpurl","https://open.weixin.qq.com/connect/qrconnect?appid=wxe86dd9c3d7581239&redirect_uri=http%3a%2f%2fwww.iepsy.com%2flogin%2fweixin&response_type=code&scope=snsapi_login&state=STATE#wechat_redirect")
		  return null;
	}
	if(tbl.code!=undefined){
		let Jssdk=Java.type("jse.wx.Jssdk");
		let wxconfig={"appid":"wxe86dd9c3d7581239","appsecret":"eec55f882add1ed2037af65cadec9664"};
		var wx_user=Jssdk.getUser(tbl.code,wxconfig)
		let unionid=wx_user.unionid;
		let openid=wx_user.openid;
		var nickname=wx_user.nickname;
		try {
			nickname=nickname.replaceAll("[\\x{10000}-\\x{10FFFF}]", "");
		} catch (e) {
			
		}
		var sex=wx_user.sex=="1"?"男":"女";
		var city=wx_user.city;
		var province= wx_user.province;
		var country= wx_user.country;
		let u1=dao.fetch("users",Cnd.where("unionid","=",unionid))
		if(u1==null){
			u1=dao.fetch("users",Cnd.where("openid","=",openid))
		}
		if(u1==null){
		var u=new Record();
		var img=down99(wx_user.headimgurl,"d:/tomcat/webapps/upload/image/"+Times.format("yyyyMMdd",new java.util.Date())+"/"+uuid()+".jpg")
		u.put(".table","users")
		u.put("nickname",nickname)
		u.put("img",img)
		u.put("username",openid)
		u.put("password","123456")
		u.put("openid",openid)
		u.put("unionid",unionid)
		u.put("reg_time",new java.util.Date())
		u.put("reg_ip",req.getRemoteAddr())
		u.put("login_ip",req.getRemoteAddr())
		u.put(".table","users");
		$save(u)
		sattr("user",dao.fetch("users",Cnd.where("openid","=",openid)))
		var img=down99(wx_user.headimgurl,"d:/tomcat/webapps/upload/image/"+Times.format("yyyyMMdd",new java.util.Date())+"/"+uuid()+".jpg")
		var chain=Chain.make("nickname",nickname)
		chain.put("sex",sex)
		chain.put("province",province)
		chain.put("city",city)
		chain.put("country",country)
		chain.put("img",img);
		if(isEmpty(u1.openid)){
			chain.put("openid",openid)
		}
		if(isEmpty(u1.unionid)){
			chain.put("unionid",unionid)
		}
		u1=dao.update("users",chain,Cnd.where("id","=",u1.id))
		sattr("user",u1)
		addCookie("user",URLEncoder.encode(toJson(u1),"UTF-8"));
		}else{
			sattr("user",u1)
			addCookie("user",URLEncoder.encode(toJson(u1),"UTF-8"));
		}
		sattr("goto",null);
	}
	
	return ">>:"+gourl;
}
function down99(urlstr,filePath){
	var url = new java.net.URL(urlstr);
	// 打开链接
	var conn = url.openConnection();
	// 设置请求方式为"GET"
	conn.setRequestMethod("GET");
	// 超时响应时间为5秒
	conn.setConnectTimeout(5 * 1000);
	// 通过输入流获取图片数据
	var inStream = conn.getInputStream();
	// 得到图片的二进制数据，以二进制封装得到数据，具有通用性
	var data = Streams.readBytes(inStream);
	var imageFile = new java.io.File(filePath);
	var fileParent = imageFile.getParentFile();  
	if(!fileParent.exists()) {
		fileParent.mkdirs();
	}
	var outStream = new java.io.FileOutputStream(imageFile);
	// 写入数据
	outStream.write(data);
	// 关闭输出流
	outStream.close();
	return filePath.replace("d:/tomcat/webapps/","");
}
