function main(tbl){
	try {
	tbl.put(".table","app_banner")
	$mager(tbl)
	attr("_httpurl","index")
	return {"code":200,"url":"index"}
	}catch (e) {
		return {"code":-1,"msg":e};
	}
}