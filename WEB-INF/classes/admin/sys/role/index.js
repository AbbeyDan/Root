function main(tbl){
	let cnd=Cnd.where("1","=",1)
	if(tbl.add_time||false){
		cnd.and("add_time",">=",tbl.add_time)
	}
	let page=tbl.pageNum||1;
	let limit=tbl.pageSize||10;
	var pager=dao.table("sys_role",cnd.desc("id"),page,limit);
	return pager;
}