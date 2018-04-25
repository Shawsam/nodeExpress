var express = require('express');
var Gallery = require('../models/Gallery.js');
var FilmBanner = require('../models/FilmBanner.js');
var formatTime = require('../utils/formatTime');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  var reg1 = /^\/api/,
      reg2 = /^\/admin/,
      url = req.originalUrl;
  if(url.match(reg1) || url.match(reg2)){
      next();
  }else{
      console.log('访问前台页面',url,',Time:',formatTime(Date.now()));
      next();
  }

});

// 定义网站主页的路由
router.get(/^\/(index)?$/, function(req, res) {
  res.render('web/index',{
  	 title:'首页',
  	 userInfo:req.userInfo
  });
});


router.get('/music', function(req, res) {
  res.render('web/music',{
     title:'音乐'
  })
});


router.get('/film', function(req, res) {
  FilmBanner.find({}).sort({createtime:1}).then(function(bannerList){
    console.log(bannerList);
    res.render('web/film',{
       title:'电影',
       bannerList:bannerList
    })
  })
});

router.get('/film_details', function(req, res) {
  res.render('web/film_details',{
     title:'电影'
  })
});


router.get('/article', function(req, res) {
  res.render('web/article',{
     title:'文集'
  })
});

router.get('/picture', function(req, res) {
  Gallery.find({}).then(function(galleryList){
    res.render('web/picture',{
       title:'画廊',
       galleryList:galleryList
    })
  })
});

router.get('/picture_details', function(req, res) {
    var gallery_id = req.query.gallery_id;
    Gallery.findOne({gallery_id:gallery_id}).then(function(gallery){
        res.render('web/picture_details',{
           title:'画廊详情',
           gallery:gallery
        })
    })
});

router.get('/blog', function(req, res) {
  res.render('web/blog',{
     title:'博客'
  })
});

router.get('/blog_details', function(req, res) {
  var id = req.query.id;
  res.render('web/blog_details',{
     title:'博客详情'
  })
});

router.get('/work', function(req, res) {
  res.render('web/work',{
     title:'作品'
  })
});

router.get('/login', function(req, res) {
  res.render('web/login',{
     title:'登录/注册',
     userInfo:req.userInfo
  });
});


module.exports = router;