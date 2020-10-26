import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObject:{}
  },

  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    console.log(goods_id);
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  getGoodsDetail(goods_id) {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      data: {goods_id}
    }).then(result => {
      // console.log(result)
      const goodsObject = result.data.message
      this.GoodsInfo = goodsObject
      console.log(this.GoodsInfo)
      this.setData({
        goodsObject:{
          goods_name:goodsObject.goods_name,
          goods_price:goodsObject.goods_price,
          goods_introduce:goodsObject.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:goodsObject.pics
        }
      })
    })
  },
  // 放大轮播图预览
  handlePreviewImage(e){
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls,
    });
  },
  // 加入购物车
  handleCartAdd(){
    console.log("qqq")
    let cart = wx.getStorageSync("cart")||[]
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id)
    if(index === -1){
      this.GoodsInfo.num = 1
      cart.push(this.GoodsInfo)
    }else{
      cart[index].num++
    }
    wx.setStorageSync("cart",cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
  }
})