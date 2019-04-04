function main(tbl){
	session.removeAttribute("admin");
	session.invalidate();
//	print(sattr("admin"))
	delCookie();
	return ">>:/admin/login";
}