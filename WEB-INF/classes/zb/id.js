function main(tbl){
	if(user()==null){
		return ">>:/login?gotourl=/zb/"+tbl.id;
	}
	var zb= dao.fetch("app_zb",Cnd.where("id","=",tbl.id))
	if(zb.vid!=0){
		let video=dao.fetch("app_video",Cnd.where("vid","=",zb.vid))
		attr("video",video)
	}else{
		attr("video",{"url":"rtmp://live.iepsy.com/zb/"+tbl.id,"islive":true})
	}
	return zb;
}