const app = getApp()

Page({
  data: {

  },

  onLoad: function () {

  },

  xianzaifenci: function () {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 15    //指定时态序号
  },


})