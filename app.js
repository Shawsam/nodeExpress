<<<<<<< HEAD
﻿//加载express模块
var express = require('express');
//加载模板引擎
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载post请求解析模块
var bodyParser = require('body-parser');
//加载promise模块
var promise = require('bluebird');
//加载cookies模块
var Cookies = require('cookies');

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./secret/58adg.com.key', 'utf8');
var certificate = fs.readFileSync('./secret/58adg.com.pem', 'utf8');
var credentials = {key: privateKey,
                   cert: certificate};


console.log(credentials)

//===================================================================================//
var DB_URL = 'mongodb://127.0.0.1:28888/studio';

//调用express方法
var app = express();

//======== bodyParser配置 用于解析post请求=========================//
//配置解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//配置解析 application/json
app.use(bodyParser.json())

//======== 模板引擎  ===========================//
app.engine('html',swig.renderFile);     //app.engine()方法即可创建一个你自己的模板引擎 ext文件扩展名, callback是模板引擎的主函数
app.set('views', './views');            // 指定视图所在的位置
app.set('view engine','html');          // 注册模板引擎
app.set('view cache', false);

//设置swig页面不缓存
swig.setDefaults({cache: false})


app.set('trust proxy', 'loopback') // 指定唯一子网

//静态文件托管
app.use(express.static('public'));
app.use('/public',express.static('public'));

//======== cookies配置 =========================//
var User = require('./models/User.js');
app.use(function(req, res, next) {
  req.cookies = new Cookies(req, res);
  req.userInfo = null;

  var path = req.path;
  var adminRegEx = /^\/admin/;
  var adminPage = adminRegEx.test(path);
  
  if(adminPage && path!="/admin/login"){
    if(!req.cookies.get("userInfo")){                             //没有cookie访问管理员页面
       return res.redirect("/admin/login");
    }else{
       req.userInfo = JSON.parse(req.cookies.get("userInfo"));
       User.findById(req.userInfo._id)
       .then(function(userInfo){
          req.userInfo.adminCode = userInfo.adminCode;
          if(req.userInfo.adminCode == 0){
              return res.redirect("/admin/login");                //不是管理员访问管理员页面
          }else{
              next();                                             //管理员访问管理员页面
          }
       })
    }
  }else{   
    if(!req.cookies.get("userInfo")){                             //没有cookie
        next();
    }else{
        req.userInfo = JSON.parse(req.cookies.get("userInfo"));
        next();
    }

  }

})


//======== 数据库连接 =========================//
mongoose.Promise = promise;
mongoose.connect(DB_URL,{useMongoClient:true});

/*** 连接成功*/
mongoose.connection.on('connected', function () {    
    console.log('数据库连接成功，' + DB_URL);  

	//启动服务，监听连接请求

	// var server = app.listen(8080, '0.0.0.0', function () {
	//   var host = server.address().address;
	//   var port = server.address().port;
	//   console.log('服务器启动成功，监听访问 http://%s:%s', host, port);
	// });


  var httpServer = http.createServer(app);
  var httpsServer = https.createServer(credentials, app);
  var PORT = 80;
  var SSLPORT = 443;


  httpServer.listen(PORT, function() {
      console.log('服务器启动成功: http://localhost:%s', PORT);
  });
  httpsServer.listen(SSLPORT, function() {
      console.log('服务器启动成功: https://localhost:%s', SSLPORT);
  });



});    

/*** 连接异常*/
mongoose.connection.on('error',function (err) {    
    console.log('数据库连接失败，' + err);  
});    
 
/*** 连接断开*/
mongoose.connection.on('disconnected', function () {    
    console.log('数据库连接断开');  
})

//======== 解析路由 分功能模块开发 =========================//
var client = require('./routers/client');
var admin = require('./routers/admin');
var api = require('./routers/api');

app.use('/',client);
app.use('/admin',admin);
app.use('/api',api);


app.use(function(req, res, next){
    res.status(404).sendFile(__dirname+'/public/state/404.html');
})

app.use(function(req, res, next){
    res.status(500).sendFile(__dirname+'/public/state/500.html');
})




