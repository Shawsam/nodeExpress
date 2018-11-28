var express = require('express');
var fetch = require('node-fetch');
var qiniu = require('qiniu');
var formatTime = require('../utils/formatTime');
var User = require('../models/User.js');
var Picture = require('../models/Picture.js');
var PictureCate = require('../models/PictureCate.js');
var Gallery = require('../models/Gallery.js');
var FilmBanner = require('../models/FilmBanner.js');
var Blog = require('../models/Blog.js');
var Article = require('../models/Article.js');
var fetchTheArticle = require('../spider/fetchTheArticle')
var Drawer = require('../models/Drawer.js');


var resData;
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('访问接口',req.originalUrl,',Time:',formatTime(Date.now()));
  resData = { state:true,
  	          data:null,
  	          msg:''
  	        }
  next();
});

// ================================================================================================================================================================
// ================ 抽奖页面统计 ================
router.post('/draw/pageView', function(req, res) {
    console.log('/************************抽奖页面用户数据上报************************/');
    console.log('请求参数，'+ JSON.stringify(req.body));
    const { id,ip,city } = req.body
    Drawer.findOne({id:id}).then(function(drawer){
        if(drawer){
            Drawer.update({id:id},{times:drawer.times+1}).then(function(data){
                 resData.data = { gift:drawer.gift,indexNum:drawer.indexNum };
                 res.json(resData);
            })
        }else{
            var drawer = new Drawer({id,ip,city,times:1,gift:'',indexNum:-1,});
            drawer.save().then(function(data){
                 res.json(resData);
            })
          }
    })
})

// ================ 抽奖页面统计 ================
router.post('/draw/drawing', function(req, res) {
    console.log('/************************抽奖页面用户数据上报************************/');
    console.log('请求参数，'+ JSON.stringify(req.body));
    const { id,gift,indexNum } = req.body
    Drawer.findOne({id:id}).then(function(drawer){
        Drawer.update({id:id},{gift,indexNum}).then(function(data){
          resData.msg = '抽奖成功';
          res.json(resData);
        })
    })
})



// ================================================================================================================================================================
// ================ 七牛token ================
router.get('/qiniu', function(req, res) {
     console.log('/************************访问获取七牛token************************/');
     var accessKey = 'I_95zk-1V_DZQlWTskJOnXXn9tO9Bv2I4ZABqT_U';
     var secretKey = 'Ee0QA74SEvVrf1-zySNZnhVvzmu0IJZ1-QXxuwL9';
     var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
     var options = {
       scope: 'shawsam',
       returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","width":$(imageInfo.width),"height":$(imageInfo.height)}' 
     };
     var putPolicy = new qiniu.rs.PutPolicy(options);
     var uploadToken=putPolicy.uploadToken(mac);
     res.json({uptoken:uploadToken});
})


// ================================================================================================================================================================
// ================ 用户注册接口 ================
router.get('/register', function(req, res) {
  console.log('/************************访问用户注册接口************************/');
  console.log('请求参数，'+ JSON.stringify(req.query));
  var username = req.query.username;
  var password = req.query.password;
  var registerdate = formatTime(Date.now());
  //=======验证=======
  //查询数据库中是否存在对应账号
  User.findOne({
     username:username  
  }).then(function(userInfo){
     if(userInfo){
        resData.state = false;
        resData.msg = '用户名已注册';
        console.log('处理结果，'+resData.msg);
        res.json(resData);
        return;
     }
     var user = new User({     
        username:username,
        password:password,
        adminCode:0,
        age:'',
        registerdate:registerdate,
        logindate:''
     });
     return user.save();           //保存用户信息 数据库增加一条信息
  }).then(function(newUserInfo){
     if(newUserInfo){
        //console.log(newUserInfo);  //返回参数
        resData.msg = '注册成功';
        console.log('处理结果，'+resData.msg);
        res.json(resData);
     }
  })

});

