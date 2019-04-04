function courses(tbl){
	if(!check(tbl)){
		return {"code":10006,"msg":"appid or secret error!"}
	}
	var cnd=Cnd.where("price","=",0).and("id",">",460).and("id","<",599)
	if(!isEmpty(tbl.cid1)){
		cnd.and("cid1","=",tbl.cid1);
	}
	if(!isEmpty(tbl.cid2)){
		cnd.and("cid2","=",tbl.cid2)
	}
	var list=$list("course",cnd)
	list.forEach(function(c){
		c.remove("name")
		c.put("img","http://www.iepsy.com/"+c.img)
		c.remove("update_time")
		c.remove("duration")
		c.remove("section")
		c.remove("bnum")
		c.remove("fnum")
		c.remove("is_tj")
		c.remove("html")
		c.remove("leve")
		c.remove("vid")
		c.remove("vip")
		c.remove("agency_id")
		c.remove("is_zb")
		c.remove("is_file")
		c.remove("is_exam")
		c.remove("type")
		c.remove("pct")
	})
	return list;
}