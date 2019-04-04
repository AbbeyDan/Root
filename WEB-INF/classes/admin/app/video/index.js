function main(tbl){
	let cnd=Cnd.where("1","=",1)
	if(tbl.id||false){
		cnd.and("id","=",tbl.id)
	}
	if(tbl.vid||false){
		cnd.and("vid","=",tbl.vid)
	}
	if(tbl.title||false){
		cnd.and("title","like","%"+tbl.title+"%")
	}
	let page=tbl.page||1;
	let limit=tbl.limit||10;
	var pager=dao.pager("app_video",cnd.desc("id"),page,limit);
	return pager;
}