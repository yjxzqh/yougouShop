import { request } from "../../request/index.js"
// pages/category/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧的菜单数据
    leftMemuList: [],
    // 右侧的菜单数据
    rightContent: [],
    // 左侧菜单点击的索引
    currentIndex: 0,
    // 右侧商品列表顶部距离
    scrollTop: 0
  },
  // 接口的返回数据
  cates: [],



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const cates = wx.getStorageSync("cates");
    if (!cates) {
      this.getCates()
    } else {
      if ((Date.now() - cates.time) > 1000 * 60 * 5) {
        this.getCates()
      } else {
        console.log("调用缓存数据");
        this.cates = cates.data
        let leftMemuList = this.cates.map(v => v.cat_name)
        let rightContent = this.cates[0].children
        this.setData({
          leftMemuList,
          rightContent
        })
      }
    }
  },



  getCates() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/categories"
    }).then(result => {
      this.cates = result.data.message
      // 存本地缓存
      wx.setStorageSync("cates", { time: Date.now(), data: this.cates })
      // 左侧数据
      let leftMemuList = this.cates.map(v => v.cat_name)
      // 右侧数据
      let rightContent = this.cates[0].children
      this.setData({
        leftMemuList,
        rightContent
      })
      // console.log(result)
    })
  },

  handleItemTap(e) {
    const { index } = e.currentTarget.dataset
    let rightContent = this.cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0
    })
  }
})