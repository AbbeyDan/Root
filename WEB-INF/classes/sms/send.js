//信息变更验证码 SMS_148730460 
//用户注册验证码 SMS_148730462
function main(tbl){
	print(tbl)
	var phone=tbl.phone
	//验证输入内容是否为手机号码
	if(!(/^1[1-9][0-9]\d{4,8}$/.test(phone))){
		return {"msg":"手机号码错误"};
	}
	let Sms=Java.type("jse.sms.Sms");
	var res = Sms.send(tbl);
	res.put(".table","sms_res")
	res.put("tmpl",tbl.tmpl)
	dao.insert(res)
}