// ================ 用户登录接口 ================
router.get('/login', function(req, res) {
  console.log('/************************访问用户登录接口************************/');
  console.log('请求参数, '+ JSON.stringify(req.query));
  var username = req.query.username;
  var password = req.query.password;
  var logindate = formatTime(Date.now());
  //=======验证=======
  //查询数据库中是否存在对应账号、密码的记录
  User.findOne({
  	 username:username,
  	 password:password 
  }).then(function(userInfo){
     if(!userInfo){
        resData.state = false;
        resData.msg = '用户名或密码错误';
        console.log('处理结果，'+resData.msg);
        res.json(resData);
        return;
     }

     User.update(
        {username:username},
        {logindate:logindate}
      ).then(function(){
         //存cookies
         req.cookies.set('userInfo',JSON.stringify(userInfo))
         //返回结果
         resData.msg = '登陆成功';
         console.log('处理结果，'+resData.msg);
         res.json(resData);
      })

  })
});

// ================ 用户退出登录 ================
router.get('/logout', function(req, res) {
     console.log('/************************访问退出登录接口************************/');
     req.cookies.set('userInfo',null)
     //返回结果
     resData.msg = '退出登录';
     console.log('处理结果，'+resData.msg);
     res.json(resData);
})

// ================================================================================================================================================================
// ================ 用户登录接口 ================
router.get('/admin/login', function(req, res) {
  console.log('/************************访问用户登录接口************************/');
  console.log('请求参数, '+ JSON.stringify(req.query));
  var username = req.query.username;
  var password = req.query.password;
  var logindate = formatTime(Date.now());
  //=======验证=======
  //查询数据库中是否存在对应账号、密码的记录
  User.findOne({
     username:username,
     password:password 
  }).then(function(userInfo){
     if(!userInfo){
        resData.state = false;
        resData.msg = '用户名或密码错误';
        console.log('处理结果，'+resData.msg);
        res.json(resData);
        return;
     }

     User.update(
        {username:username},
        {logindate:logindate}
      ).then(function(){
         //存cookies
         req.cookies.set('userInfo',JSON.stringify(userInfo))
         //返回结果
         resData.msg = '登陆成功';
         console.log('处理结果，'+resData.msg);
         res.json(resData);
      })

  })
});

// ================ 用户退出登录 ================
router.get('/admin/logout', function(req, res) {
     console.log('/************************访问退出登录接口************************/');
     req.cookies.set('userInfo',null)
     //返回结果
     resData.msg = '退出登录';
     console.log('处理结果，'+resData.msg);
     res.json(resData);
})


// ================ 用户列表 ================
router.get('/admin/user/user_list', function(req, res) {
    console.log('/************************访问用户列表************************/');
    var username = new RegExp(req.query.username);        //模糊查询
    var role = req.query.role;
    var age_sort = req.query.age_sort;
    var register_sort = req.query.register_sort;
    var login_sort = req.query.login_sort;
    
    var sort = {'registerdate':-1};
    switch(true){
      case age_sort != '':  sort = {'age':age_sort}; break;
      case register_sort != '':  sort = {'registerdate':register_sort}; break;
      case login_sort != '':  sort = {'logindate':login_sort}; break;
    }
    console.log(sort); 

    var condition = { 'username':username };
    if(role != ''){
      condition = { 'username':username,'adminCode':role}
    }

    User.find(condition).sort(sort).then(function(userList){
          resData.msg = '查询成功';
          resData.data = userList;
          console.log('处理结果，'+resData.msg);
          res.json(resData);
    })
})

// ================ 用户添加 ================
router.post('/admin/user/userAdd', function(req, res) {
     console.log('/************************访问用户添加接口************************/');
     var username = req.body.username;
     var password = req.body.password;
     var adminCode = req.body.adminCode;
     var age = req.body.age;
     var registerdate = formatTime(Date.now());


     User.findOne({
         username:username  
      }).then(function(userInfo){
         if(userInfo){
            resData.state = false;
            resData.msg = '用户名已注册';
            console.log('处理结果，'+resData.msg);
            res.json(resData);
            return;
         }
         var user = new User({     
            username:username,
            password:password,
            adminCode:adminCode,
            age:age,
            registerdate:registerdate,
            logindate:''
         });
         return user.save();           //保存用户信息 数据库增加一条信息
      }).then(function(newUserInfo){
         if(newUserInfo){
            //console.log(newUserInfo);  //返回参数
            resData.msg = '添加成功';
            console.log('处理结果，'+resData.msg);
            res.json(resData);
         }
      })
})

