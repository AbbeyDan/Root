function main(p){
	//print("首页"+p)
	cache.put("tjxx",dao.query("app_course",Cnd.where("price",">",0).desc("id"),new Pager(1,4)))
	attr("toutiao",dao.query("app_article",Cnd.where("1","=",1),new Pager(1,7)))
	attr("courses",dao.query("app_course",Cnd.where("type","<>","PRO").desc("id"),new Pager(1,8)))
	attr("banners",dao.query("app_banner",Cnd.where("type","=","首页")))
	attr("teachers",dao.query("app_teacher",Cnd.where("1","=",1),new Pager(1,21)))
	attr("zbs",dao.query("app_zb",Cnd.where("1","=",1).desc("start_time"),new Pager(1,6)))
	attr("zts",dao.query("app_zt",Cnd.where("1","=",1).desc("id"),new Pager(1,3)))
	attr("combos",dao.query("app_course",Cnd.where("type","=","combo").desc("id"),new Pager(1,10)))
	attr("links",dao.query("app_link",Cnd.where("img","is not",null).desc("id"),new Pager(1,14)))
	attr("meets",dao.query("app_meet",Cnd.where("1","=",1).desc("id"),new Pager(1,3)))
	cache.put("cates",dao.query("app_cate"))
}