const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')

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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.book_id == 0) {
      var verb_7300_fr = word_frequence;
    } else if (app.globalData.book_id == 1) {
      var verb_7300_fr = word_frequence;
    } else if (app.globalData.book_id == 2) {
      var verb_7300_fr = word_frequence;
    } else if (app.globalData.book_id == 3) {
      var verb_7300_fr = word_frequence;
    }

    var learn_word = app.globalData.learn_word;
    this.onQuery(learn_word);


    this.setData({
      learn_word: learn_word,
    })

  },

  onQuery: function (search_word) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters

    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      w_s: search_word
    }])).get({
      success: function (res) {
        console.log(res.data)
        app.globalData.consult_data = res.data;
        wx.setStorageSync('consult_data', res.data);
        var consult_data = app.globalData.consult_data;
        var learn_cx = consult_data[0].w_cx;
        var learn_js_cn = consult_data[0].w_js_cn;
        var learn_js_fr = consult_data[0].w_js_fr;
        var learn_lj_cn = consult_data[0].w_lj_cn;
        var learn_lj_fr = consult_data[0].w_lj_fr;
        var learn_word_all = consult_data[0].word;
        var learn_word_no = consult_data[0].w_no;

        that.setData({
          learn_cx: learn_cx,
          learn_js_cn: learn_js_cn,
          learn_js_fr: learn_js_fr,
          learn_lj_cn: learn_lj_cn,
          learn_lj_fr: learn_lj_fr,
          learn_word_all: learn_word_all,
          learn_word_no: learn_word_no,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  JNSP: function () {
    wx.redirectTo({
      url: 'vocab_learn',
    })
  },

  justSoSo: function () {
    wx.redirectTo({
      url: 'vocab_learn',
    })
  },

  bien_enregistre: function () {
    wx.redirectTo({
      url: 'vocab_learn',
    })
  },

  retour: function () {
    wx.redirectTo({
      url: '../index/index',
    })
    console.log("retour")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})