function main(tbl){
	try {
	tbl.put(".table","app_test")
	dao.update(tbl)
	return {"code":200,"url":"index"}
	}catch (e) {
		return {"code":-1,"msg":e};
	}
}