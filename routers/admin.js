var express = require('express');
var User = require('../models/User.js');
var Gallery = require('../models/Gallery.js');
var FilmBanner = require('../models/FilmBanner.js');
var formatTime = require('../utils/formatTime');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('访问后台页面',req.originalUrl,',Time:',formatTime(Date.now()));
  next();
});



//登录页面
router.get('/login', function(req, res) {
  res.render('admin/login',{
  	 title:'后台登录',
  	 userInfo:req.userInfo
  });
});

// 主页
router.get(/^\/(index)?$/, function(req, res) {
  res.render('admin/index',{
     title:'后台首页',
     userInfo:req.userInfo
  });
});

//用户============================================
router.get('/user/user_list', function(req, res) {
  // var username = new RegExp(req.query.username);        //模糊查询
  // var role = req.query.role || '';
  // var condition = { 'username':username };
  // if(role != ''){
  //   condition = { 'username':username,'adminCode':role}
  // }

  User.find({}).sort({registerdate:-1}).then(function(userList){
      res.render('admin/user/user_list',{
         title:'用户列表',
         userInfo:req.userInfo,
         userList:userList
      })
  })  
});


router.get('/user/user_add', function(req, res) {
  res.render('admin/user/user_add',{
     title:'用户添加',
     userInfo:req.userInfo
  })
});


//素材============================================
router.get('/picture/picture_cate', function(req, res) {
  res.render('admin/picture/picture_cate',{
     title:'图片素材',
     userInfo:req.userInfo
  })
});

router.get('/picture/picture_list', function(req, res) {
  res.render('admin/picture/picture_list',{
     title:'图片列表',
     userInfo:req.userInfo
  })
});

//电影============================================
router.get('/film/film_list', function(req, res) {
  Gallery.find({}).sort({createtime:-1}).then(function(galleryList){
        res.render('admin/film/film_list',{
           title:'电影列表',
           userInfo:req.userInfo,
           galleryList:galleryList
        })
  })  
});

router.get('/film/film_add', function(req, res) {
  res.render('admin/film/film_add',{
     title:'电影添加',
     userInfo:req.userInfo
  })
});

router.get('/film/film_banner', function(req, res) {
  FilmBanner.find({}).sort({createtime:1}).then(function(bannerList){
    res.render('admin/film/film_banner',{
       title:'轮播图',
       userInfo:req.userInfo,
       bannerList:bannerList
    })
  })
});

router.get('/film/film_banner_add', function(req, res) {
  res.render('admin/film/film_banner_add',{
     title:'轮播图添加',
     userInfo:req.userInfo
  })
});

//画廊============================================
router.get('/gallery/gallery_list', function(req, res) {
  Gallery.find({}).sort({createtime:-1}).then(function(galleryList){
        res.render('admin/gallery/gallery_list',{
           title:'画廊列表',
           userInfo:req.userInfo,
           galleryList:galleryList
        })
  })  
});

router.get('/gallery/gallery_add', function(req, res) {
  res.render('admin/gallery/gallery_add',{
     title:'画廊添加',
     userInfo:req.userInfo
  })
});


module.exports = router;