// 酷狗音乐 前22
const superagent = require('superagent')
const async = require('async')
const logger = require('../logger')
const cheerio = require('cheerio')
const Song = require('../models/Song')
const request = require('request')

function fetchMusic(){
	const originUrl = 'http://www.kugou.com/yy/rank/home/1-8888.html?from=rank'
    superagent.get(originUrl)
    .set('User-Agent','Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36')
	.end(function (err, res) {
	   // 常规的错误处理
	   if (err) {
	   	    console.log(err)
	        logger.info(`爬取--失败`)
	   }else{
	        logger.info(`爬取--成功`)
	        $ = cheerio.load(res.text,{decodeEntities: false})
	        var filterData = []
	        $(".pc_temp_songlist ul li").each(function(index,item){
	        	const songname = $(this).find(".pc_temp_songname").text()
	        	const name = songname.split('-')[0]
	        	const title = songname.split('-')[1]
	        	Song.update({title},
	        		        {id:Date.now(),title,name},
	        		        {upsert:true}
	        		       ).then(function(){
	        		       	  console.log('插入或更新一条数据完毕')
	        		       })

	        })
	   }
	 })
}

module.exports = fetchMusic







