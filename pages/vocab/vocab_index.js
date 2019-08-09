// pages/index/index.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    book_id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.newer = wx.getStorageSync('newer')
    app.globalData.version = wx.getStorageSync('version')

    if (app.globalData.newer == '' && app.globalData.version == '') { //如果没有任何数据，那就代表是新用户
      wx.setStorageSync('book_id', 0) //写下用户的第一个数据
      wx.setStorageSync('newer', true)
      wx.setStorageSync('version', "v1.0.0")   //写入新版本的版本号
      wx.setStorageSync("hidden_or_not", false)
      wx.setStorageSync("tongbu", "⛅点击进行同步")
    }

    if (app.globalData.version != "v1.0.0") { //如果只是新版本的数据没有
      wx.setStorageSync('version', "v1.0.0")   //写入新版本的版本号
      wx.setStorageSync("hidden_or_not", false)
      wx.setStorageSync("tongbu", "⛅点击进行同步")
    }

    app.globalData.book_id = wx.getStorageSync('book_id')

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

  start: function () {
    wx.navigateTo({
      url: '../vocab/vocab_learn',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})