// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cunrrentActId: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      cunrrentActId: '3'//option.actId
    })
  },
  formSubmit: function (e) {
    var openIds = wx.getStorageSync('userOpenData')
    wx.request({
      url: getApp().serverAddr + '/wx/saveFinalFormId',
      data: {
        finalFormId: e.detail.formId,
        openId: openIds,
        actId: this.data.cunrrentActId
      }
    })
    wx.navigateBack({
      delta: 1
    })
  }

})