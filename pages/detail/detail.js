// pages/detail/detail.js
const app = getApp()

var isApplied = 0

Page({
  data: {
    actId:0,
    isApply:0,
    applyTag:"",
    appliedList:[],
    appliedCount:0,
    dataArr: {}
  },

  onLoad: function (options) {
    this.data.actId = options.actId
    wx.showShareMenu({
      withShareTicket: true
    })

    var that = this
    var openIds = wx.getStorageSync('userOpenData')
    wx.request({
      url: getApp().serverAddr + '/wx/detail',
      data: {
        openId: openIds,
        actId: this.data.actId
      },
      success: function (res) {
        that.setData({
          dataArr: res.data.content,
        })
      }
    })
    
  },
  jumpToList: function (e){
      wx.navigateTo({
        url: '../userlist/userlist'
      })
  },
  getDataArr: function(e){
    return this.data.dataArr
  },
  onShow: function (e) {
    var that = this
    var openIds = wx.getStorageSync('userOpenData')
    console.log(this.data.actId)
    wx.request({
      url: getApp().serverAddr + '/wx/appliedInfo?limit=6',
      data: {
        openId: openIds,
        actId: this.data.actId
      },
      success: function (res) {
        console.log(res)
        that.setData({
          applyTag: res.data.content.tag,
          isApply: res.data.content.isApply,
          appliedList: res.data.content.appliedList,
          appliedCount: res.data.content.appliedCount
        })
      }
    })
  }
})


function setApplied (e) {
  isApplied = e
}
module.exports={
  Applied: isApplied,
  setApplied: setApplied
}

