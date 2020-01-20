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
    dark_mode: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var learn_word_new_today = wx.getStorageSync('learn_word_new_today')
    learn_word_new_today.splice(0, 1)
    var review_word = wx.getStorageSync('review_word')
    var already_word = wx.getStorageSync('already_word')
    var page_number = 1
    var settings_new = wx.getStorageSync('settings_new')

    this.setData({
      learn_word_new_today: learn_word_new_today,
      review_word: review_word,
      already_word: already_word,
      page_number: page_number,
      dark_mode: settings_new[0].dark_mode
    })
  },

  learn_word_new_today: function() {
    var page_number = 1
    wx.showToast({
      title: '🛰正在切换',
      icon: 'none',
      duration: 1500,
      mask: true,
    })
    this.setData({
      page_number: page_number
    })
  },

  review_word: function() {
    var page_number = 2
    wx.showToast({
      title: '🛰正在切换',
      icon: 'none',
      duration: 1500,
      mask: true,
    })
    this.setData({
      page_number: page_number
    })
  },

  already_word: function() {
    var page_number = 3
    wx.showToast({
      title: '🛰正在切换',
      icon: 'none',
      duration: 1500,
      mask: true,
    })
    this.setData({
      page_number: page_number
    })
  },

  choosed_answer: function(e) {
    var learn_word_new_today = wx.getStorageSync('learn_word_new_today')
    learn_word_new_today.splice(0, 1);
    var choosed_answer = learn_word_new_today[e.target.id];
    console.log(e.target.id);
    this.onQuery(choosed_answer);
  },

  choosed_answer_1: function(e) {
    var review_word = wx.getStorageSync('review_word')
    var choosed_answer = review_word[e.target.id];
    console.log(e.target.id);
    this.onQuery(choosed_answer);
  },

  choosed_answer_2: function(e) {
    var already_word = wx.getStorageSync('already_word')
    var choosed_answer = already_word[e.target.id];
    console.log(e.target.id);
    this.onQuery(choosed_answer);
  },

  onQuery: function(search_word) {
    wx.showToast({
      title: '🚀加载中',
      icon: 'none',
      duration: 1500,
      mask: true,
    })
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      w_s: search_word
    }])).get({
      success: function(res) {
        console.log(res.data)
        wx.setStorageSync('consult_data', res.data);
        that.vocab_index_result();
      }
    })
  },

  vocab_index_result: function() {
    wx.navigateTo({
      url: 'vocab_index_result',
    })
  },

  vocab_index: function() {
    wx.navigateBack({
      delta: 1
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