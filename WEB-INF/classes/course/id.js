function main(tbl){
	if(user()==null){
		return ">>:/login?gotourl=/course/"+tbl.id;
	}
	var course=dao.fetch("app_course",Cnd.where("id","=",tbl.id))
	if(course==null){
		return ">>:/404.html"
	}
	let video=null;
	let isplay=false;
	let vip=user().vip;
	if(isEmpty(tbl.vid)){
		course.chapter.forEach(function(c){
			if(c.type=="video"&&video==null){
				video=dao.fetch("app_video",Cnd.where("vid","=",c.val))
			}else if(c.type=="course"&&video==null){
				c.chapter.forEach(function(x){
					video=dao.fetch("app_video",Cnd.where("vid","=",x.val))
				})
			}
		})
	}else{
		course.chapter.forEach(function(c){
			if(c.type=="video"&&c.val==tbl.vid&&c.open=="是"){
				isplay=true;
			}
		})
		video=dao.fetch("app_video",Cnd.where("vid","=",tbl.vid))
	}
	attr("video",video)
	if(course.type!="公开课"){
			let cu=dao.fetch("app_order",Cnd.where("tbl_name","=","course").and("tbl_id","=",tbl.id)
					.and("user_id","=",user().id).and("status","=",1));
			if(course.type=="PRO"){//pc专有
				if(vip>3){
					isplay=true;
				}
				if(isEmpty(tbl.vid)&&isEmpty(tbl.play)){
					attr("page","/course/pro.html")
				}else if(cu==null){
					attr("page","/course/pro.html")
				}
			}
			if(cu!=null){
				isplay=true;
				let play=dao.fetch("app_play",Cnd.where("user_id","=",user().id)
							.and("tbl_name","=","course").and("tbl_id","=",tbl.id))
					if(play==null){
						$save({".table":"app_play","tbl_name":"course","tbl_id":tbl.id,"img":course.img,
						"title":course.title,"progress":course.section,"user_id":user().id,"vids":[tbl.vid]})
					}else{
						if(play.vids!=null&&!play.vids.contains(tbl.vid)){
							play.vids.add(tbl.vid);
							dao.update("app_play",Chain.make("vids",play.vids),Cnd.where("id","=",play.id));
						}
				}
			}else if(course.type=="套餐"){//pc专有
				if(vip>1){
					isplay=true;
				}else{
					attr("page","/course/combo.html")
				}
			}else if(course.type=="精品"){//pc专有
				if(vip>2){
					isplay=true;
				}else{
					attr("page","/course/course.html")
				}
			}else if(course.type=="VIP"){//pc专有
				if(vip>0){
					isplay=true;
				}else{
					attr("page","/course/course.html")
				}
			}else if(course.type=="独家"){//pc专有
				attr("page","/course/sole.html")
			}
	}else{
			let play=dao.fetch("app_play",Cnd.where("user_id","=",user().id)
					.and("tbl_name","=","course").and("tbl_id","=",tbl.id))
			if(play==null){
				$save({".table":"app_play","tbl_name":"course","tbl_id":tbl.id,"img":course.img,
				"title":course.title,"progress":course.section,"user_id":user().id,"vids":[tbl.vid]})
			}else{
				if(play.vids!=null&&!play.vids.contains(tbl.vid)){
					play.vids.add(tbl.vid);
					dao.update("app_play",Chain.make("vids",play.vids),Cnd.where("id","=",play.id));
				}
			}
		isplay=true;
	}
	attr("teachers",dao.query("app_teacher",Cnd.where("name","in",course.tname.split(","))))
	attr("isplay",isplay)
	if(!isEmpty(course.extend)){
		course.put("extend",foJson(course.extend))
	}else{
		course.put("extend",[])
	}
	return course;
}