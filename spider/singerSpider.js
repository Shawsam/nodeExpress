//音乐爬虫
const mongoose = require("mongoose")
const promise = require('bluebird');
const DB_URL = 'mongodb://127.0.0.1:28888/studio'
const fetchSinger = require('./fetchSinger')

//连接数据库
mongoose.Promise = promise
mongoose.connect(DB_URL,{useMongoClient:true})
mongoose.connection.on('connected', function () {
    console.log("开始爬取")
    fetchSinger()
});
