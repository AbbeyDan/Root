function main(p){
	let combo=dao.fetch("app_combo",Cnd.where("id","=",p.id))
	let teachers=new HashSet();
	combo.chapter.forEach(function(c){
		teachers.add(c.tname)
	})
	attr("teachers",dao.query("app_teacher",Cnd.where("name","in",teachers)))
	return combo;
}