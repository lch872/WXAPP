// pages/manager/manager.js

var app = getApp();
Page({
  data: {
    selectGroup:0,
    groupArr:[[]],
    userArr: [],
    boy:0,
    girl:0,
    blockColor: ['#F5A9BC', '#F5A9E1', '#A9D0F5', '#BCF5A9', '#A9F5D0', '#A9E2F3', '#A9BCF5', '#F5D0A9', '#F5BCA9', '#F5A9BC', '#F5A9E1', '#A9D0F5', '#BCF5A9', '#A9F5D0', '#A9E2F3', '#A9BCF5', '#F5D0A9', '#F5BCA9']
  },
  chooseUser: function (e) {
    console.log(e)
    this.findDelAdd(e)
    console.log(this.data.groupArr)
    this.setData({
      userArr: this.data.userArr,
      groupArr: this.data.groupArr
    })
  },
  deleteUser: function (e) {
    this.delAdd(e)
    this.setData({
      userArr: this.data.userArr,
      groupArr: this.data.groupArr
    })
  },
  findDelAdd: function (e) {
    var openId = e.currentTarget.dataset.openid
    for (var j = 0; j < this.data.userArr.length; j++) {

      console.log('openId: ', openId)
      console.log('this.openId: ', this.data.userArr[j].openId)

      if (this.data.userArr[j].openId == openId) {
        this.data.groupArr[this.data.selectGroup].push(this.data.userArr[j])
        this.data.userArr.splice(j, 1);
        return
      }
    }
  },
  delAdd: function (e) {
    var openId = e.currentTarget.dataset.openid
    for (var j = 0; j < this.data.groupArr[this.data.selectGroup].length; j++) {
      if (this.data.groupArr[this.data.selectGroup][j].openId == openId) {
        this.data.userArr.push(this.data.groupArr[this.data.selectGroup][j])
        this.data.groupArr[this.data.selectGroup].splice(j, 1);
        return
      }
    }
  },
  addGroup: function (e, delArr, addArr) {
    var ddd = [];
    this.data.groupArr.push(ddd)
    this.setData({
      groupArr: this.data.groupArr,
      selectGroup: this.data.groupArr.length-1,
    })
  },
  selectedGroup: function (e) {
    var index = e.currentTarget.dataset.index
    this.setData({
      selectGroup: index,
    })

  },
  sendToUser: function (e) {
    var openId = wx.getStorageSync('userOpenData')
    wx.showLoading({ title: '加载中' })
    wx.request({
      url: getApp().serverAddr + '/wx/sendMessage',
      data: {
        openId: openId
      },
      success: function (res) {
        wx.hideLoading()
        wx.showToast({
          title: '发送成功',
          icon: 'success',
          duration: 2000
        })
      }
    });  
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.request({
      url: getApp().serverAddr +'/wx/applied',
      success: function (res) {
        var boy = 0
        var girl = 0
        for (var j = 0, len = res.data.length; j < len; j++) {
          res.data[j].gender == 2 ? girl += 1 : boy += 1
        }
        that.setData({
          boy: boy,
          girl: girl,
          userArr:res.data
        })
        if (res.data.OK) {
          console.log('88888888888')
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})