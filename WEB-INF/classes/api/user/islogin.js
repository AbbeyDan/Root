function main(tbl){
	let num=dao.count("users",Cnd.where("`password`","=",tbl.password)
			.add("and (username='"+tbl.username+"' or phone='"+tbl.username+"')"))
	let res=Record.create();
	if(num>0){
		res.put("code",200)
		return res;
	}else{
		return res;
	}
}