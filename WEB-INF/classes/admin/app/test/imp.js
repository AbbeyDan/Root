function main(tbl){
	let file=Jse.webapps+tbl.file;
	try {
		let test=new JseMap();
		test.put(".table", "app_test");
		test.put("file", tbl.file);
	let ExcelUtil=Java.type("cn.hutool.poi.excel.ExcelUtil")
	let reader = ExcelUtil.getReader(file,0);
	let list = reader.read();
	let test1=dao.fetch("app_test",Cnd.where("title","=",list[1][0]))
	if(test1!=null){
		test.put("id", test1.id);
	}else{
		test.put("+id","id");
	}
	test.put("title",list[1][0]);
	test.put("type",list[1][1]);
	test.put("text",list[1][2]||"");
	let items=new ArrayList();
	for (let i = 3; i < list.size(); i++) {
		let item=new Record();
		item.put("title",list[i][0]);
		item.put("type",list[i][1]);
		let its=new ArrayList();
		for (var j = 2; j < 11; j++) {
			let it=list[i][j]
			if(!isEmpty(it)){
				its.add(it)
			}
		}
		item.put("item",its)
		item.put("score",list[i][12])
		item.put("answer",list[i][13])
		item.put("text",list[i][13])
		items.add(item)
	}
	test.put("items",items);
	print(test)
	$mager(test)
	return {"msg":"成功","data":[],"code":200}
	} catch (e) {
		return {"msg":"请检查量表格式!","data":[],"err":e}
	}
}