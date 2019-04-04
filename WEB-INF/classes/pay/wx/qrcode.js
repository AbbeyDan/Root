function main(tbl){
	var wxconfig=dao.fetch("wx_config",Cnd.where("id","=",1))
	let order=dao.fetch("app_order",Cnd.where("id","=",tbl.id))
	let tab=new Record();
	let WXPay=Java.type("jse.wx.WXPay");
	order.put("notify_url",wxconfig.notify_url);
	order.put("appid",wxconfig.appid);
	order.put("mch_id",wxconfig.mch_id);
	order.put("key",wxconfig.paykey);
	//order.put("openid",user().openid);
	let wxPay=new WXPay();
	let url=wxPay.qrcode(order);
	return {"code":200,"url":url};
}