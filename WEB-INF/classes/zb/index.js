function main(p){
	let page=p.page||1;
	
	let list=dao.query("app_zb",Cnd.where("1","=",1).desc("id"),page,10)
	return list;
}