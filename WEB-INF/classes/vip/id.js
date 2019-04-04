function main(tbl){
	let item=dao.fetch("app_vip",Cnd.where("id","=",tbl.id));
	if(!isEmpty(item.tag)){
		let courses=dao.query("app_course",Cnd.where("tag","like","%"+item.tag+"%")
				,1,2);
		let tags=new HashSet();
		let tnames=new HashSet();
		courses.forEach(function(c){
			tnames.addAll(Arrays.asList(c.tname.split(",")))
			tags.addAll(Arrays.asList(c.tname.split(",")))
		})
		let ts=dao.query("app_teacher",Cnd.where("name","in",tnames))||new ArrayList();
		attr("teachers",ts)
		attr("courses",courses)
		attr("page","vip/vip.html")
		return item;
	}
	if(isEmpty(item.data)){
		item["data"]=[]
	}
	let tnames=new ArrayList();
	item.data.forEach(function(d){
		let courses=dao.query("app_course",Cnd.where("id","in",d.cid));
		courses.forEach(function(c){
			tnames.addAll(Arrays.asList(c.tname.split(",")))
		})
		d.put("courses",courses)
	})
	if(user()!=null){
		let isbuy=dao.count("app_order",Cnd.where("status","=",1).and("tbl_name","=","vip")
				.and("tbl_id","=",tbl.id).and("user_id","=",user().id))
		attr("isbuy",isbuy>0);
	}
	let ts=dao.query("app_teacher",Cnd.where("name","in",tnames))||new ArrayList();
	attr("teachers",ts)
	return item;
}