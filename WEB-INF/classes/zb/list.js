function main(tbl){
	let cnd=Cnd.where("1","=",1)
	let date=new Date();
	var year=date.year+1900; 
	var month=date.month+1;
	if(tbl.year||false){
		year=tbl.year;
	}
	if(tbl.month||false){
		month=tbl.month;
	}
	month=parseInt(month)
	attr("year",parseInt(year))
	attr("month",month)
	if(month<10&&month>0){
		month="0"+month
	}
	if(month==0){
		cnd.and("start_time","like",year+"-%")
	}else{
		cnd.and("start_time","like",year+"-"+month+"-%")
	}
	
	var list=dao.query("app_zb",cnd.desc("id"));
	return list;
}