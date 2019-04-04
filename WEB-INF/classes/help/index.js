function main(tbl){
	let name="关于我们"
	if(!isEmpty(tbl.name)){
		name=tbl.name;
	}
	let list=dao.query("app_help",Cnd.where("1","=",1))
	attr("list",list)
	let item=dao.fetch("app_help",Cnd.where("name","=",name))
	return item;
}