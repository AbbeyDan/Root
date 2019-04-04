//json
function main(tbl){
	print(tbl)
	let cnd=Cnd.where("1","=",1)
	if(tbl.name||false){
		cnd.and("name","like","%"+tbl.name+"%")
	}
	let page=tbl.pageNum||1;
	let limit=tbl.pageSize||10;
	var pager=dao.query("select id,name as 'text' from app_teacher",cnd.desc("id"),page,limit);
	return pager;
}