=======
//加载express模块
var express = require('express');
//加载模板引擎
var swig = require('swig');
//加载数据库模块
var mongoose = require('mongoose');
//加载post请求解析模块
var bodyParser = require('body-parser');
//加载promise模块
var promise = require('bluebird');
//加载cookies模块
var Cookies = require('cookies');

var fs = require('fs');
var http = require('http');
var https = require('https');
var privateKey  = fs.readFileSync('./secret/58adg.com.key', 'utf8');
var certificate = fs.readFileSync('./secret/58adg.com.pem', 'utf8');
var credentials = {key: privateKey,
                   cert: certificate};


console.log(credentials)

//===================================================================================//
var DB_URL = 'mongodb://127.0.0.1:28888/studio';

//调用express方法
var app = express();

//======== bodyParser配置 用于解析post请求=========================//
//配置解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//配置解析 application/json
app.use(bodyParser.json())

//======== 模板引擎  ===========================//
app.engine('html',swig.renderFile);     //app.engine()方法即可创建一个你自己的模板引擎 ext文件扩展名, callback是模板引擎的主函数
app.set('views', './views');            // 指定视图所在的位置
app.set('view engine','html');          // 注册模板引擎
app.set('view cache', false);

//设置swig页面不缓存
swig.setDefaults({cache: false})


app.set('trust proxy', 'loopback') // 指定唯一子网

//静态文件托管
app.use(express.static('public'));
app.use('/public',express.static('public'));

//======== cookies配置 =========================//
var User = require('./models/User.js');
app.use(function(req, res, next) {
  req.cookies = new Cookies(req, res);
  req.userInfo = null;

  var path = req.path;
  var adminRegEx = /^\/admin/;
  var adminPage = adminRegEx.test(path);
  
  if(adminPage && path!="/admin/login"){
    if(!req.cookies.get("userInfo")){                             //没有cookie访问管理员页面
       return res.redirect("/admin/login");
    }else{
       req.userInfo = JSON.parse(req.cookies.get("userInfo"));
       User.findById(req.userInfo._id)
       .then(function(userInfo){
          req.userInfo.adminCode = userInfo.adminCode;
          if(req.userInfo.adminCode == 0){
              return res.redirect("/admin/login");                //不是管理员访问管理员页面
          }else{
              next();                                             //管理员访问管理员页面
          }
       })
    }
  }else{   
    if(!req.cookies.get("userInfo")){                             //没有cookie
        next();
    }else{
        req.userInfo = JSON.parse(req.cookies.get("userInfo"));
        next();
    }

  }

})


//======== 数据库连接 =========================//
mongoose.Promise = promise;
mongoose.connect(DB_URL,{useMongoClient:true});

/*** 连接成功*/
mongoose.connection.on('connected', function () {    
    console.log('数据库连接成功，' + DB_URL);  

	//启动服务，监听连接请求

	// var server = app.listen(8080, '0.0.0.0', function () {
	//   var host = server.address().address;
	//   var port = server.address().port;
	//   console.log('服务器启动成功，监听访问 http://%s:%s', host, port);
	// });


  var httpServer = http.createServer(app);
  var httpsServer = https.createServer(credentials, app);
  var PORT = 8080;
  var SSLPORT = 443;


  httpServer.listen(PORT, function() {
      console.log('服务器启动成功: http://localhost:%s', PORT);
  });
  httpsServer.listen(SSLPORT, function() {
      console.log('服务器启动成功: https://localhost:%s', SSLPORT);
  });



});    

/*** 连接异常*/
mongoose.connection.on('error',function (err) {    
    console.log('数据库连接失败，' + err);  
});    
 
/*** 连接断开*/
mongoose.connection.on('disconnected', function () {    
    console.log('数据库连接断开');  
})

//======== 解析路由 分功能模块开发 =========================//
var client = require('./routers/client');
var admin = require('./routers/admin');
var api = require('./routers/api');

app.use('/',client);
app.use('/admin',admin);
app.use('/api',api);

//=============小程序接口==================//
var adg = require('./routers/adg')
app.use('/adg',adg);


app.use(function(req, res, next){
    res.status(404).sendFile(__dirname+'/public/state/404.html');
})

app.use(function(req, res, next){
    res.status(500).sendFile(__dirname+'/public/state/500.html');
})




>>>>>>> 55d7bd0bc1ceb643715b4d5a547f0d0a33b982c1
