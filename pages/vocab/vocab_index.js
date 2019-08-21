const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')

Page({
  data: {
    main_today_all: null,
    main_already_word: null,
    main_new_word: null,
    main_review_word: null,
    learn_word_new_today: [],
  },

  onLoad: function(options) {
    app.globalData.word_frequence_5000 = wx.getStorageSync('word_frequence_5000')
    app.globalData.learn_word_new_today = wx.getStorageSync('learn_word_new_today')
    app.globalData.learn_word_new_today_no = wx.getStorageSync('learn_word_new_today_no')
    var learn_word_today = wx.getStorageSync('learn_word_today')

    if (app.globalData.word_frequence_5000 == '') {
      this.new_user_data()
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
        var learn_word_new_today = [repeat_date];
        var learn_word_new_today_no = [];
        var i = 0;
        var word_frequence_5000 = wx.getStorageSync('word_frequence_5000')
        while (i < app.globalData.freq_number) {
          var learn_no = Math.floor(Math.random() * (3000 - 1501 + 1) + 1501);
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
      } else if (app.globalData.freq[2] == true) {
        var learn_word_new_today = [repeat_date];
        var learn_word_new_today_no = [];
        var i = 0;
        var word_frequence_5000 = wx.getStorageSync('word_frequence_5000')
        while (i < app.globalData.freq_number) {
          var learn_no = Math.floor(Math.random() * (5000 - 3001 + 1) + 3001);
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
      }
    }

    //加上旧词
    console.log(app.globalData.learn_word_new_today)
    var learn_word_today = [repeat_date]
    var learn_word_today_no = []
    var word_frequence_5000 = app.globalData.word_frequence_5000
    var already_word = []
    var today_all = []
    var review_word = []

    for (var i = 0; i < 5000; i++) {
      if (word_frequence_5000[i].date < repeat_date && word_frequence_5000[i].level == 0) {
        word_frequence_5000[i].date = 9999999999999
      }
      if (word_frequence_5000[i].date < repeat_date) {
        word_frequence_5000[i].date = repeat_date
      }
      if (word_frequence_5000[i].date == repeat_date && word_frequence_5000[i].level != 0) {
        review_word.push(word_frequence_5000[i].learn_word)
        console.log(word_frequence_5000[i].learn_word)
      }
      if (word_frequence_5000[i].level != 0) {
        already_word.push(word_frequence_5000[i].learn_word)
      }
      if (word_frequence_5000[i].date == repeat_date) {
        learn_word_today.push(word_frequence_5000[i].learn_word)
        learn_word_today_no.push(i)
        today_all.push(word_frequence_5000[i].learn_word)
      }
    }
    console.log(learn_word_today)
    console.log(learn_word_today_no)

    wx.setStorageSync('learn_word_today', learn_word_today)
    wx.setStorageSync('learn_word_today_no', learn_word_today_no)


    var main_today_all = today_all.length
    var main_already_word = already_word.length
    var main_review_word = review_word.length
    var main_new_word = today_all.length - review_word.length
    var learn_word_new_today = wx.getStorageSync('learn_word_new_today')
    learn_word_new_today.splice(0, 1)

    this.setData({
      main_today_all: main_today_all,
      main_already_word: main_already_word,
      main_new_word: main_new_word,
      main_review_word: main_review_word,
      learn_word_new_today: learn_word_new_today,
    })


  },

  new_user_data: function() {
    var verb_7300_fr = word_frequence;
    var word_frequence_5000 = [];
    for (var i = 0; i < 5000; i++) {
      var learn_word = verb_7300_fr.verb_7300_fr[i].word;
      var learn_word_new = {
        learn_word: learn_word,
        date: 9999999999999,
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
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
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