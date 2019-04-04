function main(tbl){
	let cnd=Cnd.where("1","=",1)
	if(tbl.name||false){
		cnd.and("name","like","%"+tbl.name+"%")
	}
	let page=tbl.page||1;
	let limit=tbl.limit||10;
	var pager=dao.pager("app_tag",cnd.desc("id"),page,limit);
	return pager;
}