// 商品表
const mongoose = require('mongoose')
const product = mongoose.Schema({
  cate:Number,
  code:Number,
  brandName:String,
  productName:String,
  salePrice:String,
  discountPrice:String,
  discountRate:String,
  centerImg:String,
  updateTime:String              
});

const indexproduct = mongoose.Schema({
  cate:Number,
  code:Number,
  brandName:String,
  productName:String,
  salePrice:String,
  discountPrice:String,
  discountRate:String,
  centerImg:String,
  updateTime:String              
});


const productModel = mongoose.model('ADGproduct', product);
const indexproductModel = mongoose.model('ADGindexproduct', indexproduct);

module.exports = { productModel, indexproductModel }