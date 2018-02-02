// pages/detail/detail.js
const app = getApp()
var isApplied = 0

Page({
  data: {
    dataArr: {}
  },

  onLoad: function (options) {
    wx.showShareMenu({
      withShareTicket: true
    })
    var that = this

    var openIds = wx.getStorageSync('userOpenData')
    console.log(options.actId)
    wx.request({
      url: 'http://' + getApp().serverAddr +'/wx/detail',
     
      data:{
        openId: openIds,
        actId: options.actId
      },
      success: function (res) {
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
  },
  onShow: function (e) {
    console.log(isApplied)
    this.data.dataArr.isApply = Number(isApplied)
    this.setData({
      dataArr: this.data.dataArr
    })
    console.log(this.data.dataArr)
  }
})


function setApplied (e) {
  isApplied = e
}
module.exports={
  Applied: isApplied,
  setApplied: setApplied
}

