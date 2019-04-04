function main(tbl){
	let cnd=Cnd.where("1","=",1)
	if(tbl.add_time||false){
		cnd.and("add_time",">=",tbl.add_time)
	}
	if(tbl.name||false){
		cnd.and("name","like","%"+tbl.name+"%")
	}
	if(tbl.id||false){
		cnd.and("id","=",tbl.id)
	}
	let page=tbl.page||1;
	let limit=tbl.limit||10;
	var pager=dao.pager("app_teacher",cnd.desc("id"),page,limit);
	return pager;
}