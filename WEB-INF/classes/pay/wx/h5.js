function main(tbl){
	let u=user();
	if(u==null){
		return ">>:/login"
	}
	let user_id=u.id
	let openid=u.openid
	var order=dao.fetch("app_order",Cnd.where("id","=",tbl.id))
	var wxconfig=dao.fetch("wx_config",Cnd.where("id","=",1))
	let tab=new Record();
	tab.put("appid",wxconfig.appid)
	tab.put("mch_id",wxconfig.mch_id)
	tab.put("paykey",wxconfig.paykey)
	tab.put("notify_url",wxconfig.notify_url)
	tab.put("openid",openid)
	tab.put("title",order.title)
	tab.put("phone",order.phone)
	tab.put("no",order.orderno)
	var _orderno = order.orderno+"-"+System.currentTimeMillis();
	if(_orderno.length() > 32){
		_orderno=_orderno.substring(0,32);
	}
	tab.put("orderno",_orderno)
	tab.put("price",order.price)
	tab.put("+id",0)
	tab.put("user_id",user_id)
	tab.put(".table","wxpay_log")
	dao.insert(tab)
	try {
		attr("teacher",dao.fetch("sys_user",Cnd.where("codes","like","%"+u.code+",%").and("role_id","=",2)))
	} catch (e) {
		// TODO: handle exception
	}
	
	let wxPay=ioc.get("wxPay", Packages.jse.pay.WxPay.class);
	let res=wxPay.getH5(tab);
	return res;
}
