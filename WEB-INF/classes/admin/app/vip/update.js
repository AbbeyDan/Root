function main(tbl){
	try {
	tbl.put(".table","app_vip")
	if(isEmpty(tbl.data)){
		tbl.put("data","[]")
	}
	dao.update(tbl)
	attr("_httpurl","index")
	return {"code":200,"url":"index"}
	}catch (e) {
		return {"code":-1,"msg":e};
	}
}