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
    learn_word: null,
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
  onLoad: function (options) {
    var consult_data = app.globalData.consult_data;
    var learn_word = consult_data[0].w_s;
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

  vocab_index: function () {
    wx.navigateBack({
      delta: 1
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