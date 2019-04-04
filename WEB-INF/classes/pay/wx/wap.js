function main(tbl){
	var wxconfig=dao.fetch("wx_config",Cnd.where("id","=",sattr("wxid")))
	tbl.put("appid",wxconfig.appid)
	tbl.put("mch_id",wxconfig.mch_id)
	tbl.put("paykey",wxconfig.paykey)
	tbl.put("notify_url",wxconfig.notify_url)
	tbl.put("openid",sattr("openid"))
	tbl.put("title","测试商品")
	tbl.put("orderno","20180525143350")
	tbl.put("price",0.01)
	tbl.put("id",99)
	tbl.put("scene_info", "'h5_info':{'type':'Wap','wap_url':'act.imyunxiang.com','wap_name': '测试H5'}");
	tbl.put("redirect_url","http://act.imyunxiang.com/m/yx/")
	let wxPay=ioc.get("wxPay", Packages.jse.pay.WxPay.class);
	let res=wxPay.getWap(tbl);
	print(res)
	return res;
}