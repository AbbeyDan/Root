function main(tbl){
	let teacher=dao.fetch("app_teacher",Cnd.where("id","=",tbl.id))
	attr("courses",dao.query("app_course",Cnd.where("tname","like","%"+teacher.name+"%")))
	return teacher;
}