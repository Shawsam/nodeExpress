var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Schema 表结构  图片分组
module.exports = new Schema({          
    gallery_id:{ type: Number, default: 1 },               //画廊id
    gallery_type:{ type: Number },                         //画廊类型
    gallery_name:{ type: String },                         //画廊名称
    gallery_desp:{ type: String },                         //画廊描述
    gallery_imgs:{ type: Array },                          //图片数组
    is_del:{ type: Boolean, default:false },
    createtime:{ type: String }
});


