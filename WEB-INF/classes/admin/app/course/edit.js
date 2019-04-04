function main(tbl){
	return dao.fetch("app_course",Cnd.where("id","=",tbl.id))
}