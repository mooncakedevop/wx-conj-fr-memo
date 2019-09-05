const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')
const date_review = new Array(0, 1, 3, 5, 7, 14, 30, 60)

Page({

  /**
   * 页面的初始数据
   */
  data: {
    learn_word: app.globalData.learn_word,
    learn_cx: null,
    learn_js_cn: null,
    learn_js_fr: null,
    learn_lj_cn: null,
    learn_lj_fr: null,
    learn_word_all: null,
    learn_word_no: null,
    learn_word_cx: null,
    learn_lj: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var learn_word = app.globalData.learn_word;
    var consult_data = app.globalData.consult_data;
    var learn_cx = consult_data[0].w_cx;
    var learn_js_cn = consult_data[0].w_js_cn;
    var learn_js_fr = consult_data[0].w_js_fr;
    var learn_lj_cn = consult_data[0].w_lj_cn;
    var learn_lj_fr = consult_data[0].w_lj_fr;
    var learn_word_all = consult_data[0].word;
    var learn_word_no = consult_data[0].w_no;



    learn_word_all = learn_word_all.split(";");
    learn_cx = learn_cx.split(";");
    var learn_word_cx = [];
    for (var i = 0; i < learn_word_all.length; i++) {
      learn_word_cx.push(i + 1)
      learn_word_cx.push(". ")
      learn_word_cx.push(learn_word_all[i])
      learn_word_cx.push(learn_cx[i])
      learn_word_cx.push("\r\n")
    }
    learn_word_cx = learn_word_cx.join(" ")
    console.log(learn_word_cx)

    learn_lj_fr = learn_lj_fr.split(";");
    learn_lj_cn = learn_lj_cn.split(";");
    var learn_lj = [];
    if (learn_lj_fr == '') {
      learn_lj.push("暂无例句")
    } else {
      for (var i = 0; i < learn_lj_fr.length; i++) {
        learn_lj.push(i + 1)
        learn_lj.push(". ")
        learn_lj.push(learn_lj_fr[i])
        learn_lj.push(learn_lj_cn[i])
        learn_lj.push("\r\n")
      }
      learn_lj = learn_lj.join(" ")
      console.log(learn_lj)
    }

    this.setData({
      learn_word_cx: learn_word_cx,
      learn_lj: learn_lj,
      learn_word: learn_word,
      learn_cx: learn_cx,
      learn_js_cn: learn_js_cn,
      learn_js_fr: learn_js_fr,
      learn_lj_cn: learn_lj_cn,
      learn_lj_fr: learn_lj_fr,
      learn_word_all: learn_word_all,
      learn_word_no: learn_word_no,
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


  JNSP: function() {

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
    if (word_frequence_5000[word_no].level = 7) {
      word_frequence_5000[word_no].date = 9000000000000
    } else {
      word_frequence_5000[word_no].level = word_frequence_5000[word_no].level + 1; //等级加一
      word_frequence_5000[word_no].date = word_frequence_5000[word_no].date + 86400 * date_review[word_frequence_5000[word_no].level] //时间加指定
    }
    wx.setStorageSync("word_frequence_5000", word_frequence_5000)

    this.renew()


    wx.redirectTo({
      url: 'vocab_learn',
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

    wx.setStorageSync("learn_word_today", learn_word_today)
    wx.setStorageSync("learn_word_today_no", learn_word_today_no)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})