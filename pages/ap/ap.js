// pages/ap/ap.js
const app = getApp()
var dataArrAll={}

Page({
  data: {
    dataArr: dataArrAll
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this
    wx.request({
      url: 'http://localhost:8080/wx/main?',
      data:{
        openId: app.globalData.userInfo.openId,
        actId:'1'
      },
      success: function (res) {
        console.log(res)
        // dataArrAll=res.data
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
  },
  getDataArr: function(e){
    return this.data.dataArr
  }
})


// module.exports = {
//   dataArr: this.getDataArr,
// }