function teacher(tbl){
	if(!check(tbl)){
		return {"code":10006,"msg":"appid or secret error!"}
	}
	var cnd=Cnd.where("name","=",tbl.name)
	var t=$fetch("teacher",cnd)
	t.put("img","http://www.iepsy.com/"+t.img)
	return t;
}