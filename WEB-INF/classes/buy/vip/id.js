function main(tbl){
	if(tbl.id=="4"||tbl.id=="5"){
		return "http://www.iepsy.com/xinlisg/#map";
	}
	if(user()==null){
		return ">>:/login?gotourl=/buy/vip/"+tbl.id
	}
	let c=dao.fetch("app_vip",Cnd.where("id","=",tbl.id))
	let o=dao.fetch("app_order",Cnd.where("tbl_name","=","vip")
			.and("tbl_id","=",tbl.id).and("user_id","=",user().id))
	if(o!=null){
		return ">>:/pay/order/"+o.id;
	}else{
		if(c.price>0){
			var order=new Record();
			order.put(".table","app_order")
			order.put("+id","id");
			order.put("orderno",Order.no());
			order.put("tbl_name","vip");
			order.put("tbl_id",tbl.id);
			order.put("title",c.title);
			order.put("img",c.img);
			order.put("agency_id",1);
			order.put("agency_name","心教育学院");
			if(!isEmpty(tbl.uid)){
				order.put("uid",tbl.uid);
			}
			order.put("user_id",user().id);
			order.put("price",c.price); 
			order.put("total_price",c.price)
			order.put("text",c.title+c.name)
			var dat = new java.util.Date();
			var cal = Calendar.getInstance();
			cal.setTime(dat);
			if(c.type=="年"){
				cal.add(Calendar.YEAR,1);//用Calendar对年加1,绕开判断闰年
			}else{
				cal.add(Calendar.MONTH,1);//用Calendar对月加1,绕开判断闰年
			}
			var end_time=cal.getTime();
			order.put("end_time", end_time);
			dao.insert(order)
			return ">>:/pay/order/"+order.id;
		}
	}
}