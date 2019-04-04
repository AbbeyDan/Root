//load(Jse.jarPath+"jse/plug/aliyun.media.js")
var AliyunMedia=Java.type("jse.plug.AliyunMedia")
function main(tbl){
	let count=dao.count("app_video",null)
	if(count<1){
		let num=one(tbl)
		return "本次共同步视频"+num+"条";
	}else{
		let num=0;
		var map=new JseMap();
		map.put("Status","Normal")
		map.put("PageNo","1")
		map.put("PageSize","1")
		map.put("SortBy","CreationTime:Asc")
		map.put("action","GetVideoList")
		var body=AliyunMedia.api(map)
		var data=foJson(body);
		var total=parseInt(data.Total)
		print(parseInt(count/100))
		print((data))
		//if(total/count)
		for (var i = parseInt(count/100)+1; i < parseInt(total/100)+2; i++) {
			map.put("PageNo",i+"")
			map.put("PageSize","100")
			map.put("action","GetVideoList")
			let body1=AliyunMedia.api(map)
			data=foJson(body1);
			let videolist=data.VideoList.Video;
			for (var j = 0; j < videolist.size(); j++) {
				let video=videolist.get(j)
				if(dao.count("app_video",Cnd.where("vid","=",video.VideoId))<1){
					var tab=new Record();
					tab.put(".table","app_video")
					tab.put("vid",video.VideoId)
					tab.put("img",video.CoverURL)
					tab.put("title",video.Title)
					tab.put("size",video.Size)
					tab.put("text",toJson(video))
					tab.put("duration",video.Duration)
					let map1=new JseMap();
					map1.put("VideoId",video.VideoId);
					map1.put("Formats","m3u8,mp4");
					map1.put("action", "GetPlayInfo");
					let body1=AliyunMedia.api(map1)
					tab.put("url","");
					tab.put("url1","");
					try {
						let data1=foJson(body1);
						tab.put("url",data1.PlayInfoList.PlayInfo[0].PlayURL)
						tab.put("url1",data1.PlayInfoList.PlayInfo[1].PlayURL)
						dao.insert(tab)
						num++;
					} catch (e) {
						print(e)
					}
					
				}else{
					print(video+"已存在不需要添加");
					//break;
				}
			}
		}
		return "本次共同步视频"+num+"条";
	}
}
function one(tbl){
	var map=new JseMap();
	map.put("Status","Normal")
	map.put("PageNo","1")
	map.put("PageSize","1")
	map.put("SortBy","CreationTime:Asc")
	map.put("action","GetVideoList")
	var body=AliyunMedia.api(map)
	var data=foJson(body);
	var videolist=new ArrayList();
	var total=parseInt(data.Total)
	for (var i = 1; i < (total/100)+1; i++) {//
		map.put("PageNo",i+"")
		map.put("PageSize","100")
		map.put("action","GetVideoList")
		let body1=AliyunMedia.api(map)
		data=foJson(body1);
		var list=data.VideoList.Video;
		videolist.addAll(list);
	}
	let datalist=new ArrayList();
	for (var i = 0;i<videolist.size(); i++) {
		let video=videolist.get(i)
		var tab=new Record();
		tab.put(".table","app_video")
		tab.put("id",i+1)
		try {
			tab.put("vid",video.VideoId)
			tab.put("img",video.CoverURL)
			tab.put("title",video.Title)
			tab.put("size",video.Size)
			tab.put("text",toJson(video))
			tab.put("duration",video.Duration)
			let map1=new JseMap();
			map1.put("VideoId",video.VideoId);
			map1.put("Formats","m3u8,mp4");
			map1.put("action", "GetPlayInfo");
			tab.put("url","");
			tab.put("url1","");
			let body1=AliyunMedia.api(map1)
			let data1=foJson(body1);
			tab.put("url",data1.PlayInfoList.PlayInfo[0].PlayURL)
			let url1=data1.PlayInfoList.PlayInfo[1].PlayURL;
			tab.put("url1",url1)
		} catch (e) {
			if(e=="TypeError: Cannot read property \"PlayURL\" from undefined"){
			}else{
				print(video)
				print(e)
			}
			//print(tab)
			//e.printStackTrace();
		}
		datalist.add(tab)
	}
	
	dao.inserts(datalist)
	return datalist.size();
}
