/* list */
select u.*, d.name from `user` u
		left join sys_unit d on u.unit_id = d.id
		where 1=1 #(datascope)