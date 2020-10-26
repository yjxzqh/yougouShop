import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      },
    ],
    goodsList: [],
    urlDefault: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1602211383,1448876559&fm=26&gp=0.jpg",
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  //总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options);
    //分类页面图片url中传入点击的图片的cid，并通过options来获取
    this.QueryParams.cid = options.cid
    this.getGoodsList()
  },
  // 页面上滑触底事件
  onReachBottom() {
    if (this.QueryParams.pagenum >= this.totalPages) {
      // console.log("没有下一页")
      //消息提示框
      wx.showToast({
        title: '到底了',
      });
    } else {
      // console.log("有下一页")
      this.QueryParams.pagenum++
      this.getGoodsList()
    }
  },
  
  // 下拉刷新事件
  onPullDownRefresh() {
    // 清空数组
    this.setData({
      goodsList:[]
    })
    //重置页码
    this.QueryParams.pagenum = 1
    //重新发送请求
    this.getGoodsList()
  },

  // 获取商品列表数据
  getGoodsList() {
    request({
      url: "https://api-hmugo-web.itheima.net/api/public/v1/goods/search",
      data: this.QueryParams
    }).then(result => {
      // console.log(result.data.message.goods);
      // console.log(result.data.message.total);
      // console.log(result.data.message.pagenum);
      const total = result.data.message.total
      this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
      // console.log(this.totalPages);
      let newGoodsList = result.data.message.goods
      this.setData({
        goodsList: [...this.data.goodsList, ...newGoodsList]
      })
    })
    //请求结束关闭下拉刷新窗口
    wx.stopPullDownRefresh()
  },
  handleTabsItemChange(e) {
    // console.log(e);
    const { index } = e.detail
    let { tabs } = this.data
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  }

})