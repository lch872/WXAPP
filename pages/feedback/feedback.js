
var app = getApp()
Page({
  data: {
    stars: [0, 1, 2, 3, 4],
    normalSrc: '../images/normal.png',
    selectedSrc: '../images/selected.png',
    key: 0,//评分
    cunrrentActId:0,
    isUpdata: false
  },
  onLoad: function () {
    this.setData({
      cunrrentActId:'3'//option.actId
    }),
    wx.setNavigationBarTitle({
      title: '感谢参与'
    })
  },
  
  selected: function (e) {
    var key = e.currentTarget.dataset.key
    console.log("得" + key + "分")
    this.setData({
      key: key
    })
  },
  formSubmit: function (e) {
    console.log(e)
    if(this.data.isUpdata){
      wx.redirectTo({
        url: '../main/main'
      })
      return
    }


    var that = this
    wx.request({
      url: getApp().serverAddr + '/wx/feedback',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data:{
        advice:e.detail.value.detail,
        star: this.data.key,
        openId: wx.getStorageSync('userOpenData'),
        actId: this.data.cunrrentActId
      },
      success: function (res) {
        var ic = res.data.success ? 'success' : 'none'
        wx.showToast({ title: res.data.message, icon: ic, duration: 2000 })
        that.setData({
          isUpdata: true
        })
      }
    })
  }



  
})