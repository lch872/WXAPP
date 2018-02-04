// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    json: []
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().serverAddr + '/wx/main',
      success: function (res) {
        that.setData({
          json: res.data
        })
      },
    })
  },
  onPullDownRefresh: function () {
    console.log("pppppp")
  },
  onReachBottom: function () {
  
  },
  clickCell: function (e) {
    var aUrl = e.currentTarget.dataset.url
    wx.navigateTo({
      url: aUrl
    })
  }
})