/* checkRoleNameUnique */
select distinct r.id, r.name, r.rkey, r.rsort, r.datascope,
            r.status, r.del, r.add_time, r.remark 
        from sys_role r
	        left join sys_user_role ur on ur.role_id = r.id
	        left join user u on u.id = ur.user_id
	        left join sys_unit d on u.unit_id = d.id
where r.name='#(name)'
/* checkRoleKeyUnique */
select distinct r.id, r.name, r.rkey, r.rsort, r.datascope,
            r.status, r.del, r.add_time, r.remark 
        from sys_role r
	        left join sys_user_role ur on ur.role_id = r.id
	        left join user u on u.id = ur.user_id
	        left join sys_unit d on u.unit_id = d.id
 where r.rkey='#(rkey)'