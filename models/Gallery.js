var mongoose = require('mongoose');
var gallery = require('../schemas/gallery');

//模型类的创建
module.exports = mongoose.model('Gallery',gallery)
