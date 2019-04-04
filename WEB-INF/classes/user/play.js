function main(tbl){
	if(user()==null){
		return ">>:/login?gotourl=/user/play"
	}
	return dao.pager("app_play",Cnd.where("user_id","=",user().id)
			.and("progress","<",100),1,12)
}