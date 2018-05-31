//歌曲表
const mongoose = require('mongoose');

const songSchema = mongoose.Schema({
	id:String,
    title:String,
    name:String
})

const songModel = mongoose.model('song',songSchema)
module.exports = songModel