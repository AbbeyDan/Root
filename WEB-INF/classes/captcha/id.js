function main(tbl){
	if(!isEmpty(tbl.id)){
		req.setAttribute("id",tbl.id)
	}
	Captcha.render(req,resp);
	return "void"
}