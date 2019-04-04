function main(tbl){
	if(user()==null){
		return ">>:/login?gotourl=/pay/order/"+tbl.id
	}
	let o=dao.fetch("app_order",Cnd.where("id","=",tbl.id))
	if(o!=null){
		if(o.status==1){
			attr("page","pay/order/success.html")
		}
		return o;
	}else{
		return ">>:/404"
	}
}