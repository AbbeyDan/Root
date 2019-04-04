function main(tbl){
	let admin=dao.fetch("users",Cnd.where("role_id",">",0)
			.and("username","=",tbl.username).and("password","=",tbl.password))
			print(admin)
	if(admin!=null){
		let auths=dao.select(`select auth from sys_menu where auth is not null and id in (
                    		select menu_id from sys_role_menu where role_id= ${admin.role_id}
                    		)`,"strs");
        admin.put("auths",auths)
		sattr("admin",admin)
		return {code:200}
	}else{
		return tbl;
	}
}