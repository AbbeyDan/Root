function main(tbl){
	tbl.put(".table","app_chat")
	tbl.put("timestamp",System.currentTimeMillis())
	dao.insert(tbl)
	return tbl;
}
