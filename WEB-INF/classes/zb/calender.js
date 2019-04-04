function main(tbl){
	let zbs=sattr("zbs");
	if(zbs==null){
		zbs=dao.select("select title,start_time as 'start',id as 'url' from app_zb","list")
		sattr("zbs",zbs);
	}
	return zbs;
}