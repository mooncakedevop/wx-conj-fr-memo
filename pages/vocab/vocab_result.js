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
    learn_word: app.globalData.learn_word,
    learn_word_cx: null,
    learn_word_all: null,
    learn_word_no: null,
    learn_word_cx: null,
    learn_lj: null,
    learn_js: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var learn_word = app.globalData.learn_word;
    var consult_data = wx.getStorageSync('consult_data');
    console.log(consult_data)

    if (consult_data == "kong") {
      wx.showModal({
        title: '当前单词未收录😥请反馈',
        content: '未收录单词为：' + '\r\n' + app.globalData.learn_word + '\r\n' + '请点击“确认”后继续。' + '\r\n' + '您可以在“个性化”页面中进行反馈，感谢支持。🤣',
      })
      this.bien_enregistre()
    }

    var learn_cx = consult_data[0].w_cx;
    var learn_js_cn = consult_data[0].w_js_cn;
    var learn_js_fr = consult_data[0].w_js_fr;
    var learn_lj_cn = consult_data[0].w_lj_cn;
    var learn_lj_fr = consult_data[0].w_lj_fr;
    var learn_word_all = consult_data[0].word;
    var learn_word_no = consult_data[0].w_no;

    learn_cx = learn_cx.split(";");
    learn_js_cn = learn_js_cn.split(";");
    learn_js_fr = learn_js_fr.split(";");
    learn_lj_cn = learn_lj_cn.split(";");
    learn_lj_fr = learn_lj_fr.split(";");
    learn_word_all = learn_word_all.split(";");

    var learn_word_cx = [] //第二格
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

    var learn_js = [] //第三格
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

    var learn_lj = [] //第四格
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

    this.setData({
      learn_word: learn_word,
      learn_word_cx: learn_word_cx,
      learn_js: learn_js,
      learn_lj: learn_lj,
      learn_word_no: learn_word_no,
    })

    wx.setStorageSync("consult_data", null)

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-e563df22798519aa'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }
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

  JNSP: function() {
    //等级将为0，日期不变
    var word_frequence_5000 = wx.getStorageSync('word_frequence_5000');
    var learn_word_today = wx.getStorageSync('learn_word_today');
    var learn_word_today_no = wx.getStorageSync('learn_word_today_no');

    var learn_word = app.globalData.learn_word;
    var word_no = learn_word_today_no[learn_word_today.indexOf(learn_word) - 1]
    word_frequence_5000[word_no].level = 0

    wx.setStorageSync("word_frequence_5000", word_frequence_5000)

    this.renew()
    wx.redirectTo({
      url: 'vocab_learn',
    })
  },

  justSoSo: function() {
    //等级保持不变，日期不变

    this.renew()
    wx.redirectTo({
      url: 'vocab_learn',
    })
  },

  bien_enregistre: function() {
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


    wx.redirectTo({
      url: 'vocab_learn',
    })
  },

  trop_facile: function() {
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
      success: function(res) {
        if (res.confirm) {
          //等级加1，日期根据实际情况加
          var word_frequence_5000 = wx.getStorageSync('word_frequence_5000');
          var learn_word_today = wx.getStorageSync('learn_word_today');
          var learn_word_today_no = wx.getStorageSync('learn_word_today_no');

          var learn_word = app.globalData.learn_word;
          var word_no = learn_word_today_no[learn_word_today.indexOf(learn_word) - 1]
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

          setTimeout(function() {
            wx.redirectTo({
              url: 'vocab_learn',
            })
          }, 1500);
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })

  },


  renew: function() {
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
    for (var i = 0; i < 5000; i++) {
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
  },

  /**
   * 用户点击右上角分享
   */
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