function main(p){
	let cnd=Cnd.where("1","=",1)
	if(p.name||false){
		cnd.and("tag","like","%"+p.name+"%")
	}
	
	let page=p.page||1;
	let pager=dao.pager("app_course",cnd.desc("id"),page,24)
	return pager;
}