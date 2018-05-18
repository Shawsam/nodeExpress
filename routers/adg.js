const express = require('express')
const superagent = require('superagent')
const formatTime = require('../utils/formatTime')
const utils = require('utility')

const { productModel, indexproductModel } =  require('../models/product');

// 该路由使用的中间件,定义请求返回数据结构
var resData,router = express.Router();
router.use(function timeLog(req, res, next) {
  console.log('访问接口',req.originalUrl,',Time:',formatTime(Date.now()))
  resData = { state:true,
  	          data:null,
  	          msg:''
  	        }
  next();
});


//接口-临时登录凭证code 获取 session_key 和 openid 等  方式-post 参数-jsCode
router.get('/getOpenId', function(req, res) {
    console.log('/***********************登录凭证code换取openId************************/')
    console.log('请求参数，'+ JSON.stringify(req.query))
    const JSCODE = req.query.jsCode
    // console.log('请求参数，'+ JSON.stringify(req.body))
    // const JSCODE = req.body.jsCode
    const APPID = 'wxb8b8866dcb2f08b8'
    const SECRET = '3d8e9c3c03f0141bad94765b0b3f2c5b'
    const originUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${SECRET}&js_code=${JSCODE}&grant_type=authorization_code`
    superagent.get(originUrl)
      .end(function (err, res) {
         // 常规的错误处理
         if (err) {
             console.log(err)
         }else{
             var resText = JSON.parse(res.text)
             if(resText.openid){
                 resData.msg = '成功'
                 resData.data =  resText
                 console.log('处理结果，'+resData.msg)
                 res.json(resData)
             }else{
                 resData.msg = '无效的jsCode'
                 console.log('处理结果，'+resData.msg)
                 res.json(resData)
             }

          }
       })  
})


//接口-首页  方式-get 参数-page(页码)
router.get('/indexData', function(req,res) {
    console.log('/************************访问主页商品************************/')
    console.log('请求参数，'+ JSON.stringify(req.query))
     var pageSize = Number(req.query.pagesize) || 30;   //一页多少条
     var currentPage = Number(req.query.page) || 1;     //当前第几页
     var skipNum = (currentPage - 1) * pageSize;            //跳过页数
     indexproductModel.find({}).skip(skipNum).limit(pageSize)
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

//接口-商品分类  方式-get 参数-cate(类别)
router.get('/productList', function(req, res) {
    console.log('/************************访问商品列表************************/')
    console.log('请求参数，'+ JSON.stringify(req.query))
    const cate = req.query.cate||1
    const pageSize = Number(req.query.pagesize) || 50;   //一页多少条
    const currentPage = Number(req.query.page) || 1;     //当前第几页
    const skipNum = (currentPage - 1) * pageSize;        //跳过页数

    productModel.find({cate:cate}).skip(skipNum).limit(pageSize)
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


module.exports = router;