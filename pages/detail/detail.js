// pages/detail/detail.js
const app = getApp()

var isApplied = 0

Page({
  data: {
    isAdmin:0,
    actId:0,
    isApply:0,
    applyTag:"",
    appliedList:[],
    appliedCount:0,
    dataArr: {},
    sudo:0,
    addActData: {
      "title":"本期活动 ：周末常规话剧练习",
      "pay": "￥15元 /人",
      "date": "2018-01-26 星期六",
      "address": "客村站D出口丽影广场B座5栋1102室",
      "limit": "24",
    }
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
          isAdmin:Number(options.admin)
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
          appliedCount: res.data.content.appliedCount,
          sudo: res.data.content.sudo
        })
      }
    })
  },
  inputEvent: function (e) {
    var tag = e.currentTarget.dataset.tag
    console.log(e)
    if (tag == 'table0'){
      tag = 'pay';
    } else if (tag == 'table1') {
      tag = 'date';
    } else if (tag == 'table2') {
      tag = 'address';
    }
    this.data.addActData[tag] = e.detail.value
    console.log(this.data.addActData)
  },

  addAct:function (e){
    // var oldData = this.data.dataArr
    var actData = this.data.addActData
    
    actData['detail'] = e.detail.value.detail
    actData['views'] = 0
    actData['openId'] = wx.getStorageSync('userOpenData')
    wx.request({
      url: getApp().serverAddr + '/wx/addAct',
      method: 'POST',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      data: actData,
      success: function (res) {
        var ic = res.data.success ? 'success' : 'none'
        wx.showToast({ title: res.data.message, icon: ic, duration: 2000 })
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

