var express = require('express');
var superagent = require('superagent')
var formatTime = require('../utils/formatTime');

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
router.get('/getOpenId', function(api_req, api_res) {
    console.log('/***********************登录凭证code换取openId************************/')
    console.log('请求参数，'+ JSON.stringify(api_req.query))
    const JSCODE = api_req.query.jsCode
    // console.log('请求参数，'+ JSON.stringify(api_req.body))
    // const JSCODE = api_req.body.jsCode
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
                 api_res.json(resData)
             }else{
                 resData.msg = '无效的jsCode'
                 console.log('处理结果，'+resData.msg)
                 api_res.json(resData)
             }

          }
       })  
})

https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code

//接口-首页  方式-get 参数-page(页码)
router.get('/indexData', function(api_req, api_res) {
    console.log('/************************访问主页商品************************/')
    console.log('请求参数，'+ JSON.stringify(api_req.query))
    const pageNum = api_req.query.page||0
    const jsonData = {"category":"","sort":"topSelling","size":"30","page":pageNum,"text":"","within":"","query":"allCategories:9","condition":{"brand":[],"gender":[],"priceRange":[0,5150],"specialPriceYnOption":false,"giftYnOption":false,"isNewProductOption":false,"fastShopYnOption":false,"flatPriceYnOption":false}}
    const originUrl = 'http://www.shilladfs.com/estore/kr/zh/ajaxProducts'

    superagent.post(originUrl)
      .type('form')
      .send({json:JSON.stringify(jsonData)})
      .end(function (err, res) {
         // 常规的错误处理
         if (err) {
             console.log(err)
         }else{
             var resText = JSON.parse(res.text),
                 resArray = resText.results,
                 filterData = []
             resArray.map(function(item){
                filterData.push({
                  code:item.code,
                  brandName:item.brandCategory.brandName,
                  productName:item.brandCategory.displayName,
                  salePrice:(item.userPrice.salePrice*6.35).toFixed(2),
                  discountPrice:(item.userPrice.discountPrice*6.35).toFixed(2),
                  discountRate:item.userPrice.discountRate,
                  centerImg:item.galleryImages[0]['150X'].url})
             })
             console.log(filterData)
             resData.msg = '成功';
             resData.data =  filterData;
             console.log('处理结果，'+resData.msg);
             api_res.json(resData);
          }
       })  
})

//接口-商品分类  方式-get 参数-cate(类别)
router.get('/productList', function(api_req, api_res) {
    console.log('/************************访问商品列表************************/')
    console.log('请求参数，'+ JSON.stringify(api_req.query))
    const cate = api_req.query.cate||1
    const data = { "form":"normal","sc":cate,"type":"topSelling","searchWord":"","rank":0 }
    const originUrl = 'http://www.shilladfs.com/estore/kr/zh/e/bestshop/getBestProductList'

    superagent.post(originUrl)
      .type('form')
      .send(data)
      .end(function (err, res) {
         // 常规的错误处理
         if (err) {
             console.log(err)
         }else{
             var resText = JSON.parse(res.text),
                 resArray = resText,
                 filterData = []
             resArray.map(function(item,index){
                filterData.push({
                  rank:index+1,
                  code:item.code,
                  brandName:item.brandCategory.brandName,
                  productName:item.brandCategory.displayName,
                  salePrice:(item.userPrice.salePrice*6.35).toFixed(2),
                  discountPrice:(item.userPrice.discountPrice*6.35).toFixed(2),
                  discountRate:item.userPrice.discountRate,
                  centerImg:item.galleryImages[0]['150X']?item.galleryImages[0]['150X'].url:''
                })
             })
             console.log(filterData)
             resData.msg = '成功'
             resData.data =  filterData
             console.log('处理结果，'+resData.msg)
             api_res.json(resData)
          }
       })  
})


module.exports = router;