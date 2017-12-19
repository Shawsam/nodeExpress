var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Schema 表结构  图片分组
module.exports = new Schema({          
    tag_id:{ type: Number, default: 1 },               //分组id
    tag_name: { type: String, default: '默认分组' },   //分组名称
    count:{ type: Number, default: 0 },                //分类下图片数量
    is_del:{ type: Boolean, default:false },
    createtime:{ type: Date }
});


