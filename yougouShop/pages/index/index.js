import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList: [],
    // 导航数组
    cateList: [],
    // 楼层数组
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 异步请求
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    // });
    // request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    // }).then(result => {
    //   this.setData({
    //     swiperList: result.data.message
    //   })
    // })
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },

  // 获取轮播图数据
  getSwiperList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    }).then(result => {
      this.setData({
        swiperList: result.data.message
      })
    })
  },
  // 获取分类导航数据
  getCateList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems',
    }).then(result => {
      this.setData({
        cateList: result.data.message
      })
    })
  },
  getFloorList(){
    request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata',
    }).then(result => {
      this.setData({
        floorList: result.data.message
      })
    })
  }
})