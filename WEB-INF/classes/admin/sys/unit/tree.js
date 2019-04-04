//json
function main(tbl){
	var urole=new ArrayList();
	if(tbl.role_id||false){
		urole.addAll(dao.select(`select unit_id from sys_role_unit where role_id=${tbl.role_id}`,"array"))
	}
	let list=dao.query("sys_unit")
	list.forEach(function(x){
		x.put("title",x.name)
		if(urole.contains(x.id)){
			x.put("checked",true)
		}
	})
	let trees=Trees.menus(list)
	return trees;
}