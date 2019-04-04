function main(tbl){
	try{
	tbl.put(".table","app_vip")
	if(isEmpty(tbl.data)){
		tbl.put("data","[]")
	}
	if(isEmpty(tbl.qa)){
		tbl.put("qa","[]")
	}else{
		let qa=new ArrayList();
		
		for (var i = 0; i < tbl.qa.q.size(); i++) {
			qa.add({"q":tbl.qa.q[i],"a":tbl.qa.a[i]})
		}
		tbl.put("qa",qa)
	}
	$mager(tbl)
	attr("_httpurl","index")
	return {"code":200,"url":"index"}
	}catch (e) {
		return {"code":-1,"msg":e};
	}
}