function main(tbl){
	let num=dao.count("app_order",Cnd.where("id","=",tbl.id)
			.and("status","=",1))
	if(num>0){
		return {"code":200,"url":"pay/order/"+tbl.id}
	}else{
		return {"code":0};
	}
}