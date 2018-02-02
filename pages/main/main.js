// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    json:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: 'http://' + getApp().serverAddr + '/wx/main',

      success: function (res) {
       
        that.setData({
          json: res.data
        })
      }
    })
  },
  onPullDownRefresh: function () {
  
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