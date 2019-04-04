function main(tbl){
	attr("banner",dao.fetch("sys_dict",Cnd.where("data_key","=","banner")))
	let item=dao.fetch("app_banner",Cnd.where("id","=",tbl.id));
	return item;
}