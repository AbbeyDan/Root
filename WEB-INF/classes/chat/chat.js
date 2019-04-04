function main(tbl){
	if(user()==null){
		return ">>:/login?goto_url=/chat/"+tbl.id
	}
	dao.update("app_chat",Chain.make("status",1),Cnd.where("user_id","=",user().id))
	let teacher=dao.fetch("sys_user",Cnd.where("id","=",tbl.id))
	let chats=dao.query("app_chat",Cnd.where("tid","=",teacher.id)
			.and("user_id","=",user().id))
			chats.forEach(function(x){
				x.put("id",x.tid)
				x.remove("fromid")
				x.put("mine",x.mine==1?true:false)
			})
	attr("chats",chats)||[]
	return teacher;
}