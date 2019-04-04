function main(tbl){
	let item=dao.fetch("users",Cnd.where("id","=",tbl.id));
	return item;
}