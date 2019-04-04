var sqlmp={}
function main(p){
	if($url()=="/admin/login"||
			$url()=="/admin/user/login"||
			$url()=="/admin/user/logout"){
		return "chain"
	}
	
	
	let u=session.getAttribute("admin");
	if(u==null&&user()!=null){
		if(user().role_id>0){
			let auths=dao.select("select auth from sys_menu where auth is not null and id in (" +
            		"select menu_id from sys_role_menu where role_id= "+user().role_id+
            		")","string[]");
			user().put("auths",auths)
			sattr("admin",user())
			u=user();
		}
	}
	if(u==null){
		return ">>:/admin/login";
	}else{
		if(u.role_id==1){
			u.put("auths",["admin:"])
		}else{
			sqlmp={"datascope":` and d.id IN ( SELECT unit_id FROM sys_role_unit WHERE role_id = ${u.role_id} )`}
			if(isEmpty(u.auths)){
				u.put("auths",["admin:index:","admin:main"])
			}else{
				u.auths.addAll(["admin:index:","admin:main"])
			}
		}
		if(!isAuth(u.auths)){//需要权限
			return ">>:/notauth"
		}
	}
}
var admin=sattr("admin")
var aconfig=cache.get("aconfig")
if(aconfig==null){
	var t={};
	var s1=dao.query("select ckey,cval from sys_config");
	s1.forEach(function(x){
		t[x.ckey]=x.cval;
	})
	aconfig=t;
	cache.put("aconfig",aconfig)
}

function isAuth(auths){
	let isau=false;
	let qx=$url().substring(1).replaceAll("/",":")
	if (qx.equals("")||qx.endsWith("/")) {
		qx += "index";
	}
	qx=qx.substring(qx.length-1,qx.length)==":"?qx:qx+":";
	if(auths!=null){
		auths.forEach(function(x){
			let x1=x.substring(x.length-1,x.length)==":"?x:x+":";
			if(qx.startsWith(x1)){
				isau=true;
			}
		})
	}
	return isau;
}