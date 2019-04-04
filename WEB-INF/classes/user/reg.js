function main(tbl){
	let u=new JseMap();
	u.put(".table","users")
	u.put("username",tbl.username)
	u.put("phone",tbl.phone)
	u.put("nickname",tbl.username)
	u.put("password",tbl.password)
	u.put("reg_ip",ip())
	u.put("reg_time",new java.util.Date())
	u.put("login_ip",ip())
	$save(u)
	var u1=$fetch("users",Cnd.where("phone","=",tbl.phone))
	sattr("user",u1)
	addCookie("user",URLEncoder.encode(toJson(u1),"UTF-8"));
	return ">>:user/"
}