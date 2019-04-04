function main(tbl){
	let item=dao.fetch("app_tag",Cnd.where("id","=",tbl.id));
	return item;
}