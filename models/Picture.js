var mongoose = require('mongoose');
var picture = require('../schemas/pictures');

//模型类的创建
module.exports = mongoose.model('Picture',picture)
