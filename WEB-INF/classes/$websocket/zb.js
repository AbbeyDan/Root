var url="/ws/zb";
function open(session,param,rooms){//参数 name=[x,x,x]
		var sess=rooms.get(param.id);
		if(sess==null){
			sess=new ArrayList();
		}
		sess.add(session)
		rooms.put(param.id,sess)
		
		//$app("rooms",rooms)
}
function message(session,param,rooms,msg){//参数 消息
		var sess=rooms.get(param.id);
		print(sess.size())
		sess.forEach(function(v){
			v.getAsyncRemote().sendText(msg);
		})
}
function close(session,param,rooms,cr){
	rooms.get(param.id).remove(session)
}
function error(session,param,rooms,thr){
	thr.printStackTrace();
}