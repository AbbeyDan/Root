function main(tbl){
	try{
	tbl.put(".table","app_course")
	if(isEmpty(tbl.section)){
		tbl.put("section",0)
	}
	if(isEmpty(tbl.duration)){
		tbl.put("duration",0)
	}
	
	let chapter=new ArrayList();
	if(isEmpty(tbl.chapter)||isEmpty(tbl.chapter.type)){
		
	}else if(typeof(tbl.chapter.type)=="string"){
		let c=new Record();
		c.put("type",tbl.chapter.type)
		c.put("title",tbl.chapter.title)
		c.put("val",tbl.chapter.val)
		c.put("open",tbl.chapter.open)
		chapter.add(c)
	}else{
		for (var i = 0; i < tbl.chapter.type.size(); i++) {
			let c=new Record();
			c.put("type",tbl.chapter.type[i])
			c.put("title",tbl.chapter.title[i])
			c.put("val",tbl.chapter.val[i])
			c.put("open",tbl.chapter.open[i])
			chapter.add(c)
		}
	}
	let list=new ArrayList();
	let section=0;
	let duration=0;
	for (var i = 0; i < chapter.size(); i++) {
		let c=new Record();
		c.putAll(chapter[i])
			if(chapter[i].type=="video"){
				let v=dao.fetch("app_video",Cnd.where("vid","=",chapter[i].val))
				section+=1;
				duration+=v.duration;
				if(isEmpty(c.title)){
					c.put("title",v.title);
				}
				c.putAll(v);
			}else if(chapter[i].type=="course"){
				let v=dao.fetch("app_course",Cnd.where("id","=",chapter[i].val))
				section+=v.section;
				duration+=v.duration;
				if(isEmpty(c.title)){
					c.put("title",v.title);
				}
				c.put("img",v.img);
				c.put("tname",v.tname);
				c.put("text",Strings.escapeJson(v.text));
				c.put("chapter",v.chapter);
			}else{
			}
			
			list.add(c)
	}
	tbl.put("chapter",toJson(list))
	tbl.put("section",section)
	tbl.put("duration",duration)
	//print(tbl)
	$mager(tbl)
	return {"code":200,"url":"index"}
	}catch (e) {
		print(e)
		return {"code":-1,"msg":e};
	}
}