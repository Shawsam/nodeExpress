//虾米音乐 https://www.xiami.com/artist/index/c/1/type/0/class/0/page/1?spm=a1z1s.3057853.6863617.2.IXbZo8'
// 批量爬取
const superagent = require('superagent')
const async = require('async')
const logger = require('../logger')
const cheerio = require('cheerio')
const Singer = require('../models/Singer')
const request = require('request')


function fetchSinglePage(page,callback){
	fetchNum ++
	logger.info(`并发数:${fetchNum}, 爬取第${page+1}页数据--开始`)

    let url = `https://www.xiami.com/artist/index/c/1/type/0/class/0/page/${page+1}?spm=a1z1s.3057853.6863617.2.IXbZo8`
	superagent.get(url)
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
		    $("#artists .artist").each(function(index,item){
		    	const centerImg = $(this).find(".image img").attr("src")
		    	const href = $(this).find(".info p a").attr("href")
		    	const name = $(this).find(".info p a").text()
		    	const fans = $(this).find(".info p").eq(1).text()
		    	filterData.push({name,centerImg,fans,href})
		    })
		    callback(null,filterData)
		}
    })
}


let pageTotal = 5       //将要爬取的总页数
let fetchNum = 0        //当前并发数
const pageArray = Array.from(Array(pageTotal).keys()) 

const  fetchData = function(){
	logger.info('爬取列表数据--开始')
	async.mapLimit(pageArray,2,function(page,callback){
	      fetchSinglePage(page,callback)
	  },function(err,result){
	  	  logger.info('爬取列表数据--完毕')
	  	  logger.info(result)
	  	  result.map(function(singleItem){
	  	  	singleItem.map(function({name,centerImg,fans,href}){
                Singer.update(
                {name:name},
                {
                	id:Date.now(),
                	name,centerImg,fans,href
                },{upsert:true})
	            .then(function(data){
	                console.log('插入或更新一条数据完毕')
	            })
	  	  	})
	  	  })

	})
}

module.exports = fetchData