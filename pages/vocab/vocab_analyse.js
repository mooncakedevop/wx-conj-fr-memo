// pages/vocab/vocab_analyse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    learn_word_new_today: [],
    review_word: [],
    already_word: [],
    page_number: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var learn_word_new_today = wx.getStorageSync('learn_word_new_today')
    var review_word = wx.getStorageSync('review_word')
    var already_word = wx.getStorageSync('already_word')
    var page_number = 3

    this.setData({
      learn_word_new_today: learn_word_new_today,
      review_word: review_word,
      already_word: already_word,
      page_number: page_number
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})