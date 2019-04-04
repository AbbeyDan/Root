function main(tbl){
	if(user()==null){
		return {"code":-1,"msg":e};
	}
	try {
		let ao=dao.fetch("app_order",Cnd.where("id","=",tbl.id))
		if(ao.user_id==user().id&&ao.status==0){
			$del("app_order",tbl.id)
		}
		return {"code":200,"msg":"success"};
	} catch (e) {
		return {"code":-1,"msg":e};
	}
}