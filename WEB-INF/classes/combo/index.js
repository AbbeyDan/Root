function main(p){
	let cnd=Cnd.where("type","=","套餐")
	let page=p.page||1;
	let pager=dao.pager("app_course",cnd.desc("id"),page,100)
	return pager;
}