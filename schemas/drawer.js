var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Schema 表结构  图片分组
module.exports = new Schema({            
    id:{ type: String },    
    city:{ type:String }, 
    ip:{ type:String },
    times:{ type: Number },
    gift:{ type: String },
    indexNum:{ type:Number }
});


