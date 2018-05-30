//文章表
const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
	id:String,
	author:String,
	avatar:String,
	centerImg:String,
    title:String,
    createtime:String,
    abstract:String,
    content:String,
    tags:Array
})

const articleModel = mongoose.model('article',articleSchema)
module.exports = articleModel