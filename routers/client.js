var express = require('express');
var Gallery = require('../models/Gallery.js');
var FilmBanner = require('../models/FilmBanner.js');
var formatTime = require('../utils/formatTime');
var Blog = require('../models/Blog.js');
var Article = require('../models/Article.js');
var Song = require('../models/Song.js');
var Singer = require('../models/Singer.js');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  var reg1 = /^\/api/,
      reg2 = /^\/admin/,
      url = req.originalUrl;
  if(url.match(reg1) || url.match(reg2)){
      next();
  }else{
      res.set('Content-Type', 'text/html');
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

//ck抽奖
router.get('/draw', function(req, res) {
   const id = req.query.id
   res.render('web/ck_draw',{id:id})
});

//ck抽奖
router.get('/drawData', function(req, res) {
   res.render('web/ck_draw_data')
});


router.get('/music', function(req, res) {
  Song.find({}).then(function(song){
    Singer.find({}).skip(3).limit(45).then(function(singer){
      res.render('web/music',{
         title:'音乐',
         song:song,
         singer:singer
      })
    })
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
  const pageNo =  1;                          //当前第几页
  const pageSize = 10;                        //一页多少条
  const sort = {'createtime':-1};             //排序
  const skipNum = (pageNo - 1) * pageSize;    //跳过页数
  Article.find({}).then(function(articleList){
    Article.find({}).skip(0).limit(pageSize).sort(sort).then(function(data){
          res.render('web/article',{
             title:'文集',
             articleList:data,
             pageSize:pageSize,
             totalPage:Math.ceil(articleList.length/pageSize)
          })
    })  
  })
});


router.get('/article_details', function(req, res) {
  var id = req.query.id;
  Article.findOne({id:id}).then(function(article){
      res.render('web/article_details',{
         title:'文章详情',
         article:article
      })
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
  const pageNo =  1;                                //当前第几页
  const pageSize = 10;                               //一页多少条
  const sort = {'createtime':-1};             //排序
  const skipNum = (pageNo - 1) * pageSize;    //跳过页数
  Blog.find({}).then(function(blogList){
    Blog.find({}).skip(0).limit(pageSize).sort(sort).then(function(data){
          res.render('web/blog',{
             title:'博客',
             blogList:data,
             pageSize:pageSize,
             totalPage:Math.ceil(blogList.length/pageSize)
          })
    })  
  })
});


router.get('/blog_details', function(req, res) {
  var id = req.query.id;
  Blog.findOne({id:id}).then(function(blog){
      res.render('web/blog_details',{
         title:'博客详情',
         blog:blog
      })
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