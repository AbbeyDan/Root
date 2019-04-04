//json
function main(tbl){
	let access_token=cache.get("dyh.access_token")
	if(access_token==null){
		var tokenmap=Http.get("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx56b76c4baab26b0d&secret=cea24e6d3260cb5cd62ef94e082cccf2")
		access_token=foJson(tokenmap).access_token;
		cache.put("dyh.access_token",access_token,700000)
	}
	print(access_token)
	if(tbl.count||false){
		return Http.get("https://api.weixin.qq.com/cgi-bin/material/get_materialcount?access_token="+access_token)
	}
	let count=1;
	let scs=new ArrayList();
	var jlist=Http.post3("https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token="+access_token,
			`{"type":"news","offset":"0","count":"20"}`,null,6000).getContent();
	jlist=foJson(jlist);
	print(jlist)
	count=parseInt(jlist.total_count/20);
	scs.addAll(jlist.item);
	for (let i = 1; i <= count; i++) {
		var sucai=Http.post3("https://api.weixin.qq.com/cgi-bin/material/batchget_material?access_token="+access_token,
				`{"type":"news","offset":"${i*20}","count":"20"}`,null,6000).getContent();
		scs.addAll(foJson(sucai).item);
	}
	Collections.reverse(scs);
	Fs.deletePath(Jse.webapps+"upload/article/")
	let list=new ArrayList();
	for (let j = 0; j < scs.size(); j++) {
		let x=scs.get(j);
		var item=x.content.news_item[0];
		var imgpath="upload/article/"+(j+1)+".jpg"
		downimg(item.thumb_url,Jse.webapps+imgpath);
		list.add({".table":"app_article",title:item.title,author:item.author,text:item.digest,
			media_id:x.media_id,img:imgpath,url:item.url,add_time:Times.ts2D(x.update_time)});
	}
	dao.exec("truncate table app_article;");
	dao.insert(list)
	return {"code":200,"msg":"更新文章"+list.size()+"篇"};
}