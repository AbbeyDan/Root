/** 查询用户菜单 **/
/* menusbyuid */
select distinct m.id, m.pid, m.name, m.url, m.auth , m.type, m.icon, m.order_num, m.create_time
		from sys_menu m
			 left join sys_role_menu rm on m.id = rm.menu_id
			 left join sys_user_role ur on rm.role_id = ur.role_id
			 LEFT JOIN sys_role ro on ur.role_id = ro.role_id
		where ur.user_id = #(user_id) and m.type in ('M', 'C') and m.visible = 0  AND ro.status = 0
		order by m.order_num
/** 查询所有菜单 **/
/* menusall */
select distinct m.id, m.pid, m.name, m.url, m.auth , m.type, m.icon, m.order_num, m.create_time
		from sys_menu m
		where m.type in ('M', 'C') and m.visible = 0
		order by m.order_num