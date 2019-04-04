function main(tbl){
	try {
		$del("app_video",tbl.id)
		return {"code":200,"msg":"success"};
	} catch (e) {
		return {"code":-1,"msg":e};
	}
}