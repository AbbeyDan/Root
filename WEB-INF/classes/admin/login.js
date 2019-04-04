function main(p){
	if(sattr("admin")!=null){
		return ">>:/admin/"
	}else{
		var num="";
		for(var i=0;i<4;i++){
			num+=Math.floor(Math.random()*10)
		}
		attr("code",num)
	}
}