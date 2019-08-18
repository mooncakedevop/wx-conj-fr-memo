const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')

Page({

  data: {
    learn_word: null,
    learn_example: null,
    learn_lj: null,
  },

  onLoad: function(options) {

    var learn_word_today = wx.getStorageSync('learn_word_today')
    var learn_word_today_no = wx.getStorageSync('learn_word_today_no')
    var idx = learn_word_today.length //对应范围的单词序号，每本词汇书一个js文件
    var learn_no = (Math.floor(Math.random() * (idx - 2 + 1) + 1)) //从单词总数中抽取号码

    if (learn_word_today.length == 1) {
      this.success();
    }

    var learn_word = learn_word_today[learn_no];
    var learn_lj = '点击查看例句提示'

    app.globalData.learn_word = learn_word

    console.log(app.globalData.learn_word)

    this.setData({
      learn_word: learn_word,
      learn_lj: learn_lj
    })

    this.onQuery(learn_word);

    wx.showToast({
      title: '',
      icon: 'none',
      duration: 1500,
      mask: true,
    })
  },

  success: function() {
    wx.redirectTo({
      url: '../vocab/vocab_success',
    })
  },

  todate: function() {

  },

  fromdate: function() {

  },

  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onQuery: function(search_word) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters

    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      w_s: search_word
    }])).get({
      success: function(res) {
        console.log(res.data)
        app.globalData.consult_data = res.data;
        wx.setStorageSync('consult_data', res.data);
      }
    })
  },

  hint: function() {
    var learn_lj_fr = app.globalData.consult_data[0].w_lj_fr;
    learn_lj_fr = learn_lj_fr.split(";");
    var learn_lj = [];
    if (learn_lj_fr == '') {
      learn_lj.push("暂无例句")
    } else {
      for (var i = 0; i < learn_lj_fr.length; i++) {
        learn_lj.push(i + 1)
        learn_lj.push(". ")
        learn_lj.push(learn_lj_fr[i])
        learn_lj.push("\r\n")
      }
      learn_lj = learn_lj.join(" ")
      console.log(learn_lj)
    }

    console.log(learn_lj)
    this.setData({
      learn_lj: learn_lj
    })
  },


  result: function() {
    wx.redirectTo({
      url: '../vocab/vocab_result',
    })
  },

  onShareAppMessage: function() {

  }
})