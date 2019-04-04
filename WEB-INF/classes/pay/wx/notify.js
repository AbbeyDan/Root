function main(tbl){
	try{
		tbl=Xmls.xmlToMap(reqBody());
		let result="<xml><return_code><![CDATA[SUCCESS]]></return_code><return_msg><![CDATA[OK]]></return_msg></xml>";
		
	let orderno=tbl.out_trade_no;
	if(tbl.return_code=="SUCCESS"){
		var order = dao.fetch("app_order", Cnd.where("orderno", "=", orderno));
		if(order.status == 1){
			return result;
		}
		exec(order);
		dao.update("app_order",Chain.make("status",1).add("paytype","wxpay").add("pay_time",new java.util.Date()),Cnd.where("id","=",order.id));
		let tab=new Record();
		tab.put(".table", "wxpay_notify");
		tab.put("text",tbl)
		dao.insert(tab)
		return result;
	}
} catch (e) {
	print(e);
	result=e;
	return "error";
}
}

function exec(order){
	if(order.tbl_name=="course"){
		let cu=dao.fetch("app_cu",Cnd.where("cid","=",order.tbl_id)
				.and("uid","=",order.user_id));
		if(cu==null){
			let tab=new Record();
			tab.put(".table", "app_cu");
			tab.put("title",order.title)
			tab.put("img",order.img)
			tab.put("text",order.text)
			tab.put("cid",order.tbl_id)
			tab.put("uid",order.user_id)
			let dat=Calendar.getInstance();
					dat.add(Calendar.DATE,90);//增加90天
			tab.put("end_time",dat.getTime())
			dao.insert(tab)
		}
	}
}
