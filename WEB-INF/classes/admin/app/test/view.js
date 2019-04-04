function main(tbl){
	let item=dao.fetch("app_test",Cnd.where("id","=",tbl.id));
	return item;
}