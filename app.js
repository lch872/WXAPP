//app.js
App({
  onLaunch: function (e) {
    // return
    // 展示本地存储能力
    var user = wx.getStorageSync('userOpenData') || undefined;  
    console.log(user)

    if (user == undefined || user == 'null') {
      console.log("user == undefined")
      
      wx.login({
        success: res => {
          console.log("wx.login"); 
          console.log(res); 
   
          wx.request({
            url: getApp().serverAddr + '/wx/getOpenId',
            data: { js_code:res.code},
            success: function (res) {
              console.log('success OpenId：', res.data.content.openid)
              wx.setStorageSync('userOpenData', res.data.content.openid)
              console.log(res)
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
                url: getApp().serverAddr+'/wx/adduser',
                method: 'POST',
                data: u,
                header: {'content-type': 'application/x-www-form-urlencoded'},
                success: function (res) {

                  if (res.data.success){
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
  serverAddr: 1 ? 'https://lch872.3322.org' : 'http://192.168.1.150:8080',
  

})
