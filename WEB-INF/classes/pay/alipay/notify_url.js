function main(tbl){
	let params = new HashMap();
	let requestParams = req.getParameterMap();
	let iter = requestParams.keySet().iterator();
	for (let iter = requestParams.keySet().iterator();iter.hasNext();) {
		let name = iter.next();
		let values = requestParams.get(name);
		let valueStr = "";
		for (let i = 0; i < values.length; i++) {
			valueStr = (i == values.length - 1) ? valueStr + values[i]
					: valueStr + values[i] + ",";
		}
		//乱码解决，这段代码在出现乱码时使用
		//valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
		params.put(name, valueStr);
	}
	
	var conf=dao.fetch("alipay_config",Cnd.where("id","=",1))
	//商户订单号
	var out_trade_no = tbl.out_trade_no;
	//支付宝交易号
	var trade_no = tbl.trade_no;
	//交易状态
	var trade_status = tbl.trade_status;
	var verify_result=false;
	try {
		let AlipaySignature=Java.type("com.alipay.api.internal.util.AlipaySignature")
		print("p="+params.class.name)
		verify_result =AlipaySignature.rsaCheckV1(params, conf.alipay_public_key, "utf-8", "RSA2");
	} catch (e) {
		print("conver alipay order fail!")
		e.printStackTrace();
	}
	var result=""
	if(verify_result){//验证成功
		if(trade_status=="TRADE_FINISHED"||trade_status=="TRADE_SUCCESS"){
			var order = dao.fetch("app_order", Cnd.where("orderno", "=", out_trade_no));
				if(order.status == 1){
					result= "success";
					return result;
				}
				if(trade_status=="TRADE_FINISHED"){
					result="fail"
				}
				exec(order);
				dao.update("app_order",Chain.make("status",1).add("paytype","alipay").add("pay_time",new java.util.Date()),Cnd.where("id","=",order.id));
		}
		result="success"
		let tab=new JseMap();
		tab.put(".table", "alipay_notify");
		tab.put("text", toJson(tbl));
		dao.insert(tab);
	}else{//验证失败
		result= "fail";
	} 
	return result;//则不再提示
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