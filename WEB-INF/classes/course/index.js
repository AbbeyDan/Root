function main(tbl){
	print(tbl)
	let cnd=Cnd.where("type","<>","PRO")
	let sort="id"
	if(tbl.sort||false){
		sort=tbl.sort;
	}
	if(tbl.field||false){
		cnd.and("field","like",`%${tbl.field}%`)
	}
	if(tbl.crowd||false){
		cnd.and("crowd","like",`%${tbl.crowd}%`)
	}
	if(tbl.sect||false){
		cnd.and("sect","like",`%${tbl.sect}%`)
	}
	if(tbl.cases||false){
		cnd.and("cases","like",`%${tbl.cases}%`)
	}
	if(tbl.auth||false){
		cnd.and("auth","like",`%${tbl.auth}%`)
	}
	if(tbl.train||false){
		cnd.and("train","like",`%${tbl.train}%`)
	}
	if(tbl.meet||false){
		cnd.and("meet","like",`%${tbl.meet}%`)
	}
	if(tbl.ttype||false){
		cnd.and("ttype","like",`%${tbl.ttype}%`)
	}
	if(tbl.type||false){
		cnd.and("type","like",`%${tbl.type}%`)
	}
	if(tbl.price||false){
		cnd.and("price",tbl.price,0)
	}
	let page=tbl.page||1;
	let limit=tbl.limit||24;
	var pager=dao.pager("app_course",cnd.desc(sort),page,limit);
	return pager;
}