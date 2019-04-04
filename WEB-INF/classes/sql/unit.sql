/* unittree */
select d.id, d.pid, d.ancestors, d.name, d.order_num, d.leader, d.phone, d.email, d.status, d.del_flag, d.create_by, d.create_time 
        from sys_unit d
 where d.del_flag = '0'
        #if(pid != null&&pid != 0)
			AND pid = #(pid)
		#end
		#if(deptName != null && deptName != '')
			AND name like concat('%', #(deptName), '%')
		#end
		#if(status != null && status != '')
			AND status = #(status)
        #end
        #(datascope)
		order by d.order_num
/* dept11 */
select concat(d.id, d.name) as name
		from sys_unit d
			left join sys_role_unit rd on d.id = rd.id
		where d.del_flag = '0' and rd.role_id = #(roleId)
		order by d.pid, d.order_num