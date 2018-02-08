//index.js

const app = getApp()


Page({
  data: {
    isApply: false,
    isSudo: 1,
    pickerData:[
      {
        "section":0,
        "newindex":0,
        "title": "活动时间",
        "data": ['星期六 13:30 - 17:30']
      }, 
      {
        "section":1,
        "newindex": 0,
        "title": "自我评价",
        "data": ['剧组炊事班', '抢戏路人甲', '活不过两幕', '加戏加鸡腿', '戏精你懂么', '压轴台柱子','深藏功与名']
      }
    ],
    motto: '遇见更好的自己 ：）',
    userInfo: {},
    index: 0,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
 
  onLoad: function (option) {

    console.log(option)
    this.data.pickerData[1].newindex = Number(option.tag)
    this.setData({
      pickerData: this.data.pickerData,
      isApply: Number(option.isApply),
      isSudo: Number(option.isSudo)
    })

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
              success(e) {
                wx.getUserInfo({
                  success: res => {
                    that.addUser(res.userInfo)
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
          this.addUser(res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    this.addUser(e.detail.userInfo)
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
    var actId = wx.getStorageSync('currentAct')
    var openId = wx.getStorageSync('userOpenData')
    
    var arr = this.data.pickerData[1]
    var tag = arr.newindex

    this.applyRequest(actId, openId, '1', formId, tag)
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
        var actId = wx.getStorageSync('currentAct')
        var openid = wx.getStorageSync('userOpenData')

        wx.showLoading({title: '加载中'})

        that.applyRequest(actId, openid, '0')
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  jumpManager: function (e) {

    if (!this.data.isSudo){
      return
    }
    wx.navigateTo({
      url: '../manager/manager'
    })
  },
  applyRequest: function (actID, openid, isConfirm, aFormId, tag) {
    var that = this
    wx.request({
      url: getApp().serverAddr +'/wx/apply',
      data: {
        openId: openid,
        activity: actID,
        confirm: isConfirm,
        formId: aFormId,
        tag: tag
      },
      success: function (res) {
        wx.hideLoading()
        var ic = res.data.success ? 'success' : 'none'
        wx.showToast({ title: res.data.message, icon: ic ,duration: 2000 })
          that.setData({
            isApply: res.data.success
        })
      }
    })
  },
  addUser: function (res){
    var u = res
    u['openId'] = wx.getStorageSync('userOpenData')
    app.globalData.userInfo = res
    wx.request({
      url: getApp().serverAddr + '/wx/adduser',
      method: 'POST',
      data: u,
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      success: function (res) {
        if (res.data.success) {
          console.log('88888888888')
        }
      }
    })
  },
  scanCode: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res)
        var path = 'https://mp.weixin.qq.com/a/~t2CHa9r9eE9L6sYM2wff0w~~'
        if (res.result == path){
          wx.request({
            url: getApp().serverAddr + '/wx/signIn',
            data: {
              openId: wx.getStorageSync('userOpenData'),
              actId: wx.getStorageSync('currentAct'),
            },
            success: function (res) {  
              var ic = res.data.success ? "success" : "none"
              console.log(ic)
              wx.showToast({ title: res.data.message, icon: ic, duration: 2000 })
            }
          })
        }else{
          wx.showToast({ title: "剧组筹备中，请等待通告", icon: 'none', duration: 2000 })
        }
      }
    })
  }
})
