/* selectMenuById */
SELECT t.id, t.pid, t.name, t.order_num, t.url, t.type, t.visible, t.auth, t.icon, t.remark,
			(SELECT name FROM sys_menu WHERE id = t.pid) pname
		FROM sys_menu t
		where t.id = #(id)