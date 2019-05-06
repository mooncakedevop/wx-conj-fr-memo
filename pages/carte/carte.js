//index.js
//获取应用实例
const app = getApp()
const verb = require('../../data/verb_7016_fr_20190330.js')
const classic = require('../../data/classic_149_fr_20190330.js')

Page({
  data: {
    input_word_conj: null,
    idx_shitai: null,
    shitai_chinois: null,

    show_conj_je: [],
    show_conj_tu: [],
    show_conj_il: [],
    show_conj_nous: [],
    show_conj_vous: [],
    show_conj_ils: [],
  },

  onLoad: function () {
    this.setData({
      show_conj_je: app.globalData.shitai_je,
      show_conj_tu: app.globalData.shitai_tu,
      show_conj_il: app.globalData.shitai_il,
      show_conj_nous: app.globalData.shitai_nous,
      show_conj_vous: app.globalData.shitai_vous,
      show_conj_ils: app.globalData.shitai_ils,
    })

    let that = this;
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500)
  },

  next: function () {

    wx.navigateBack({
      delta: 1
    })
    console.log("next")
  },

  onUnload: function () {
    // 页面关闭
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.onLoad()
  }
});