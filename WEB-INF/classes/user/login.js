function main(tbl){
	let gotourl="/"
	if(!isEmpty(sattr("gotourl"))){
		gotourl=sattr("gotourl")
	}
	let code=200;
	let u=dao.fetch("users",Cnd.where("password","=",tbl.password)
			.add("and (username='"+tbl.username+"' or phone='"+tbl.username+"')"))
			if(u!=null){
				sattr("user",u)
				addCookie("user",URLEncoder.encode(toJson(u),"UTF-8"));
			}else{
				code=-1;
				gotourl="/login?code=not"
			}
	attr("_httpurl",gotourl)
	return {"code":code,"url":gotourl}
}