//json
function main(tbl){
	let cnd=Cnd.where("1","=",1)
	if(tbl.add_time||false){
		cnd.and("add_time",">=",tbl.add_time)
	}
	let page=tbl.pageNum||1;
	let limit=tbl.pageSize||10;
	var list=dao.table("sys_notice",cnd.desc("id"),page,limit);
	return list;
}