// ================ 图片分类列表  ================
router.get('/admin/album/categoryList', function(req, res) {
     console.log('/************************访问图片分类接口************************/');
     //====测试用====
     // fetch("http://localhost:8081/public/admin/json/album_cate_list.json")
     // .then(res=>res.json())
     // .then(function(resdata){
     //     resData.msg = '成功';
     //     resData.data =  resdata.data;
     //     console.log('处理结果，'+resData.msg);
     //     res.json(resData);
     // })

     //返回结果
     var createtime = formatTime(new Date());
     PictureCate.find({is_del:false}).then(function(cate){
        if(cate.length){
           resData.msg = '成功';
           resData.data =  cate;
           console.log('处理结果，'+resData.msg);
           res.json(resData);
        }else{
           var pictureCate = new PictureCate({
              createtime:createtime
           })
           pictureCate.save().then(function(){
               PictureCate.find({is_del:false}).then(function(cate){
                   resData.msg = '成功';
                   resData.data =  cate;
                   console.log('处理结果，'+resData.msg);
                   res.json(resData);
               })
           });
        }
     })
})

// ================ 添加图片分类 ================
router.get('/admin/album/categoryList/add', function(req, res) {
     console.log('/************************访问添加图片分类接口************************/');
     // fetch("http://localhost:8081/public/admin/json/album_cate_list.json")
     // .then(res=>res.json())
     // .then(function(resdata){
     //     resData.msg = '成功';
     //     resData.data =  resdata.data;
     //     console.log('处理结果，'+resData.msg);
     //     res.json(resData);
     // })
     //返回结果
     var tag_name = req.query.tag_name;
     PictureCate.findOne({tag_name:tag_name})
     .then(function(cate){
        if(cate){
           resData.state = false;
           resData.msg = '创建失败，分组已存在';
           console.log('处理结果，'+resData.msg);
           res.json(resData);
        }else{
          PictureCate.count({}).then(function(num){
               var tag_id = num + 1;
               var pictureCate = new PictureCate({
                   tag_id:tag_id,
                   tag_name:tag_name,
                   createtime:formatTime(new Date())
               });

               pictureCate.save().then(function(data){
                 resData.data = data;
                 resData.msg = '创建成功';
                 console.log('处理结果，'+resData.msg);
                 res.json(resData);
               })
          })
        }
     })
})

// ================ 更改分类名称 ================
router.get('/admin/album/categoryList/changeName', function(req, res) {
     console.log('/************************访问图片分类名称更改接口************************/');
     // fetch("http://localhost:8081/public/admin/json/proc.json")
     // .then(res=>res.json())
     // .then(function(resdata){
     //     resData.msg = '成功';
     //     resData.data =  resdata.data;
     //     console.log('处理结果，'+resData.msg);
     //     res.json(resData);
     // })
     //返回结果
     tag_id = req.query.tag_id;
     tag_name = req.query.tag_name;
     PictureCate.findOne({tag_name:tag_name})
     .then(function(data){
        if(data){
           resData.state = false;
           resData.msg = '修改失败，分组已存在';
           console.log('处理结果，'+resData.msg);
           res.json(resData);
        }else{
           PictureCate.update({tag_id:tag_id},{tag_name:tag_name})
           .then(function(){
               resData.msg = '修改成功';
               console.log('处理结果，'+resData.msg);
               res.json(resData);
           })

        }
     })
})

// ================ 删除分类  ================
router.get('/admin/album/categoryList/del_tag', function(req, res) {
    console.log('/************************访问删除图片分类接口************************/');
    tag_id = req.query.tag_id;
    type = req.query.type;
    if(type == 1){     //删除全部
       Picture.update({tag_id:tag_id},{is_del:true})
      .then(function(){
           PictureCate.update({tag_id:tag_id},{is_del:true})
          .then(function(){
               resData.msg = '删除成功';
               console.log('处理结果，'+resData.msg);
               res.json(resData);
          })
       })
    }else{
       Picture.updateMany({tag_id:tag_id},{tag_id:1})
       .then(function(data){
             var delNum = data.n;
             PictureCate.update({tag_id:1},{"$inc":{"count":-delNum}})
             .then(function(data){
                 PictureCate.update({tag_id:tag_id},{is_del:true})
                 .then(function(){
                     resData.msg = '删除成功';
                     console.log('处理结果，'+resData.msg);
                     res.json(resData);
                 })
             })
       })
    }
})


