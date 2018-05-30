// 批量爬取
const superagent = require('superagent')
const async = require('async')
const logger = require('../logger')
const cheerio = require('cheerio')
const Article = require('../models/Article')
const request = require('request')


function fetchSinglePage(page,callback){
	fetchNum ++
	logger.info(`并发数:${fetchNum}, 爬取第${page+1}页数据--开始`)
	originUrl = originUrl+`?order_by=top&page=${page+1}`
    superagent.get(originUrl)
    .set('User-Agent','Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36')
	.end(function (err, res) {
		 fetchNum --
	   // 常规的错误处理
	   if (err) {
	   	    console.log(err)
	        logger.info(`并发数:${fetchNum}, 爬取第${page+1}页数据--失败`)
	   }else{
	        logger.info(`并发数:${fetchNum}, 爬取第${page+1}页数据--成功`)
	        $ = cheerio.load(res.text,{decodeEntities: false})
	        var filterData = []

	        const Length = $(".note-list li").length
	        $(".note-list li").each(function(index,item){
        		const title = $(item).find('.title').text()
		        const abstract = $(item).find('.abstract').text()
		        const author = $(item).find('.nickname').text()
		        const centerImg = $(item).find('.wrap-img img').data('echo')
	        	const url = 'https://www.jianshu.com'+$(item).find('.title').attr('href')
                fetchDetails(url).then(({avatar,createtime,content})=>{ 
		        	filterData.push({title,abstract,author,centerImg,avatar,createtime,content})
			        if(index == Length-1){
	                	callback(null,filterData)
	                }
                })
	        })
	   }
	 })
}

function fetchDetails(url){
	logger.info(`爬取详情数据${url}--开始`)
	return new Promise((resolve, reject)=>{
	     request(url,function(err,res){
		     if(err){
	             reject(err)
	             logger.info(`爬取详情数据${url}--失败`)
			 }else{
			 	 $ = cheerio.load(res.body,{decodeEntities: false})
			 	 const avatar = $(".avatar img").attr("src")
			 	 const createtime = $(".publish-time").text().replace(/\*/g,'').replace(/\./g,'-')
			 	 const content = $(".show-content").html()
			 	 resolve({avatar,createtime,content})
			 	 logger.info(`爬取详情数据${url}--成功`)
			 }
		 })
	})

}



// ****** 定义全局变量，配置常量 ********
let originUrl = 'https://www.jianshu.com/c/fcd7a62be697'
let pageTotal = 9       //将要爬取的总页数
let fetchNum = 0        //当前并发数

const  fetchData = function(){
    const pageArray = Array.from(Array(pageTotal).keys()) 
	logger.info('爬取列表数据--开始')
	async.mapLimit(pageArray,3,function(page,callback){
	      fetchSinglePage(page,callback)
	  },function(err,result){
	  	  logger.info('爬取列表数据--完毕')
	  	  result.map(function(singleItem){
	  	  	singleItem.map(function({title,abstract,author,centerImg,avatar,createtime,content}){
                Article.update(
                {title:title},
                {
                	id:Date.now(),
                	title,abstract,author,centerImg,avatar,createtime,content
                },{upsert:true})
	            .then(function(data){
	                console.log('插入或更新一条数据完毕')
	            })
	  	  	})
	  	  })

	})
}

module.exports = fetchData





