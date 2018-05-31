var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//定义Schema 表结构  图片分组
module.exports = new Schema({            
    film_id:{ type: String	 },                //id
    film_name:{ type: String  },               //名称
    film_type:{ type: Number  },               //类型 0-电影  1-电视剧 2-动漫  3-网络视频
    film_tags:{ type: Array  },                //标签
    centerImg:{ type: String  },               //主图
    posters:{ type: Array  },                  //海报
    photos:{ type: Array  },                   //剧照
    createtime:{ type: String }                //创建时间
});


