function main(tbl){
	let agency=dao.fetch("app_agency",Cnd.where("id","=",tbl.id))
	
	return agency;
}