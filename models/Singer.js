//歌手表
const mongoose = require('mongoose');

const singerSchema = mongoose.Schema({
	id:String,
    name:String,
    centerImg:String,
    fans:String,
    href:String
})

const singerModel = mongoose.model('singer',singerSchema)
module.exports = singerModel