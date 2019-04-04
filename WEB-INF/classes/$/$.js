function main(tbl){
	if($url()=="/user/index"||$url()=="/course/index"
		||$url()=="/zb/index"||$url()=="/combo/index"
		||$url()=="/teacher/index"||$url()=="/agency/index"||$url()=="/teacher/id"
		||$url()=="/article/index"||$url()=="/fm/index"
		||$url()=="/index"||$url()=="/zt/index"
		||$url()=="/user/logout"||$url()=="/user/update"){
		return "chain"
	}
	let u=user();
	if(($suffix()=="html"||$suffix()=="")&&u!=null){
		if(isEmpty(u.phone)||isEmpty(u.name)){
			return ">>:/user/";
		}
	}
}