// pages/manager/manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  makeGroup: function () {
    wx.navigateTo({
      url: '../group/group'
    })
  },
  newActivity: function () {
    wx.navigateTo({
      url: '../detail/detail?admin=1&actId=3'
    })
  },
  sendFeedback: function () {
    var that = this
    wx.showLoading({ title: '加载中' })
    wx.request({
      url: getApp().serverAddr + '/wx/sendMessage?type=feedback',
      data: {
        actId: wx.getStorageSync('currentAct')
      },
      success: function (res) {
        wx.hideLoading()
        wx.showToast({title: '发送成功',icon: 'success',duration: 2000
        })
      }
    })
  } 
})