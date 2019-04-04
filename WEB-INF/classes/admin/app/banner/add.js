function main(tbl){
	attr("banner",dao.fetch("sys_dict",Cnd.where("data_key","=","banner")))
}