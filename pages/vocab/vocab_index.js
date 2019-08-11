const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')

Page({
  data: {
    book_id: null,
  },

  onLoad: function(options) {
    app.globalData.word_frequence_1500 = wx.getStorageSync('word_frequence_1500')
    app.globalData.word_frequence_3000 = wx.getStorageSync('word_frequence_3000')
    app.globalData.word_frequence_5000 = wx.getStorageSync('word_frequence_5000')

    if (app.globalData.word_frequence_1500 == ''){
      this.new_user_data()
    }

  },

  new_user_data: function () {
    var repeat_date = new Date();
    var year = repeat_date.getFullYear();
    var month = repeat_date.getMonth() + 1;
    var day = repeat_date.getDate();
    repeat_date = year.toString() + '/' + month.toString() + '/' + day.toString()
    console.log(new Date('2019-08-11'.replace(/-/g, "/")).getTime())
    repeat_date = new Date(repeat_date).getTime()

      var verb_7300_fr = word_frequence;
      var word_frequence_1500 = [];
      for (var i = 0; i < 1500; i++) {
        var learn_word = verb_7300_fr.verb_7300_fr[i].word;
        var learn_word_new = {
          learn_word: learn_word,
          date: repeat_date,
          level: 0
        };
        word_frequence_1500.push(learn_word_new)
      }
      app.globalData.word_frequence_1500 = word_frequence_1500
      wx.setStorageSync('word_frequence_1500', word_frequence_1500)
      console.log(word_frequence_1500)
 
      var word_frequence_3000 = [];
      for (var i = 1501; i < 3000; i++) {
        var learn_word = verb_7300_fr.verb_7300_fr[i].word;
        var learn_word_new = {
          learn_word: learn_word,
          date: repeat_date,
          level: 0
        };
        word_frequence_3000.push(learn_word_new)
      }
      app.globalData.word_frequence_3000 = word_frequence_3000
      wx.setStorageSync('word_frequence_3000', word_frequence_3000)
      console.log(word_frequence_3000)

      var word_frequence_5000 = [];
      for (var i = 3001; i < 5000; i++) {
        var learn_word = verb_7300_fr.verb_7300_fr[i].word;
        var learn_word_new = {
          learn_word: learn_word,
          date: repeat_date,
          level: 0
        };
        word_frequence_5000.push(learn_word_new)
      }
      app.globalData.word_frequence_5000 = word_frequence_5000
    wx.setStorageSync('word_frequence_5000', word_frequence_5000)
      console.log(word_frequence_5000)
  
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

  start: function() {
    wx.navigateTo({
      url: '../vocab/vocab_learn',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})