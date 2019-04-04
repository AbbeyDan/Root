//json
function main(tbl){
	var urole=new ArrayList();
	if(tbl.role_id||false){
		urole.addAll(dao.select(`select menu_id from sys_role_menu where role_id=${tbl.role_id}`,"array"))
	}
	let list=dao.query("sys_menu")
	list.forEach(function(x){
		x.put("title",x.name)
		x.put("name",x.name+"<font color=\"#888\">&nbsp;&nbsp;&nbsp;" + x.auth + "</font>")
		if(urole.contains(x.id)){
			x.put("checked",true)
		}
	})
	let trees=Trees.menus(list)
	return trees;
}