// ================ 图片列表 ================
router.get('/admin/album/list', function(req, res) {
     console.log('/************************访问图片列表接口************************/');
     // rand = Math.floor(Math.random()*4);    // 调试用
     // fetch("http://localhost:8081/public/admin/json/album_img"+rand+".json")
     // .then(res=>res.json())
     // .then(function(resdata){
     //     resData.msg = '成功';
     //     resData.data =  resdata.data;
     //     console.log('处理结果，'+resData.msg);
     //     res.json(resData);
     // })

     //返回结果
     var pageSize = Number(req.query.pagesize) || 20;         //一页多少条
     var currentPage = Number(req.query.pageNumber) || 1;     //当前第几页
     var sort = {'createtime':-1};                    //排序
     var condition = {tag_id:req.query.tag_id || 1, is_del:false};  //条件
     var skipNum = (currentPage - 1) * pageSize;      //跳过页数

     Picture.find(condition).skip(skipNum).limit(pageSize).sort(sort)
     .then(function(resdata){
         if(resdata.length){
            resData.msg = '成功';
            resData.data =  resdata;
            console.log('处理结果，'+resData.msg);
            res.json(resData);
         }else{
            resData.state = false;
            resData.msg = '没有数据';
            resData.data =  resdata;
            console.log('处理结果，'+resData.msg);
            res.json(resData);
         }
     })
})

// ================ 删除图片 ================
router.get('/admin/album/list/imgDel', function(req, res) {
    console.log('/************************访问图片删除接口************************/');
    var file_id = req.query.file_id.split(',');

    Picture.findOne({file_id:file_id[0]}).then(function(data){
         PictureCate.update({tag_id:data.tag_id},{"$inc":{"count":-file_id.length}})
         .then(function(){
             Picture.updateMany({file_id:{$in:file_id}},{is_del:true})
            .then(function(){
                   resData.msg = '删除成功';
                   console.log('处理结果，'+resData.msg);
                   res.json(resData);
            })
        })
    })

})

// ================ 图片修改分组 ================
router.get('/admin/album/list/imgMove', function(req, res) {
     console.log('/************************访问图片修改分组接口************************/');
     var file_id = req.query.file_id.split(',');
     var tag_id = req.query.tag_id;
 

     Picture.findOne({file_id:file_id[0]}).then(function(data){
         PictureCate.update({tag_id:data.tag_id},{"$inc":{"count":-file_id.length}})
         .then(function(){
             Picture.updateMany({file_id:{$in:file_id}},{tag_id:tag_id}).then(function(){
                PictureCate.update({tag_id:tag_id},{"$inc":{"count":file_id.length}}) 
                .then(function(){
                       resData.msg = '修改成功';
                       console.log('处理结果，'+resData.msg);
                       res.json(resData);
                })
             })
         })
     })
})


// ================ 图片上传 ================
router.post('/admin/album/imgUpload', function(req, res) {
     console.log('/************************访问图片上传接口************************/');
     //返回结果
     var tag_id = req.body.tag_id;
     var filename = req.body.filename;
     var url = "http://p0mewrlgg.bkt.clouddn.com/"+filename;
     var width = req.body.width;
     var height = req.body.height;
     var createtime = formatTime(Date.now());
     
     Picture.count({}).then(function(num){
       var file_id = num +1;
       var picture = new Picture({     
          tag_id:tag_id,                         //分组id
          file_id:file_id,
          file_name:filename,                    //文件名
          url:url,
          attr_width:width,             
          attr_heigth:height,
          createtime:createtime
       });

       picture.save().then(function(resdata){    //保存图片数据
           Picture.count({tag_id:tag_id,is_del:false})
           .then(function(num){
             PictureCate.update({tag_id:tag_id},{count:num})
             .then(function(data){
                 resData.msg = '成功';
                 resData.data =  resdata;
                 console.log('处理结果，'+resData.msg);
                 res.json(resData);
             })
           })
       });    
     })


})


