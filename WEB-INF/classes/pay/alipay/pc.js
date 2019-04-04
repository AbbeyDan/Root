function main(tbl){
	var alipay_config=dao.fetch("alipay_config",Cnd.where("id","=",1))
	var alipay_appid=alipay_config.appid;
	var alipay_private_key=alipay_config.private_key;
	var alipay_public_key=alipay_config.public_key;
	let return_url=alipay_config.return_url;
	let notify_url=alipay_config.notify_url;
	var order=dao.fetch("app_order",Cnd.where("id","=",tbl.id))
	//获得初始化的AlipayClient(//gatewayUrl//appid//私钥//文档类型//charset//公钥//sign_type)
	var alipayClient = new com.alipay.api.DefaultAlipayClient("https://openapi.alipay.com/gateway.do",alipay_appid,alipay_private_key,"json","utf-8",alipay_public_key,"RSA2");
	var alipayRequest = new com.alipay.api.request.AlipayTradePagePayRequest();//设置请求参数 电脑版不一样
	alipayRequest.setReturnUrl(return_url);
	alipayRequest.setNotifyUrl(notify_url);
	alipayRequest.setBizContent("{\"out_trade_no\":\""+ order.orderno +"\"," 
			+ "\"total_amount\":\""+ order.price +"\"," 
			+ "\"subject\":\""+ order.title+"\"," 
			+ "\"body\":\""+ order.title +"\"," 
			+ "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");//电脑版要修改
	var result = alipayClient.pageExecute(alipayRequest).getBody();//请求
	print(result)
	return "html=>"+result;
}