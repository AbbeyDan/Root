function main(tbl){
	try {
		brow(tbl);
		var appid=tbl.appid||req.getHeader("appid");
		var secret=tbl.secret||req.getHeader("secret");
		if(isEmpty(appid)){
			var data=new Record();
			tbl.forEach(function(k,v){
				if(k.startsWith("{")&&k.endsWith("}")) {
					data.putAll(foJson(k))
				}
			})
			appid=data.appid;
			secret=data.secret;
		}
		var num=$count("app_open",Cnd.where("appid","=",appid).and("secret","=",secret))
		if(num>0){
			return true;
		}
	} catch (e) {
		
	}
	return false;
}