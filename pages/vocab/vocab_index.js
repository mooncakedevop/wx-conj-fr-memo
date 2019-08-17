const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')

Page({
  data: {
    book_id: null,
  },

  onLoad: function(options) {
    app.globalData.word_frequence_5000 = wx.getStorageSync('word_frequence_5000')
    app.globalData.learn_word_new_today = wx.getStorageSync('learn_word_new_today')
    app.globalData.learn_word_new_today_no = wx.getStorageSync('learn_word_new_today_no')
    var learn_word_today = wx.getStorageSync('learn_word_today')

    if (app.globalData.word_frequence_5000 == '') {
      this.new_user_data()
    }

    if (learn_word_today.length == 1) {
      this.success();
    }

    var repeat_date = new Date();
    var year = repeat_date.getFullYear();
    var month = repeat_date.getMonth() + 1;
    var day = repeat_date.getDate();
    repeat_date = year.toString() + '/' + month.toString() + '/' + day.toString()
    console.log(new Date('2019-08-11'.replace(/-/g, "/")).getTime())
    repeat_date = new Date(repeat_date).getTime()
    console.log(repeat_date)

    //如果第一个字符的日期不是当天的，生成新词
    var learn_word_new_today = app.globalData.learn_word_new_today
    var learn_word_new_today_no = app.globalData.learn_word_new_today_no
    if (learn_word_new_today[0] != repeat_date) {
      if (app.globalData.freq[0] == true) {
        var learn_word_new_today = [repeat_date];
        var learn_word_new_today_no = [];
        var i = 0;
        var word_frequence_5000 = wx.getStorageSync('word_frequence_5000')
        while (i < app.globalData.freq_number) {
          var learn_no = Math.floor(Math.random() * (1500 - 0 + 1) + 0);
          if (word_frequence_5000[learn_no].level == 0) {
            learn_word_new_today.push(word_frequence_5000[learn_no].learn_word)
            learn_word_new_today_no.push(learn_no)
            word_frequence_5000[learn_no].date = repeat_date;
            console.log(word_frequence_5000[learn_no])
            i++;
          }
        }
        app.globalData.learn_word_new_today = learn_word_new_today
        app.globalData.learn_word_new_today_no = learn_word_new_today_no

        wx.setStorageSync('word_frequence_5000', word_frequence_5000)
        wx.setStorageSync('learn_word_new_today', learn_word_new_today)
        wx.setStorageSync('learn_word_new_today_no', learn_word_new_today_no)

        console.log(learn_word_new_today)
        console.log(learn_word_new_today_no)
        console.log(word_frequence_5000)
      } else if (app.globalData.freq[1] == true) {
        var verb_7300_fr = word_frequence;
        var learn_no = Math.floor(Math.random() * (3000 - 1501 + 1) + 1501);
        console.log(learn_no)
      } else if (app.globalData.freq[2] == true) {
        var verb_7300_fr = word_frequence;
        var learn_no = Math.floor(Math.random() * (5000 - 3001 + 1) + 3001);
        console.log(learn_no)
      }
    }

    //加上旧词
    console.log(app.globalData.learn_word_new_today)
    var learn_word_today = app.globalData.learn_word_new_today
    var learn_word_today_no = app.globalData.learn_word_new_today_no
    var word_frequence_5000 = app.globalData.word_frequence_5000
    for (var i = 0; i < 5000; i++) {
      if (word_frequence_5000[i].date == repeat_date && word_frequence_5000[i].level != 0) {
        learn_word_today.push(word_frequence_5000[i].learn_word)
        learn_word_today_no.push(i)
        console.log(word_frequence_5000[i].learn_word)
      }
    }
    console.log(learn_word_today)
    console.log(learn_word_today_no)

    wx.setStorageSync('learn_word_today', learn_word_today)
    wx.setStorageSync('learn_word_today_no', learn_word_today_no)

  },

  new_user_data: function() {
    var verb_7300_fr = word_frequence;
    var word_frequence_5000 = [];
    for (var i = 0; i < 5000; i++) {
      var learn_word = verb_7300_fr.verb_7300_fr[i].word;
      var learn_word_new = {
        learn_word: learn_word,
        date: 1000000000000,
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

  success: function() {
    wx.redirectTo({
      url: '../vocab/vocab_success',
    })
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