//json
function main(tbl){
	print(tbl)
	let cnd=Cnd.where("1","=",1)
	if(tbl.dict_type||false){
		cnd.and("dict_type","=",tbl.dict_type)
	}
	let page=tbl.pageNum||1;
	let limit=tbl.pageSize||10;
	var list=dao.table("sys_dict_data",cnd,page,limit);
	return list;
}