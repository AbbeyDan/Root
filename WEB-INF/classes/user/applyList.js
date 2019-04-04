function main(tbl){
	let pros=dao.query("app_course",Cnd.where("type","=","PRO"));
	pros.forEach(function(x){
		if(user()!=null){
			let num=dao.count("app_order",Cnd.where("status","=",1).and("user_id","=",user().id)
					.and("tbl_id","=",x.id).and("tbl_name","=","course"))
					if(num>0){
						x.put("isbuy",true)
					}
		}
	})
	attr("pros",pros)
	return dao.query("app_vip")
}