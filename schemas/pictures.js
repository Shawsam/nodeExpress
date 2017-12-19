var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Schema 表结构
module.exports = new Schema({          
    tag_id:{ type: Number, default: 1 },   //分组id
    file_id:{ type: Number },
    file_name: { type: String },
    url: { type: String },
    attr_width: { type: Number },
    attr_heigth: { type: Number },
    is_del:{ type: Boolean, default:false },
    createtime:{ type: Date }
});


