function main(tbl){
	let teacher=dao.fetch("sys_user",Cnd.where("codes","like","%"+user().code+",%").and("role_id","=",2))
	attr("teacher",teacher)
	attr("wdnum",dao.count("app_chat",Cnd.where("status","=",0).and("mine","=",0).and("user_id","=",user().id)))
	attr("chat1",dao.fetch("app_chat",Cnd.where("user_id","=",user().id).and("tid","=",teacher.id).desc("i")))
}