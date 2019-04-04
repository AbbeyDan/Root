function chapter(tbl){
	if(!check(tbl)){
		return {"code":10006,"msg":"appid or secret error!"}
	}
	var cnd=Cnd.where("tbl_name","=","course").and("tbl_id","=",tbl.id).and("pid","=",0)
	var list=$list("chapter",cnd)
	list.forEach(function(c){
		c.put("list",$list("chapter",Cnd.where("pid","=",c.id)))
	})
	return list;
}