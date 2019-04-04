function main(tbl){
	try {
	tbl.put(".table","app_tag")
	dao.update(tbl)
	return ">>:index"
	}catch (e) {
		return {"code":-1,"msg":e};
	}
}