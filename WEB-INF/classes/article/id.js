function main(tbl){
	let article=dao.fetch("app_article",Cnd.where("id","=",tbl.id))
	if(article!=null&&!isEmpty(article.url)){
		return article.url;
	}
	return article;
}