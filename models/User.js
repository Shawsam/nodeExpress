var mongoose = require('mongoose');
var user = require('../schemas/users');

//模型类的创建
module.exports = mongoose.model('User',user)
