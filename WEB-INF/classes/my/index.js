function main(tbl){
	if(user()==null){
		return ">>:/login?gotourl=/my/"
	}
	let courses=dao.select(`select * from app_course where id in 
	(select tbl_id from app_order where user_id = ${user().id}  and status = 1  and tbl_name = 'course' )`)
	
	return courses;
}