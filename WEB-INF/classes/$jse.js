//配置公共变量
//var xxx="xxx1"
var user=function(){
	if(sattr("user")==null){
		if(getCookie("user")!=null){
			let ustr=URLDecoder.decode(getCookie("user"), "UTF-8")
			let u=foJson(ustr);
			return sattr("user",u);
		}
	}else{
	  return sattr("user");
	}
}