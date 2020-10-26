import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObject:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    console.log(goods_id);
    this.getGoodsDetail(goods_id)
  },

  getGoodsDetail(goods_id) {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/detail",
      data: {goods_id}
    }).then(result => {
      console.log(result)
      const goodsObject = result.data.message
      this.setData({
        goodsObject
      })
    })
  }
})