function cates(tbl){
	if(!check(tbl)){
		return {"code":10006,"msg":"appid or secret error!"}
	}
	var cnd=Cnd.where("1","=",1)
	if(!isEmpty(tbl.pid)){
		cnd.and("pid","=",tbl.pid)
	}else{
		cnd.and("pid","=",0)
	}
	var list=[]
	return list;
}