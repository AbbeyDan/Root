function main(tbl){
	session.removeAttribute("user");
	session.invalidate();
	delCookie();
	return ">>:/login";
}