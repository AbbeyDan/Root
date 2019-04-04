//json
function main(tbl){
	//dao.sqlmp.put("datascope"," and d.id IN ( SELECT unit_id FROM sys_role_unit WHERE role_id = 2 )")
	let list=dao.sql("sysuser.list",{
		"datascope":" and d.id IN ( SELECT unit_id FROM sys_role_unit WHERE role_id = 2 )"
	})
	return list;
}