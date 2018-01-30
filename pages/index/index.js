//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    isApply:false,
    pickerData:[
      {
        "section":0,
        "newindex":0,
        "title": "活动时间",
        "data": ['下午 14:00 - 18:00', '晚上 19:00 - 21:00'],
      }, 
      {
        "section":1,
        "newindex": 0,
        "title": "自我评价",
        "data": ['剧组炊事班','龙套实习生','活不过两幕','戏精你懂么','压轴台柱子'],
      }
    ],
    motto: '遇见更好的自己 ：）',
    userInfo: {},
    index: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      var that = this
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
                wx.getUserInfo({
                  success: res => {
                    app.globalData.userInfo = res.userInfo
                    that.setData({
                      userInfo: res.userInfo,
                      hasUserInfo: true
                    })
                  }
                })
              }
            })
          }
        }
      })
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindPickerChange: function (e) {
    var num = e.currentTarget.dataset.current
    this.data.pickerData[num].newindex = Number(e.detail.value)
    this.setData({
      pickerData: this.data.pickerData
    })
    
  },

  formSubmit: function (e) {
    if (this.data.isApply || !this.data.hasUserInfo) {
      return
    }
    wx.setStorageSync('formId', e.detail.formId)
    console.log('form发生了submit事件，携带formId数据为：', e.detail.formId)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)



    wx.showLoading({
      title: '加载中',
    })
    var that = this
    setTimeout(function () {
      
      wx.hideLoading()
      wx.showToast({
        title: '报名成功',
        icon: 'success',
        duration: 2000
      })
      that.setData({
        isApply: true
      })
    }, 2000)

    var dat = app.globalData.userInfo
    dat['formId'] = e.detail.formId
    dat['openId'] = wx.getStorageSync('userOpenData'),
    
    wx.request({
      url: 'http://localhost:8080/wx/apply',
      method: 'POST',
      data: dat,
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        console.log(app.globalData.userInfo)

      }
    })
    this.setData({
      enablePicker: !this.data.enablePicker
    })
  },
  cancelApply: function (e) {

    var that = this
    wx.showActionSheet({
      itemList: ['取消报名'],
      itemColor: "#E43A37",
      success: function (res) {
        wx.showLoading({
          title: '请稍后',
        })
        setTimeout(function () {
          wx.hideLoading()
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000
          })

          that.setData({
            isApply: false
          })
        }, 2000)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  jumpManager: function (e) {
    wx.navigateTo({
      url: '../manager/manager'
    })
  }

})
