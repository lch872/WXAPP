//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var user = wx.getStorageSync('userOpenData') || {};  
    if (!user.openid || (user.expires_in || Date.now()) < (Date.now() + 600)) {
      // 登录
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          var appid = 'wx2fdfd17e37781b91'; //填写微信小程序appid
          var secret = 'ddc696a333d44c713d8723f26d0e8182'; //填写微信小程序secret

          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret +'&grant_type=authorization_code&js_code=' + res.code,
            header: { 'content-type': 'application/json'},
            success: function (res) {
            var obj = {};
            obj.openid = res.data.openid;
            obj.expires_in = Date.now() + res.data.expires_in;  
            console.log(obj)
            wx.setStorageSync('userOpenData', obj)
            }
          })

        }
      })
    }else{
      console.log(user);  
    }  
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    wxData: '6_sLB-x65R9Si4KVUVy7x8fgapmfsVAJ_Ixz6AG3MHfoMeoz5zVST_mYVtcO99MUcwPNZ_s56ZQtxZBa-yRbAeAOvu-GdUOvrunaLNuGqBsa9j-Rx78VvraLAXVhwJCThABAEXO',
    userInfo: null
  }
})
