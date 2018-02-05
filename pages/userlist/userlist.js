// pages/userlist/userlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userArr:[]
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().serverAddr +'/wx/appliedInfo',
      success: function (res) {
        that.setData({
          userArr: res.data.appliedList
        })
      }
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
  
  }
})