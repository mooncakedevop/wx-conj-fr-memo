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
    dark_mode: null,
  },

  onLoad: function(options) {
    this.check_old_version();
    app.globalData.mots_deja_vu = wx.getStorageSync('mots_deja_vu') //用户词库
    app.globalData.learn_word_new_today = wx.getStorageSync('learn_word_new_today') //今日新词
    var learn_word_today = wx.getStorageSync('learn_word_today') //今天要出现的所有词
    var settings_new = wx.getStorageSync('settings_new')
    app.globalData.freq = settings_new[0].freq
    app.globalData.freq_number = settings_new[0].freq_number
    var dark_mode = settings_new[0].dark_mode;


    //这一块不动，生成日期
    var repeat_date = new Date();
    var year = repeat_date.getFullYear();
    var month = repeat_date.getMonth() + 1;
    var day = repeat_date.getDate();
    repeat_date = year.toString() + '/' + month.toString() + '/' + day.toString()
    //console.log(new Date('2019-08-11'.replace(/-/g, "/")).getTime())
    repeat_date = new Date(repeat_date).getTime()
    console.log(repeat_date)
    console.log(app.globalData.freq)


    //根据词书生成所有新词
    if (app.globalData.freq[0] == true) { //词书
      var temp = word_frequence;
      var wordlist = temp.freq_1500;
    }
    if (app.globalData.freq[1] == true) {
      var temp = word_frequence;
      var wordlist = temp.freq_3000;
    }
    if (app.globalData.freq[2] == true) {
      var temp = word_frequence;
      var wordlist = temp.freq_5000;
    }

    var wordlist_full = [];
    for (var i = 0; i < wordlist.length; i++) {
      var learn_word = wordlist[i].word;
      var learn_word_new = {
        learn_word: learn_word,
        date: 9999999999999,
        level: 0
      };
      wordlist_full.push(learn_word_new)
    }
    app.globalData.wordlist_full = wordlist_full
    wx.setStorageSync('wordlist_full', wordlist_full)
    console.log(wordlist_full)


    //wordlist_full中去除mots_deja_vu
    var mots_deja_vu = wx.getStorageSync('mots_deja_vu')
    console.log(mots_deja_vu)
    let wordlist_full_word = []
    let mots_deja_vu_word = []
    for (let i = 0; i < wordlist_full.length; i++) {
      wordlist_full_word.push(wordlist_full[i].learn_word)
    }
    for (let i = 0; i < mots_deja_vu.length; i++) {
      mots_deja_vu_word.push(mots_deja_vu[i].learn_word)
    }
    let a = wordlist_full_word
    let b = mots_deja_vu_word
    let intersection = a.filter(v => b.includes(v))
    let difference = a.concat(intersection).filter(v => !a.includes(v) || !intersection.includes(v))
    console.log(difference) //这里的diffrence就是今天的新词（标准词库中）范围。

    //如果第一个字符的日期不是当天的，生成新词。只有当每天第一次打开时生成。
    if (learn_word_new_today == null) {
      learn_word_new_today = [9999999999999]
    }

    if (learn_word_new_today[0] != repeat_date) {

      var learn_word_new_today = [repeat_date];
      var i = 0;
      while (i < app.globalData.freq_number) { //每天背多少词呢？
        var learn_no = Math.floor(Math.random() * (difference.length - 0 + 1) + 0);
        learn_word_new_today.push(difference[learn_no])
          i++;
      }
      app.globalData.learn_word_new_today = learn_word_new_today
      wx.setStorageSync('learn_word_new_today', learn_word_new_today)

      console.log(learn_word_new_today)  //今天的新词
      console.log(difference)  //
    }

    let mots_vont_voir = []
    for (var i = 1; i < learn_word_new_today.length+1; i++) {
      var learn_word = learn_word_new_today[i];
      var learn_word_new = {
        learn_word: learn_word,
        date: 9999999999999,
        level: 0
      };
      mots_vont_voir.push(learn_word_new)
    }

    console.log(mots_deja_vu) //之前的，对象数组
    console.log(mots_vont_voir) //今天的新词，对象数组

  
    //加上旧词
    var already_word = []
    var today_all = []
    var review_word = []
    var mots_aujourdhui = mots_deja_vu.concat(mots_vont_voir) //今天所有将出现的词
    console.log(mots_aujourdhui) //今天的新词，对象数组

    for (var i = 0; i < mots_aujourdhui.length; i++) {

      //如果小于今天的日期，同时level为0，则日期均为999。此情况不存在。
      //如果小于今天的日期，则把日期设为今天。
      if (mots_aujourdhui[i].date < repeat_date) {
        mots_aujourdhui[i].date = repeat_date
      }

      if (mots_aujourdhui[i].level == 0) {
        mots_aujourdhui[i].date = repeat_date
      }

      //如果等于今天的日期，同时level不为0。则这些单词是今天需要复习的单词。
      if (mots_aujourdhui[i].date == repeat_date && mots_aujourdhui[i].level != 0)       {
        review_word.push(mots_aujourdhui[i].learn_word)
        console.log(mots_aujourdhui[i].learn_word)
      }

      if (mots_aujourdhui[i].level != 0) {
        already_word.push(mots_aujourdhui[i].learn_word)
      }

      if (mots_aujourdhui[i].date == repeat_date) {
        today_all.push(mots_aujourdhui[i].learn_word)
      }
    }
    console.log(review_word)
    console.log(today_all)
    console.log(mots_aujourdhui)

    wx.setStorageSync('review_word', review_word)
    wx.setStorageSync('already_word', already_word)
    wx.setStorageSync('mots_aujourdhui', mots_aujourdhui)

    var main_today_all = today_all.length
    var main_already_word = already_word.length
    var main_review_word = review_word.length
    var main_new_word = today_all.length - review_word.length

    this.setData({
      main_today_all: main_today_all,
      main_already_word: main_already_word,
      main_new_word: main_new_word,
      main_review_word: main_review_word,
      dark_mode: dark_mode,
    })
  },

  check_old_version: function(){
    var word_frequence_5000 = wx.getStorageSync('word_frequence_5000') //用户词库
    if (word_frequence_5000 != ''){
      var mots_deja_vu = []
      for (var i = 0; i < word_frequence_5000.length; i++) {
        if (word_frequence_5000[i].level != 0) {
          mots_deja_vu.push(word_frequence_5000[i])
        }
      }

      wx.setStorageSync('mots_deja_vu', mots_deja_vu)
      wx.setStorageSync('old_word_frequence_5000', word_frequence_5000)
      wx.removeStorageSync('word_frequence_5000')
      console.log(word_frequence_5000)
    }

  },

  onQuery: function(search_word) {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      w_s: search_word
    }])).get({
      success: function(res) {
        console.log(res.data)
        app.globalData.consult_data = res.data;
        wx.setStorageSync('consult_data', res.data);
        that.vocab_index_result();
      }
    })
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

  //认单词
  start: function() {
    wx.navigateTo({
      url: 'vocab_result',
    })
  },

  //默单词
  start_reverse: function() {
    wx.navigateTo({
      url: 'vocab_result_reverse',
    })
  },

  //单词表
  analyse: function() {
    wx.navigateTo({
      url: 'vocab_analyse',
    })
  },

  like_me: function() {
    var self = this;
    wx.setClipboardData({
      data: "hxdred",
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '✨复制成功✨请粘贴在微信搜索框搜索公众号',
          success: function(res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },

  onShareAppMessage: function(res) {
    return {
      title: '搞定法语背单词就靠它了！😱',
      path: 'pages/welcome/welcome',
      imageUrl: '',
      success: function(shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function(res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function(res) {
        // 不管成功失败都会执行
      }
    }
  }
})