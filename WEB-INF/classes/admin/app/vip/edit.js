function main(tbl){
	let item=dao.fetch("app_vip",Cnd.where("id","=",tbl.id));
	let nodes=[];
	if(item.data!=null){
		item.data.forEach(function(d){
			let it={"pid":0,"mulu":true,"name":d.title,children:[]}
			d.cid.forEach(function(c){
				it.children.push({"name":c})
			})
			nodes.push(it)
		})
	}
	attr("nodes",JSON.stringify(nodes))
	return item;
}