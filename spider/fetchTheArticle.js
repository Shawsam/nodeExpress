//指定页面爬取
const superagent = require('superagent')
const async = require('async')
const logger = require('../logger')
const cheerio = require('cheerio')
const Article = require('../models/Article')

function fetchTheArticle(url){
    console.log("开始爬取指定页面数据")
    return new Promise((resolve, reject)=>{
		superagent.get(url)
		.set('User-Agent','Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36')
		.end(function (err, res){
		   if (err) {
		   	    console.log(err)
		   	    resolve(false)
		        logger.info('爬取数据失败')
		   }else{
				$ = cheerio.load(res.text,{decodeEntities: false})
				const title = $(".article .title").text()
				const abstract = $(".show-content-free p:first-child").text()
				const author = $(".article .name").text()
				const createtime = $(".publish-time").text().replace(/\*/g,'').replace(/\./g,'-')
		        const content =  $(".article .show-content").html()
		        const avatar = $(".avatar img").attr("src")
		        const centerImg =  $(".article .image-package").eq(0).find("img").data("original-src")

		        console.log(title)
                if(title){ 
	                logger.info('爬取数据成功')
			        Article.update(
			            {title:title},
			            {id:Date.now(),title,abstract,author,centerImg,avatar,createtime,content},
			            {upsert:true}
			        ).then(function(data){
			        	resolve(true)
			            console.log('插入或更新一条数据完毕')
			        })
                }else{
                	resolve(false)
                }


		   }
		 })
	})
}

module.exports = fetchTheArticle







