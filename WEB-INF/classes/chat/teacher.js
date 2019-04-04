function main(tbl){
	let chats=dao.query("app_chat",Cnd.where("tid","=",tbl.id))
	chats.forEach(function(x){
		//x.put("id",x.tid)
		//x.put("id","u"+x.user_id)
		if(x.fromid==tbl.id){
			x.put("mine",true)
		}else{
			x.put("mine",false)
		}
		x.remove("fromid")
		x.remove("status")
		x.remove("cid")
		x.remove("add_time")
		x.remove("i")
		x.remove("tid")
		x.remove("user_id")
		x.remove("i")
		//x.put("mine",x.mine==1?false:true)
	})
	return chats||[]
}