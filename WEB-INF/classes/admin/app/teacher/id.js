function main(tbl){
	let item=dao.fetch("app_teacher",Cnd.where("id","=",tbl.id));
	return item;
}