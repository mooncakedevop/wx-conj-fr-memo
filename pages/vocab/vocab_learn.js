
const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')

Page({

  data: {
    learn_word: null,
    learn_example: null,
  },

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

    var idx = verb_7300_fr.verb_7300_fr.length    //对应范围的单词序号，每本词汇书一个js文件
    console.log(idx)
    var learn_no = (Math.floor(Math.random() * idx)) //从单词总数中抽取号码


    var learn_word = verb_7300_fr.verb_7300_fr[learn_no].word;
    var learn_word_no = verb_7300_fr.verb_7300_fr[learn_no].w_no;

    app.globalData.learn_word = learn_word

    console.log(app.globalData.learn_word)

    this.setData({
      learn_word: learn_word,
      learn_word_no: learn_word_no
    })

  },


  onReady: function () {

  },

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

  onQuery: function (search_word) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters

    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      ow: search_word
    }])).get({
      success: function (res) {
        console.log(res.data)
        app.globalData.consult_data = res.data;
        wx.setStorageSync('consult_data', res.data);
        that.exp();
      }
    })
  },


  result: function () {
    wx.redirectTo({
      url: '../vocab/vocab_result',
    })
  },

  onShareAppMessage: function () {

  }
})