function main(p){
	//if(sattr("menus")==null){
		let ms1=dao.query("sys_menu",Cnd.where("type","=","菜单"))
	    let menus=Trees.menus(ms1)
		sattr("menus",menus)
	//}
	
}