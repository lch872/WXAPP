//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var user = wx.getStorageSync('userOpenData') || undefined;  
    if (user == undefined) {
      
      wx.login({
        success: res => {
          var appid = 'wx2fdfd17e37781b91';
          var secret = 'ddc696a333d44c713d8723f26d0e8182';

          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret +'&grant_type=authorization_code&js_code=' + res.code,
            success: function (res) {
              console.log('success OpenId：', res.data.openid)
              wx.setStorageSync('userOpenData', res.data.openid)
              console.log('save success')
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

          wx.getUserInfo({
            success: res => {
              var u = res.userInfo;
              u['openId'] = wx.getStorageSync('userOpenData')
              this.globalData.userInfo = res.userInfo
              
              wx.request({
                url: 'http://' + getApp().serverAddr+':8080/wx/adduser',
                method: 'POST',
                data: u,
                header: {'content-type': 'application/x-www-form-urlencoded'},
                success: function (res) {
                  // console.log(res)
                  if(res.data.OK){
                    console.log('88888888888')
                  }
                }
              })


              if (this.userInfoReadyCallback) {
                console.log('---------')
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    wxData: '6_PPcU_jmNmpYC5ekhmc_pMgmS6ffWCJkyVr6HHrcBcoZaw6SrbYR1H8zf4dehpqh9DOjF8ud5UGpe3V46kfTOpJ2Vy-OSOmc5Y9ijM4QwcDmhvMn9YgGRHmZW_-2cZL_nTvBFZrdcE1pGwuH4VBAjAHAOUT',
    userInfo: null,
    dbId:null
  },
  serverAddr:'192.168.0.102'
})
