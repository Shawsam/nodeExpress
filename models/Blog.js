//博客表
const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
	id:String,
	author:String,
    title:String,
    centerImg:String,
    createtime:String,
    abstract:String,
    content:String,
    tags:Array
})

const blogModel = mongoose.model('blog',blogSchema)
module.exports = blogModel