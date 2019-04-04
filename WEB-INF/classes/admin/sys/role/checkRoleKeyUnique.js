//txt
function main(tbl){
	print(tbl)
	let info=dao.sql("sysrole.checkRoleKeyUnique",{rkey:tbl.rkey},"map")
	if (info!=null && info.rkey== tbl.rkey){
            return "1";
    }
    return "0";
}