//================ 画廊 ======================
router.post('/admin/gallery/galleryList/add', function(req, res) {
     console.log('/************************访问添加画廊接口************************/');
     var gallery_name = req.body.galleryName,
         gallery_desp = req.body.galleryDesp,
         gallery_type = req.body.galleryType,
         gallery_imgs = req.body.galleryImgs.split(',');

     Gallery.findOne({gallery_name:gallery_name})
     .then(function(gallery){
        if(gallery){
           resData.state = false;
           resData.msg = '创建失败，画廊已存在';
           console.log('处理结果，'+resData.msg);
           res.json(resData);
        }else{
          Gallery.count({}).then(function(num){
               var gallery_id = num + 1;
               var gallery = new Gallery({
                   gallery_id:gallery_id,
                   gallery_name:gallery_name,
                   gallery_desp:gallery_desp,
                   gallery_type:gallery_type,
                   gallery_imgs:gallery_imgs,
                   createtime:formatTime(new Date())
               });

               gallery.save().then(function(data){
                 resData.data = data;
                 resData.msg = '创建成功';
                 console.log('处理结果，'+resData.msg);
                 res.json(resData);
               })
          })
        }
     })
})


//================ 电影轮播 ======================
router.post('/admin/film/film_banner/add', function(req, res) {
     console.log('/************************访问添加画廊接口************************/');
     var banner_id = req.body.bannerId,
         banner_img = req.body.bannerImg,
         banner_title = req.body.bannerTitle,
         banner_desp = req.body.bannerDesp,
         film_id = req.body.filmId,
         is_open = req.body.isOpen;

     FilmBanner.findOne({banner_title:banner_title})
     .then(function(filmbanner){
        if(filmbanner){
           resData.state = false;
           resData.msg = '创建失败，轮播图已存在';
           console.log('处理结果，'+resData.msg);
           res.json(resData);
        }else{
          FilmBanner.count({}).then(function(num){
               var banner_id = num + 1;
               var film_banner = new FilmBanner({
                   banner_id:banner_id,
                   banner_img:banner_img,
                   banner_title:banner_title,
                   banner_desp:banner_desp,
                   film_id:film_id,
                   is_open:is_open,
                   createtime:formatTime(new Date())
               });

               film_banner.save().then(function(data){
                 resData.data = data;
                 resData.msg = '创建成功';
                 console.log('处理结果，'+resData.msg);
                 res.json(resData);
               })
          })
        }
     })
})


//###############################################################################################
//========================================== 博客 ===============================================

//================ 博客添加 ======================
router.post('/admin/blog/add', function(req, res) {
     console.log('/************************访问添加博客接口************************/');
     const { title,author,content,abstract,centerImg,tags,time } = req.body

     Blog.findOne({title:title})
     .then(function(blog){
        if(blog){
           resData.state = false;
           resData.msg = '创建失败，博客已存在';
           console.log('处理结果，'+resData.msg);
           res.json(resData);
        }else{
           var blog = new Blog({
               id:Date.now(),
               title:title,
               author:author,
               content:content,
               abstract:abstract,
               centerImg:centerImg,
               tags:tags.split(','),
               createtime:time
           });

           blog.save().then(function(data){
             resData.data = data;
             resData.msg = '创建成功';
             console.log('处理结果，'+resData.msg);
             res.json(resData);
           })
        }
     })
})

//================ 博客删除 ======================
router.get('/admin/blog/remove', function(req, res) {
    console.log('/************************访问删除博客分类接口************************/');
    const id = req.query.id;
    Blog.remove({id:id}).then(function(){
       resData.data = '';
       resData.msg = '删除成功';
       console.log('处理结果，'+resData.msg);
       res.json(resData);
   })
})

