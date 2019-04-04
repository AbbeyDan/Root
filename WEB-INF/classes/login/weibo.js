function main(tbl){
		var gotourl="user/";
		if(sattr("goto")!=null){
			gotourl=sattr("goto");
		}
		if(tbl.code==undefined){
		var url="https://api.weibo.com/oauth2/authorize?client_id=3548294181&response_type=code&redirect_uri=http://www.iepsy.com/login/weibo"
			 resp.sendRedirect(url);
		}else{
			var url1="https://api.weibo.com/oauth2/access_token";
			var map=new HashMap();
			map.put("client_id","3548294181")
			map.put("client_secret","fb82f3a1a94ff175233b9c02d4227881")
			map.put("grant_type","authorization_code")
			map.put("redirect_uri","http://www.iepsy.com/login/sina")
			map.put("code",tbl.code)
			var txt=Http.post(url1,map);
			var wbs=foJson(txt);
			var access_token=wbs.access_token;
			var uid=wbs.uid;
			var url2="https://api.weibo.com/2/users/show.json?access_token="+access_token+"&uid="+uid;
			
			var user=dao.fetch("users",Cnd.where("wbid","=",uid))
			if(user==null){
				var wbrt=Http.get(url2);
				print("............-------------------"+access_token)
			var weibo=foJson(wbrt);
			print("............-------------------"+weibo)
			var u=new Record();
			var img=down99(weibo.avatar_large,"d:/tomcat/webapps/upload/image/"+Times.format("yyyyMMdd",new java.util.Date())+"/"+uuid()+".jpg")
			u.put("img",img)
			u.put("nickname",weibo.name)
			if(weibo.gender=="m"){
				u.put("sex","男")
			}else if(weibo.gender=="f"){
				u.put("sex","女")
			}else{
				u.put("sex","保密")
			}
			u.put("addr",weibo.location)
			u.put("username","weibo"+uid)
			u.put("password","123456")
			u.put("wbid",uid)
			u.put("reg_time",new java.util.Date())
			u.put("reg_ip",req.getRemoteAddr())
			u.put("login_ip",req.getRemoteAddr())
			u.put(".table","users");
			$save(u)
			var us=dao.fetch("users",Cnd.where("wbid","=",uid));
			sattr("user",us)
			attr("_httpurl",gotourl)
			user=us;
			try {
				addCookie("user",user);
			} catch (e) {
				// TODO: handle exception
			}
			
			}else{
				sattr("user",user)
			try {
				addCookie("user",user);
			} catch (e) {
				// TODO: handle exception
			}
				attr("_httpurl",gotourl)
			}
		}
			
	}