function main(tbl){
	let cnd=Cnd.NEW()
	if(tbl.q||false){
		cnd.add(" where title like '%"+tbl.q+"%'")
	}
	let page=tbl.page||1;
	let limit=tbl.limit||10;
	var pager=dao.pager("app_article",cnd.desc("id"),page,limit);
	return pager;
}