function main(tbl){
	print(tbl)
	let u=dao.fetch(`select * from user where id=${tbl.id}`)
	return u;
}