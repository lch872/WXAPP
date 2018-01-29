// pages/manager/manager.js

var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectGroup:0,
    groupArr:[[]],
    userArr: [
      { "name": "朵朵兰是兰不是南", "icon": "../images/icon.jpg" },
      // { "name": "蚊子Yokako", "icon": "../images/icon.jpg" },
      // { "name": "12345", "icon": "../images/icon.jpg" },
      // { "name": "名族风", "icon": "../images/icon.jpg" },
      // { "name": "好怀念", "icon": "../images/icon.jpg" },
      // { "name": "1", "icon": "../images/icon.jpg" },
      // { "name": "地方v等待", "icon": "../images/icon.jpg" },
      // { "name": "red", "icon": "../images/icon.jpg" }, 
      // { "name": "朵朵兰是兰不是南", "icon": "../images/icon.jpg" },
      // { "name": "蚊子Yokako", "icon": "../images/icon.jpg" },
      // { "name": "1234567", "icon": "../images/icon.jpg" },
      // { "name": "绿豆糕", "icon": "../images/icon.jpg" },
      // { "name": "躲躲藏藏", "icon": "../images/icon.jpg" },
      // { "name": "1", "icon": "../images/icon.jpg" },
      // { "name": "0", "icon": "../images/icon.jpg" },
      // { "name": "red", "icon": "../images/icon.jpg" },
      // { "name": "咯瞌睡", "icon": "../images/icon.jpg" },
      // { "name": "蚊子Yokako", "icon": "../images/icon.jpg" },
      // { "name": "1", "icon": "../images/icon.jpg" },
      // { "name": "1😄😄😄", "icon": "../images/icon.jpg" },
      // { "name": "孙悟空", "icon": "../images/icon.jpg" },
      // { "name": "1", "icon": "../images/icon.jpg" },
      // { "name": "猪八戒", "icon": "../images/icon.jpg" },
      // { "name": "red", "icon": "../images/icon.jpg" },
    ],
  },
  chooseUser: function (e) {
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
    var clickName = e.currentTarget.dataset.name
    for (var j = 0; j < this.data.userArr.length; j++) {
      if (this.data.userArr[j].name == clickName) {
        this.data.groupArr[this.data.selectGroup].push(this.data.userArr[j])
        this.data.userArr.splice(j, 1);
        return
      }
    }
  },
  delAdd: function (e) {
    var clickName = e.currentTarget.dataset.name
    for (var j = 0; j < this.data.groupArr[this.data.selectGroup].length; j++) {
      if (this.data.groupArr[this.data.selectGroup][j].name == clickName) {
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
    var fId = wx.getStorageSync('formId')
    var fObj = e.detail.value;
    var l = 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + app.globalData.wxData;
    var d = {
      touser: wx.getStorageSync('userOpenData').openid,
      template_id: 'XcG32liQDgwwxzuf7rOE-oDTzNGXiul6HDxVBFmCUp8',//这个是1、申请的模板消息id，  
      page: '/pages/index/index',
      form_id: fId,
      data: {
        "keyword1": {
          "value": '小程序测试模版',
          "color": "#4a4a4a"
        },
        "keyword2": {
          "value": '呜呜呜呜多',
          "color": "#9b9b9b"
        },
        "keyword3": {
          "value": new Date().getDate(),
          "color": "#9b9b9b"
        }
      }
    }  

    wx.request({
      url: l,
      data: d,
      method: 'POST',
      success: function (res) {
        console.log("push msg");
        console.log(res);
        wx.showActionSheet({
          itemList: [res.data.errmsg],
          itemColor: "#E43A37",
        })

      },
      fail: function (err) {
        // fail  
        console.log("push err")
        console.log(err);
      }
    });  

    return
    wx.showLoading({
      title: '加载中',
    })

    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '发送成功',
        icon: 'success',
        duration: 2000
      })
    }, 2000)
  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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