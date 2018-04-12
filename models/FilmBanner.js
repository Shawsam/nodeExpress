var mongoose = require('mongoose');
var filmBanner = require('../schemas/film_banner');

//模型类的创建
module.exports = mongoose.model('filmBanner',filmBanner)
