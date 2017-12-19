var express = require('express');
var User = require('../models/User.js')
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


router.get('/user/user', function(req, res) {
  User.find({}).then(function(userList){
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

router.get('/picture/picture_cate', function(req, res) {
  res.render('admin/picture/picture_cate',{
     title:'图片分类',
     userInfo:req.userInfo
  })
});

router.get('/picture/picture_list', function(req, res) {
  res.render('admin/picture/picture_list',{
     title:'图片列表',
     userInfo:req.userInfo
  })
});


module.exports = router;