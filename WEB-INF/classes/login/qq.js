function main(tbl){
	//获取Access Token
	var gotourl="user/";
	var ua = req.getHeader("user-agent").toLowerCase();
	if (ua.indexOf("qq/") > 0){
		gotourl="m/";
	}else if(ua.indexOf("micromessenger")>0){
		gotourl="m/";
	}else{
		
	}
	if(sattr("goto")!=null){
		gotourl=sattr("goto");
	}
	if(tbl.code==undefined){
		var url="https://graph.qq.com/oauth2.0/authorize?redirect_uri=http%3A%2F%2Fwww.iepsy.com%2Flogin%2Fqq&client_id=101287138&state=1&response_type=code";
		resp.sendRedirect(url);
	}else{
	try {
		var url="https://graph.qq.com/oauth2.0/token?redirect_uri=http%3A%2F%2Fwww.iepsy.com%2Flogin%2Fqq&grant_type=authorization_code&client_id=101287138&client_secret=283caabc4027419fd832397d53125f8d&code="+tbl.code;
		var access_token=Http.get(url).getContent().split("&")[0].split("=")[1]
		//print(access_token)
			//获取openid
		var urlopenid="https://graph.qq.com/oauth2.0/me?access_token="+access_token;
		
		var qqrt=foJson(Http.get(urlopenid).getContent().replace("callback(","").replace(")",""));
		var openid=qqrt.openid;
		
		var user=dao.fetch("users",Cnd.where("qqid","=",openid))
		if(user==null){
		var url_user="https://graph.qq.com/user/get_user_info?access_token="+access_token+"&oauth_consumer_key=101287138&openid="+openid;
		var qquser=foJson(Http.get(url_user).getContent());
		var u=new Record();
		u.put("img",ImageUtil.save(qquser.figureurl_qq_2))
		u.put("nickname",qquser.nickname)
		u.put("sex",qquser.gender)
		u.put("area1",qquser.province)
		u.put("area2",qquser.city)
		u.put("username","qq"+openid)
		u.put("password","123456")
		u.put("qqid",openid)
		u.put("reg_time",new java.util.Date())
		u.put("reg_ip",req.getRemoteAddr())
		u.put("login_ip",req.getRemoteAddr())
		u.put(".table","users");
		$save(u)
		user=dao.fetch("users",Cnd.where("qqid","=",openid))
		sattr("user",user)
		attr("_httpurl",gotourl)
		
		addCookie("user",URLEncoder.encode(user,"UTF-8"));
		return u;
		}else{
			sattr("user",user)
		addCookie("user",URLEncoder.encode(user,"UTF-8"));
			attr("_httpurl",gotourl)
		}
	} catch (e) {
		print(e)
	}
	}
	return null;
}