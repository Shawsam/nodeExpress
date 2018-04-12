var mongoose = require('mongoose');
var Film = require('../schemas/film');

//模型类的创建
module.exports = mongoose.model('Film',Film)
