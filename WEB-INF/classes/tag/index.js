function main(p){
	let cnd=Cnd.where("1","=",1)
	let page=p.page||1;
	let pager=dao.pager("app_tag",cnd.desc("id"),page,100)
	pager.list.forEach(function(t){
		t.put("cnum",dao.count("app_course",Cnd.where("tag","like","%"+t.name+"%")))
	})
	cache.put("tags",pager.list)
	return pager;
}