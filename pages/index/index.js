//index.js

const app = getApp()
// var common = require('../ap/ap.js')

Page({
  data: {
    isApply: false,
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
 
  onLoad: function (option) {
    console.log(option.isApply)
    this.setData({
      isApply: Number(option.isApply)
    })
    console.log(option.isApply)
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
    wx.showLoading({title: '加载中'})

    var formId = e.detail.formId
    var openid = wx.getStorageSync('userOpenData')
    
    this.applyRequest('1', openid, '1')

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

        var openid = wx.getStorageSync('userOpenData')

        wx.showLoading({title: '加载中'})

        that.applyRequest('1', openid, '0')
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
  },
  applyRequest: function (actID, openid, isConfirm) {
    var that = this
    wx.request({
      url: 'http://localhost:8080/wx/apply',
      data: {
        openId: openid,
        activity: actID,
        confirm: isConfirm
      },
      success: function (res) {
        if (res.data.OK) {

          wx.hideLoading()
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })

          that.setData({
            isApply: parseInt(isConfirm)
          })
        }
      }
    })
  }

})