//================ 博客编辑 ======================
router.post('/admin/blog/edit', function(req, res) {
     console.log('/************************访问编辑博客接口************************/');
     const { id,title,author,content,abstract,centerImg,tags,time } = req.body

     Blog.update({id:id},{id,title,author,content,abstract,centerImg,tags:tags.split(','),time})
     .then(function(data){
             resData.data = '';
             resData.msg = '编辑成功';
             console.log('处理结果，'+resData.msg);
             res.json(resData);
     })
})

//================ 博客列表 ======================
router.get('/admin/blog/blogList', function(req, res) {
   console.log('/************************访问博客列表************************/');
   console.log('请求参数，'+ JSON.stringify(req.query));
   let {pageNo, pageSize} = req.query
   pageNo = pageNo || 1;                       //当前第几页
   pageSize = pageSize || 10;                   //一页多少条
   const sort = {'createtime':-1};             //排序
   const skipNum = (pageNo - 1) * pageSize;    //跳过页数

   Blog.find({}).skip(skipNum).limit(pageSize).sort(sort).then(function(data){
       resData.data = data;
       resData.msg = '成功';
       console.log('处理结果，'+resData.msg);
       res.json(resData);
   })
})



//###############################################################################################
//========================================== 文集 ===============================================
//================ 文集添加 ======================
router.post('/admin/article/add', function(req, res) {
     console.log('/************************访问添加文集接口************************/');
     const { title,author,content,abstract,centerImg,tags,time } = req.body
     console.log(centerImg)
     
     Article.findOne({title:title})
     .then(function(article){
        if(article){
           resData.state = false;
           resData.msg = '创建失败，博客已存在';
           console.log('处理结果，'+resData.msg);
           res.json(resData);
        }else{
           var article = new Article({
               id:Date.now(),
               title:title,
               author:author,
               content:content,
               abstract:abstract,
               centerImg:centerImg,
               tags:tags.split(','),
               createtime:time
           });

           article.save().then(function(data){
             resData.data = data;
             resData.msg = '创建成功';
             console.log('处理结果，'+resData.msg);
             res.json(resData);
           })
        }
     })
})

//================ 文集抓取 ======================
router.get('/admin/article/crawl', function(req, res) {
     console.log('/************************访问添加文集抓取************************/');
     const url = req.query.url;
     console.log(req.query)
     fetchTheArticle(url).then(function(state){
       if(state){
           resData.data = '';
           resData.msg = '抓取成功';
           console.log('处理结果，'+resData.msg);
           res.json(resData);
       }else{
           resData.state = false 
           resData.data = '';
           resData.msg = '抓取失败，url错误';
           console.log('处理结果，'+resData.msg);
           res.json(resData);
       }

     })

})

//================ 文集删除 ======================
router.get('/admin/article/remove', function(req, res) {
    console.log('/************************访问删除文集分类接口************************/');
    const id = req.query.id;
    Article.remove({id:id}).then(function(){
       resData.data = '';
       resData.msg = '删除成功';
       console.log('处理结果，'+resData.msg);
       res.json(resData);
   })
})


//================ 文集编辑 ======================
router.post('/admin/article/edit', function(req, res) {
     console.log('/************************访问编辑文集接口************************/');
     const { id,title,author,content,abstract,centerImg,tags,time } = req.body

     Article.update({id:id},{id,title,author,content,abstract,centerImg,tags:tags.split(','),time})
     .then(function(data){
             resData.data = '';
             resData.msg = '编辑成功';
             console.log('处理结果，'+resData.msg);
             res.json(resData);
     })
})

//================ 文集列表 ======================
router.get('/admin/article/articleList', function(req, res) {
   console.log('/************************访问文集列表************************/');
   console.log('请求参数，'+ JSON.stringify(req.query));
   let {pageNo, pageSize} = req.query
   pageNo = pageNo || 1;                       //当前第几页
   pageSize = pageSize || 10;                   //一页多少条
   const sort = {'createtime':-1};             //排序
   const skipNum = (pageNo - 1) * pageSize;    //跳过页数

   Article.find({}).skip(skipNum).limit(pageSize).sort(sort).then(function(data){
       resData.data = data;
       resData.msg = '成功';
       console.log('处理结果，'+resData.msg);
       res.json(resData);
   })
})




module.exports = router;