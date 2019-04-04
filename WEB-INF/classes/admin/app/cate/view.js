function main(tbl){
	let item=dao.fetch("app_cate",Cnd.where("id","=",tbl.id));
	return item;
}