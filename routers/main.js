var express = require('express');
var formatTime = require('../utils/formatTime');
var router = express.Router();

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  console.log('访问前台页面',req.originalUrl,',Time:',formatTime(Date.now()));
  next();
});

// 定义网站主页的路由
router.get(/^\/(index)?$/, function(req, res) {
  res.render('web/index',{
  	 title:'首页',
  	 userInfo:req.userInfo
  });
});


router.get('/login', function(req, res) {
  res.render('web/login',{
  	 title:'登录/注册',
  	 userInfo:req.userInfo
  });
});

router.get('/picture', function(req, res) {
  res.render('web/picture',{
     title:'图片收藏'
  })
});



module.exports = router;