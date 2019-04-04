function main(tbl){
	if(user()==null){
		return {"code":200}
	}
	tbl.put(".table","users")
	tbl.remove("file")
	$update(tbl)
	let u=dao.fetch("users",Cnd.where("id","=",user().id))
	session.setAttribute("user",u)
	return {"code":200,"url":"/user/"};
}