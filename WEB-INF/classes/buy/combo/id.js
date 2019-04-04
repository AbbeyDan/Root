function main(tbl){
	if(user()==null){
		return ">>:/login?gotourl=/buy/combo/"+tbl.id
	}
	let c=dao.fetch("app_combo",Cnd.where("id","=",tbl.id))
	let o=dao.fetch("app_order",Cnd.where("tbl_name","=","combo")
			.and("tbl_id","=",tbl.id).and("user_id","=",user().id))
	if(o!=null){
		return ">>:/pay/order/"+o.id;
	}else{
		if(c.price>0){
			var order=new Record();
			order.put(".table","app_order")
			order.put("+id","id");
			order.put("orderno",Order.no());
			order.put("tbl_name","combo");
			order.put("tbl_id",tbl.id);
			order.put("title",c.title);
			order.put("img",c.img);
			order.put("agency_id",c.agency_id);
			order.put("agency_name",c.agency_name);
			if(!isEmpty(tbl.uid)){
				order.put("uid",tbl.uid);
			}
			order.put("user_id",user().id);
			order.put("price",c.price); 
			order.put("total_price",c.price)
			order.put("text","套餐: 《"+c.title+"》 ")
			var dat = new java.util.Date();
			var cal = Calendar.getInstance();
			cal.setTime(dat);
			cal.add(Calendar.MONTH,3);//用Calendar对月加3,绕开判断闰年
			var end_time=cal.getTime();
			order.put("end_time", end_time);
			dao.insert(order)
			return ">>:/pay/order/"+order.id;
		}
	}
}