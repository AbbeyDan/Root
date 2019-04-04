function main(tbl){
	return dao.fetch("sys_role",Cnd.where("id","=",tbl.id))
}