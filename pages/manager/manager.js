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
      url: '../detail/detail?admin=1'
    })
  } 
})