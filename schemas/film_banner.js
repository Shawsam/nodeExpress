var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Schema 表结构  图片分组
module.exports = new Schema({            
    banner_id:{ type: Number },                //轮播图id
    banner_img:{ type: String },               //轮播图
    banner_title:{ type: String },             //轮播图标题
    banner_desp:{ type: String },              //轮播图描述
    film_id:{ type: String	 },
    is_open:{ type: Boolean, default:true },
    is_del:{ type: Boolean, default:false },
    createtime:{ type: String }
});


