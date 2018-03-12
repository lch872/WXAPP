// pages/main/main.js

Page({

  data: {
    json: []
  },
  onShow: function (options) {
    var that = this
    wx.request({
      url: getApp().serverAddr + '/wx/main',
      success: function (res) {
        that.setData({
          json: res.data.content
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
    
    var actId = e.currentTarget.dataset.actid
    wx.setStorageSync('currentAct', actId)
    var path = ''
    if(Number(actId) >= 3 ){
      path = '../detail/detail?actId=' + actId
    }else{
      path = '../review/review'
    }

    wx.navigateTo({
      url: path
    })
  }
})

