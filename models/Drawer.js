var mongoose = require('mongoose');
var drawer = require('../schemas/drawer');

//模型类的创建
module.exports = mongoose.model('Drawer',drawer)
