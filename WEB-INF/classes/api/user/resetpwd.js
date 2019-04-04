function main(tbl){
	let u=dao.fetch("users",Cnd.where("phone","=",tbl.phone))
	$update({".table":"users","id":u.id,"password":"12345678"})
	return {"code":200}
}