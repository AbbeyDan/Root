function main(tbl){
	let item=dao.fetch("app_video",Cnd.where("id","=",tbl.id));
	return item;
}