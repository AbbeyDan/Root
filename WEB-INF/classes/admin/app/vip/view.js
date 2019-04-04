function main(tbl){
	let item=dao.fetch("app_vip",Cnd.where("id","=",tbl.id));
	return item;
}