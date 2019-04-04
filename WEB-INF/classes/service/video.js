function video(tbl){
	if(!check(tbl)){
		return {"code":10006,"msg":"appid or secret error!"}
	}
	var video=dao.fetch("video",Cnd.where("id","=",tbl.id))
	/*var api=Java.type("com.jse.plug.AliyunApi");
	var map=new NutMap();
	map.put("VideoId",video.VideoId)
	var body=api.exec("GetVideoPlayAuth",map)
	var rtv=foJson(body)
	map.put("CoverURL",video.CoverURL)
	map.put("PlayAuth",rtv.PlayAuth)
	map.put("width",tbl.width||"100%")
	map.put("height",tbl.height||"100%")
	return map;*/
	video.put("width",tbl.width||"100%")
	video.put("height",tbl.height||"100%")
	video.put("playinfo",foJson(video.playinfo))
	return video;
}