var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Schema 表结构
module.exports = new Schema({          
    username : { type: String },                    //用户账号
    password: {type: String},                       //密码
    adminCode: {type: String},                      //0 普通用户 1管理员
    age: {type: Number},                            //年龄
    registerdate : { type: String},                 //注册时间
    logindate : { type: String}                     //最近登录时间
});


