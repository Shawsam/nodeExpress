var mongoose = require('mongoose');
var pictureCate = require('../schemas/picture_cates');

//模型类的创建
module.exports = mongoose.model('pictureCate',pictureCate)
