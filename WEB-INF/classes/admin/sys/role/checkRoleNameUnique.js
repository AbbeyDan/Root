//txt
function main(tbl){
	print(tbl)
	let info=dao.sql("sysrole.checkRoleNameUnique",{name:tbl.name},"map")
	print(info)
	if(info!=null && info.name==tbl.name){
       return "1";
    }
    return "0";
}