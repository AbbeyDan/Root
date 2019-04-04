function mp4(tbl){
	if(!check(tbl)){
		return {"code":10006,"msg":"appid or secret error!"}
	}
	var video=dao.fetch("video",Cnd.where("id","=",tbl.id))
	var api=Java.type("com.jse.plug.AliyunApi");
	var map=new NutMap();
	map.put("VideoId",video.VideoId)
	map.put("Formats","mp4")
	var body=api.exec("GetPlayInfo",map)
	var rtv=foJson(body)
	var list=rtv.PlayInfoList.PlayInfo;
	//var rs=list.stream().filter(x->x.getString("Definition").equals("FD")).findFirst().get();
	var rs=list.stream().min(new java.util.Comparator() {
		compare:function(o1,o2) {
			return o1.get("Size").compareTo(o2.get("Size"));
		}
	}).get();
	return rs;
}