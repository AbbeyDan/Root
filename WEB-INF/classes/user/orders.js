function main(tbl){
	if(user()==null){
		return ">>:/login?gotourl=/user/orders"
	}
	let list=dao.query("app_order",Cnd.where("user_id","=",user().id))
	return list;
}