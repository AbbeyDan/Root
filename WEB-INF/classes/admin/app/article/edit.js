function main(tbl){
	let item=dao.fetch("app_article",Cnd.where("id","=",tbl.id));
	return item;
}