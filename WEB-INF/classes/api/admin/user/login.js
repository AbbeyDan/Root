//json
function main(tbl){
	let admin=dao.fetch("users",Cnd.where("role_id",">",0)
			.and("username","=",tbl.username).and("password","=",tbl.password))
			
	if(admin!=null){
		let auths=dao.select(`select auth from sys_menu where auth <> '' and id in (
                    		select menu_id from sys_role_menu where role_id= ${admin.role_id}
                    		)`,"string[]");
        admin.put("auths",auths)
		sattr("admin",admin)
		return {code:200}
	}else{
		return {code:-1,msg:"用户名或密码不正确"};
	}
}