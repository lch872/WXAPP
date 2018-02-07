// pages/userlist/userlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  userArr:[],
  tag: ['剧组炊事班', '抢戏路人甲', '活不过两幕', '加戏加鸡腿', '戏精你懂么', '压轴台柱子', '深藏功与名']
  },

  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().serverAddr +'/wx/appliedInfo',
      data:{
        actId: wx.getStorageSync('currentAct')
      },
      success: function (res) {
        that.setData({
          userArr: res.data.content.appliedList
        })
      }
    })
  }
})