function main(tbl){
	let page=tbl.page||1;
	let pager=dao.pager("app_teacher",null,page,24);
	pager.list.forEach(function(t){
		t.put("course_num",dao.count("app_course",Cnd.where("tname","like","%"+t.name+"%")))
	})
	return pager
}