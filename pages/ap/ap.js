// pages/ap/ap.js
const app = getApp()

Page({
  data: {
    dataArr: {},
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this
    wx.request({
      url: 'http://localhost:8080/wx/main',
      success: function (res) {
        console.log(res.data)
        that.setData({
          dataArr: res.data
        })
      }
    })
  },
  jumpToList: function (e){
      wx.navigateTo({
        url: '../userlist/userlist'
      })
  }
})