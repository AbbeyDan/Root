function main(tbl){
	let item=dao.fetch("app_banner",Cnd.where("id","=",tbl.id));
	return item;
}