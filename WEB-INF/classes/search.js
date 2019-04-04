function main(tbl){
	if(isEmpty(tbl.q)){
		return {"list":[]}
	}
	let type=isEmpty(tbl.type)?"course":tbl.type;
	let cnd=Cnd.where("1","=",1)
	if(type=="course"){
		cnd.add(`and (title like '%${tbl.q}%' or tname like '%${tbl.q}%' or text like '%${tbl.q}%')`)
	}else if(type=="teacher"){
		cnd.add(`and (name like '%${tbl.q}%' or text like '%${tbl.q}%')`)
	}else if(type=="article"){
		cnd.add(`and (title like '%${tbl.q}%' or text like '%${tbl.q}%')`)
	}else if(type=="combo"){
		cnd.add(`and (title like '%${tbl.q}%' or text like '%${tbl.q}%')`)
	}
	let page=tbl.page||1;
	let limit=tbl.limit||10;
	return dao.pager("app_"+type,cnd,page,limit)
}