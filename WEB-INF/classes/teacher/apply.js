function main(tbl){
	let list=dao.query("app_teacher",Cnd.where("1","=",1).desc("id"),1,4);
	return list
}