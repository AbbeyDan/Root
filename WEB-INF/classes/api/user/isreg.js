function main(tbl){
	let num=dao.count("users",Cnd.where("phone","=",tbl.phone));
	let res=Record.create();
	if(num>0){
		res.put("code",200)
		return res;
	}else{
		res.put("code",-1)
		res.put("msg","手机号或密码不正确")
		return res;
	}
}