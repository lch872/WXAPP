// pages/manager/manager.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    userArr: [
      { "name": "朵朵兰是兰不是南", "icon": "../images/icon.jpg" },
      { "name": "蚊子Yokako", "icon": "../images/icon.jpg" },
      { "name": "1234567", "icon": "../images/icon.jpg" },
      { "name": "1234567890", "icon": "../images/icon.jpg" },
      { "name": "12345678901234是", "icon": "../images/icon.jpg" },
      { "name": "1", "icon": "../images/icon.jpg" },
      { "name": "0", "icon": "../images/icon.jpg" },
      { "name": "red", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
      { "name": "name", "icon": "../images/icon.jpg" },
    ],
    firstArr:[]
  },
  chooseUser: function (e) {
    var clickName = e.currentTarget.dataset.name

    for (var j = 0; j < this.data.userArr.length; j++){

      if (this.data.userArr[j].name == clickName){
        this.data.firstArr.push(this.data.userArr[j])
         this.data.userArr.splice(j, 1);
         this.setData({
           userArr: this.data.userArr,
           firstArr: this.data.firstArr
         })
         return
      }
    }
    
    

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