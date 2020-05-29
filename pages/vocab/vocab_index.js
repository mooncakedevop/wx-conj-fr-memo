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
    app.globalData.word_frequence_5000 = wx.getStorageSync('word_frequence_5000') //标砖词库，新用户为空
    app.globalData.mots_deja_vu = wx.getStorageSync('mots_deja_vu') //用户词库
    app.globalData.learn_word_new_today = wx.getStorageSync('learn_word_new_today') //今日新词
    app.globalData.learn_word_new_today_no = wx.getStorageSync('learn_word_new_today_no') //今日新词的编号
    var learn_word_today = wx.getStorageSync('learn_word_today') //今天要出现的所有词
    var settings_new = wx.getStorageSync('settings_new')
    app.globalData.freq = settings_new[0].freq
    app.globalData.freq_number = settings_new[0].freq_number
    var dark_mode = settings_new[0].dark_mode;
    var word_frequence_5000 = app.globalData.word_frequence_5000

    if (word_frequence_5000.length == 5000) {
      var delete_word = ['visée', 'yougoslave', 'hé', "d'après", 'ouais', 'capitale', 'prostitué', "d'ailleurs", 'hum', 'vendu', 'uranium', 'félicitation', "d'accord", 'ex', 'médias', 'ben', 'vingt-quatre', 'mark', "d'autant", 'chiite', 'syrien', 'appliqué', 'tandis', "d'abord", 'centrale', 'publique', 'vingt-cinq', 'eh', 'venu']
      var add_word = ['média', 'félicitations']
      for (var i = 0; i < delete_word.length; i++) {
        for (var j = 0; j < word_frequence_5000.length; j++) {
          if (word_frequence_5000[j].learn_word == delete_word[i]) {
            word_frequence_5000.splice(j, 1)
          }
        }
      }
      for (var i = 0; i < add_word.length; i++) {
        var add_word = add_word[i]
        var add_word = {
          add_word: add_word,
          date: 9999999999999,
          level: 0
        };
        word_frequence_5000.push(add_word)
      }
      app.globalData.word_frequence_5000 = word_frequence_5000
      wx.setStorageSync('word_frequence_5000', word_frequence_5000)
    }

    if (app.globalData.word_frequence_5000 == '') {
      this.new_user_data()
    }

    //这一块不动，生成日期
    var repeat_date = new Date();
    var year = repeat_date.getFullYear();
    var month = repeat_date.getMonth() + 1;
    var day = repeat_date.getDate();
    repeat_date = year.toString() + '/' + month.toString() + '/' + day.toString()
    console.log(new Date('2019-08-11'.replace(/-/g, "/")).getTime())
    repeat_date = new Date(repeat_date).getTime()
    console.log(repeat_date)
    console.log(app.globalData.freq)

    //word_frequence_5000中去除mots_deja_vu
    var mots_deja_vu = wx.getStorageSync('mots_deja_vu')
    let word_frequence_5000_word = []
    let mots_deja_vu_word = []
    for (let i = 0; i < word_frequence_5000.length;i++){
      word_frequence_5000_word.push(word_frequence_5000[i].learn_word)
    }
    for (let i = 0; i < mots_deja_vu.length; i++) {
      mots_deja_vu_word.push(mots_deja_vu[i].learn_word)
    }
    let a = word_frequence_5000_word
    let b = mots_deja_vu_word
    let intersection = a.filter(v => b.includes(v)) 
    let difference = a.concat(intersection).filter(v => !a.includes(v) || !intersection.includes(v))
    console.log(difference)   //这里的diffrence就是今天的新词范围。

    //如果第一个字符的日期不是当天的，生成新词
    var learn_word_new_today = app.globalData.learn_word_new_today
    var learn_word_new_today_no = app.globalData.learn_word_new_today_no
    if (learn_word_new_today[0] != repeat_date) {


      if (app.globalData.freq[0] == true) {
        var learn_word_new_today = [repeat_date];
        var learn_word_new_today_no = [];
        var i = 0;
        var word_frequence_5000 = app.globalData.word_frequence_5000
        while (i < app.globalData.freq_number) { //每天背多少词呢？
          var learn_no = Math.floor(Math.random() * (word_frequence_5000.length - 0 + 1) + 0);
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

        wx.setStorageSync('learn_word_new_today', learn_word_new_today)
        wx.setStorageSync('learn_word_new_today_no', learn_word_new_today_no)

        console.log(learn_word_new_today)
        console.log(learn_word_new_today_no)
        console.log(word_frequence_5000)
      } else if (app.globalData.freq[1] == true) {
        var learn_word_new_today = [repeat_date];
        var learn_word_new_today_no = [];
        var i = 0;
        var word_frequence_5000 = app.globalData.word_frequence_5000
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

        wx.setStorageSync('learn_word_new_today', learn_word_new_today)
        wx.setStorageSync('learn_word_new_today_no', learn_word_new_today_no)

        console.log(learn_word_new_today)
        console.log(learn_word_new_today_no)
        console.log(word_frequence_5000)
      } else if (app.globalData.freq[2] == true) {
        var learn_word_new_today = [repeat_date];
        var learn_word_new_today_no = [];
        var i = 0;
        var word_frequence_5000 = app.globalData.word_frequence_5000
        while (i < app.globalData.freq_number) {
          var learn_no = Math.floor(Math.random() * (4972 - 3001 + 1) + 3001);
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

    for (var i = 0; i < 1500; i++) {
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
    console.log(learn_word_new_today)
    console.log(learn_word_today)
    console.log(learn_word_today_no)
    console.log(review_word)
    console.log(today_all)

    wx.setStorageSync('learn_word_today', learn_word_today)
    wx.setStorageSync('review_word', review_word)
    wx.setStorageSync('already_word', already_word)
    wx.setStorageSync('learn_word_today_no', learn_word_today_no)
    wx.setStorageSync('word_frequence_5000', word_frequence_5000)

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
      dark_mode: dark_mode,
    })

  },

  difference: function(a, b) {
    var result = a.filter(function (v) { return b.indexOf(v) === -1 })
    return result;
  },

  intersect: function(a, b) {
    let set1 = new Set(a),
      set2 = new Set(b);
    return [...new Set([...set1].filter(x => set2.has(x)))];
  },

  new_user_data: function() {
    var verb_7300_fr = word_frequence;
    var word_frequence_5000 = [];
    for (var i = 0; i < verb_7300_fr.freq_1500.length; i++) {
      var learn_word = verb_7300_fr.freq_1500[i].word;
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

  //增加点击即查询
  choosed_answer: function(e) {
    var learn_word_new_today = wx.getStorageSync('learn_word_new_today')
    learn_word_new_today.splice(0, 1);
    var choosed_answer = learn_word_new_today[e.target.id];
    console.log(e.target.id);
    this.onQuery(choosed_answer);
  },

  onQuery_get_today_all_words: function() {
    var learn_word_today = wx.getStorageSync('learn_word_today')

    var that = this
    var learn_word_today_detail = []
    var i = 1

    function get_words() {
      const db = wx.cloud.database()
      const _ = db.command
      setTimeout(function() {
        db.collection('vocab_dic_larousse_20190807').where(_.or([{
          w_s: learn_word_today[i]
        }])).get({
          success: function(res) {
            learn_word_today_detail.push(res.data)
            console.log(learn_word_today_detail)
          },
          fail: function(res) {
            console.log(res)
          }
        })
        i++;
        if (i <= learn_word_today.length) {
          get_words();
        }
      }, 1000)
    }
    get_words();
    wx.setStorageSync('learn_word_today_detail', learn_word_today_detail);

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

  vocab_index_result: function() {
    wx.navigateTo({
      url: 'vocab_index_result',
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
      url: 'vocab_result',
    })
  },

  start_reverse: function() {
    wx.navigateTo({
      url: 'vocab_result_reverse',
    })
  },

  analyse: function() {
    wx.navigateTo({
      url: 'vocab_analyse',
    })
  },

  setting: function() {
    wx.switchTab({
      url: '../settings/settings',
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