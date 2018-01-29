// pages/ap/ap.js
const app = getApp()
var order = ['red', 'yellow', 'blue', 'green', 'red']


Page({

  /**
   * 页面的初始数据
   */
  data: {
    markers: [{
      latitude: 23.095666,
      longitude: 113.321502,
      name: 'T.I.T 创意园',
      desc: '我现在的位置'
    }],
    covers: [{
      latitude: 23.099794,
      longitude: 113.324520,
      iconPath: '../images/car.png',
      rotate: 10
    }, {
      latitude: 23.099298,
      longitude: 113.324129,
      iconPath: '../images/car.png',
      rotate: 90
    }],
    dataArr: [
      { "icon": "money", "text": "费用: ￥15元 /人" },
      { "icon": "time", "text": "时间: 2018-01-26 星期六" },
      { "icon": "local", "text": "地点: 客村站D出口丽影广场B座5栋1102室" },
    ],
    toView: 'red',
    scrollTop: 100,
    isScroll: false,
    enablePicker:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },
  tap: function (e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function (e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },

  jumpToList: function (e){
      wx.navigateTo({
        url: '../userlist/userlist'
      })
  },
  shareClick: function (e) {

  }
})