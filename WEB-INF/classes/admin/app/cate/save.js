function main(tbl){
	try{
	tbl.put(".table","app_cate")
	dao.save(tbl)
	return {"code":200,"url":"index"}
	}catch (e) {
		return {"code":-1,"msg":e};
	}
}