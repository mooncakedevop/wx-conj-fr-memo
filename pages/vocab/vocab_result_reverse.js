const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')
const date_review = new Array(0, 1, 3, 5, 7, 14, 30, 60)
// 在页面中定义插屏广告
let interstitialAd = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus: true,
    disable_btn: true,
    cursor: null,
    learn_word: app.globalData.learn_word,
    learn_word_cx: null,
    learn_word_all: null,
    learn_word_no: null,
    learn_lj: null,
    learn_js: null,
    dark_mode: null,

    learn_word: null,
    learn_example: null,
    learn_level: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setStorageSync("consult_data", null)
    var word_frequence_5000 = wx.getStorageSync('word_frequence_5000');
    var learn_word_today = wx.getStorageSync('learn_word_today')
    var learn_word_today_no = wx.getStorageSync('learn_word_today_no')
    var idx = learn_word_today.length //对应范围的单词序号，每本词汇书一个js文件

    var settings_new = wx.getStorageSync('settings_new');
    var dark_mode = settings_new[0].dark_mode;

    console.log(learn_word_today)
    console.log(learn_word_today_no)

    var learn_no = (Math.floor(Math.random() * (idx - 2 + 1) + 1)) //从单词总数中抽取号码
    console.log(learn_no)

    if (learn_word_today.length == 1) {
      this.success();
    }

    var learn_word = learn_word_today[learn_no];
    var learn_word_no = learn_word_today_no[learn_no - 1];
    var learn_level = word_frequence_5000[learn_word_no].level;

    var learn_js = '点击查看法汉双解提示'
    var learn_lj = '点击查看例句提示'

    app.globalData.learn_word = learn_word

    console.log(app.globalData.learn_word)
    console.log(learn_level)
    console.log(learn_word_no)

    this.onQuery(learn_word);

    wx.showToast({
      title: 'Chargement😍',
      icon: 'none',
      duration: 1500,
      mask: true,
    })

    this.setData({
      learn_word: learn_word,
      learn_level: learn_level,
      dark_mode: dark_mode,
    })

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-e563df22798519aa'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
  },

  input_word: function (e) {
    console.log(e);
    var input_word = e.detail.value.toLowerCase();
    this.setData({
      input_word: input_word,
    })
    console.log(input_word);
  },

  special_fr: function (e) {
    console.log(e.currentTarget.id);
    var input_word = this.data.input_word;
    var input_word = input_word.concat(e.currentTarget.id)
    var cursor = 100;

    console.log(input_word);

    this.setData({
      input_word: input_word,
      focus: true,
      cursor: cursor
    })
  },

  bindblur: function () {
    this.setData({
      disable_btn: false,
    })
  },

  bindfocus: function () {
    this.setData({
      disable_btn: true,
    })
  },

  search: function () {
    var search_word = this.data.input_word;
    if (search_word == app.globalData.learn_word) {
      wx.showToast({
        title: '答对了',
        image: '/style/paper-plane.png',
        icon: 'sucess',
        duration: 1000,
        mask: true,
      })
      return;
    }else{
      wx.showToast({
        title: '答错了',
        image: '/style/paper-plane.png',
        icon: 'sucess',
        duration: 1000,
        mask: true,
      })
    }

  },

  onQuery: function (search_word) {
    var that = this;
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      w_s: search_word
    }])).get({
      success: function (res) {
        console.log(res.data)
        var consult_data = res.data;

        if (consult_data.length == 0) {
          consult_data = "kong";
          wx.showModal({
            title: '当前单词未收录😥请反馈',
            content: '未收录单词为：' + '\r\n' + app.globalData.learn_word + '\r\n' + '请点击“确认”后继续。' + '\r\n' + '您可以在“个性化”页面中进行反馈，感谢支持。🤣',
          })
          this.bien_enregistre()
        }

        var learn_cx = consult_data[0].w_cx;
        var learn_word_all = consult_data[0].word;

        learn_cx = learn_cx.split(";");
        learn_word_all = learn_word_all.split(";");

        console.log(consult_data[0].w_cx)
        console.log(learn_word_all)
        var learn_word_cx = [] //第0格
        for (var i = 0; i < learn_word_all.length; i++) {
          var learn_word_cx_objet = {
            list: " ",
            word: " ",
            cx: " "
          };
          learn_word_cx_objet.list = i + 1
          learn_word_cx_objet.word = learn_word_all[i]
          learn_word_cx_objet.cx = learn_cx[i]
          learn_word_cx.push(learn_word_cx_objet)
        }

        console.log(learn_word_cx)

        app.globalData.learn_word_cx = learn_word_cx;

        var learn_lj = "点击查看双语例句";

        //获得learn_js
        var learn_js_cn = consult_data[0].w_js_cn;
        var learn_js_fr = consult_data[0].w_js_fr;
        var learn_word_all = consult_data[0].word;
        learn_js_cn = learn_js_cn.split(";");
        learn_js_fr = learn_js_fr.split(";");
        learn_word_all = learn_word_all.split(";");
        var learn_js = [] //第1格
        for (var i = 0; i < learn_js_cn.length; i++) {
          var learn_js_objet = {
            list: " ",
            js_cn: " ",
            js_fr: " "
          };
          learn_js_objet.list = i + 1
          learn_js_objet.js_cn = learn_js_cn[i]
          learn_js_objet.js_fr = learn_js_fr[i]
          learn_js.push(learn_js_objet)
        }
        app.globalData.learn_js = learn_js;

        that.setData({
          learn_word_cx: learn_word_cx,
          learn_js: learn_js,
          learn_lj: learn_lj,
        })

        console.log(consult_data)
        app.globalData.consult_data = consult_data;
        wx.setStorageSync('consult_data', res.data);
      }
    })

  },



  success: function () {
    wx.redirectTo({
      url: '../vocab/vocab_success',
    })
  },

  JNSP: function () {
    //等级将为0，日期不变
    var word_frequence_5000 = wx.getStorageSync('word_frequence_5000');
    var learn_word_today = wx.getStorageSync('learn_word_today');
    var learn_word_today_no = wx.getStorageSync('learn_word_today_no');

    var learn_word = app.globalData.learn_word;
    var word_no = learn_word_today_no[learn_word_today.indexOf(learn_word) - 1]
    word_frequence_5000[word_no].level = 0

    wx.setStorageSync("word_frequence_5000", word_frequence_5000)

    this.renew()
  },

  justSoSo: function () {
    //等级保持不变，日期不变
    this.renew()
  },

  bien_enregistre: function () {
    //等级加1，日期根据实际情况加
    var word_frequence_5000 = wx.getStorageSync('word_frequence_5000');
    var learn_word_today = wx.getStorageSync('learn_word_today');
    var learn_word_today_no = wx.getStorageSync('learn_word_today_no');

    var learn_word = app.globalData.learn_word;
    var word_no = learn_word_today_no[learn_word_today.indexOf(learn_word) - 1]
    if (word_frequence_5000[word_no].level == 7) {
      word_frequence_5000[word_no].date = 9000000000000
    } else {
      word_frequence_5000[word_no].level = word_frequence_5000[word_no].level + 1; //等级加一
      word_frequence_5000[word_no].date = word_frequence_5000[word_no].date + 86400000 * date_review[word_frequence_5000[word_no].level] //时间加指定
    }
    wx.setStorageSync("word_frequence_5000", word_frequence_5000)

    this.renew()
  },

  trop_facile: function () {
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
    var that = this
    wx.showModal({
      title: '提示',
      content: '😕“标记为简单”在此版本中无法撤销，确定标记？',
      success: function (res) {
        if (res.confirm) {
          //等级加1，日期根据实际情况加
          var word_frequence_5000 = wx.getStorageSync('word_frequence_5000');
          var learn_word_today = wx.getStorageSync('learn_word_today');
          var learn_word_today_no = wx.getStorageSync('learn_word_today_no');

          var learn_word = app.globalData.learn_word;
          var word_no = learn_word_today_no[learn_word_today.indexOf(learn_word) - 1]
          console.log(word_no)
          console.log(learn_word)
          if (word_frequence_5000[word_no].level == 7) {
            word_frequence_5000[word_no].date = 9000000000000
          } else {
            word_frequence_5000[word_no].level = 7; //等级变7
            word_frequence_5000[word_no].date = word_frequence_5000[word_no].date + 86400000 * date_review[word_frequence_5000[word_no].level] //时间加指定
          }
          wx.setStorageSync("word_frequence_5000", word_frequence_5000)
          wx.setStorageSync("consult_data", null)

          that.renew()

          wx.showToast({
            title: '已标记为简单👌',
            icon: 'none',
            duration: 1500,
            mask: true,
          })

          setTimeout(function () {

          }, 1500);
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })

  },

  renew: function () {
    var repeat_date = new Date();
    var year = repeat_date.getFullYear();
    var month = repeat_date.getMonth() + 1;
    var day = repeat_date.getDate();
    repeat_date = year.toString() + '/' + month.toString() + '/' + day.toString()
    repeat_date = new Date(repeat_date).getTime()
    console.log(repeat_date)

    var word_frequence_5000 = wx.getStorageSync('word_frequence_5000');
    console.log(repeat_date)
    var learn_word_today = [repeat_date];
    var learn_word_today_no = [];
    for (var i = 0; i < 4972; i++) {
      if (word_frequence_5000[i].date == repeat_date) {
        learn_word_today.push(word_frequence_5000[i].learn_word)
        learn_word_today_no.push(i)
        console.log(word_frequence_5000[i].learn_word)
      }
    }

    console.log(learn_word_today)
    wx.setStorageSync("consult_data", null)
    wx.setStorageSync("learn_word_today", learn_word_today)
    wx.setStorageSync("learn_word_today_no", learn_word_today_no)
    app.globalData.vocal = null;

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },

  hint_lj: function () {
    var consult_data = wx.getStorageSync('consult_data');
    var learn_lj_cn = consult_data[0].w_lj_cn;
    var learn_lj_fr = consult_data[0].w_lj_fr;
    var learn_word_all = consult_data[0].word;

    learn_lj_cn = learn_lj_cn.split(";");
    learn_lj_fr = learn_lj_fr.split(";");
    learn_word_all = learn_word_all.split(";");

    var learn_lj = [] //第2格
    for (var i = 0; i < learn_lj_cn.length; i++) {
      var learn_lj_objet = {
        list: " ",
        lj_cn: " ",
        lj_fr: " "
      };
      learn_lj_objet.list = i + 1
      learn_lj_objet.lj_cn = learn_lj_cn[i]
      learn_lj_objet.lj_fr = learn_lj_fr[i]
      learn_lj.push(learn_lj_objet)
    }

    app.globalData.learn_lj = learn_lj;
    console.log(learn_lj)

    this.setData({
      learn_lj: learn_lj,
    })
  },


  real_vocal: function () {
    if (app.globalData.vocal == null) {

      wx.showToast({
        title: '等一下下🛸',
        icon: 'none',
        duration: 2000,
        mask: true,
      })

      var learn_word = app.globalData.learn_word;
      const audio = wx.createInnerAudioContext()
      wx.cloud.downloadFile({
        fileID: "cloud://conj-helper-96fe10.636f-conj-helper-96fe10-1258914721/vocale/pronunciation_fr_" + learn_word + ".mp3", // 文件 ID
        success: res => {
          // 返回临时文件路径
          app.globalData.vocal = res.tempFilePath
          console.log(res.tempFilePath)
          audio.src = app.globalData.vocal
          audio.play()
        },
        fail: console.error
      })
    } else {
      const audio = wx.createInnerAudioContext()
      audio.src = app.globalData.vocal
      audio.play()
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '搞定法语背单词就靠它了！😱',
      path: 'pages/welcome/welcome',
      imageUrl: '',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function (res) {
        // 不管成功失败都会执行
      }
    }
  }
})