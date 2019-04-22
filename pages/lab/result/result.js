const app = getApp()

Page({
  data: {
    show_conj_je: [],
    show_conj_tu: [],
    show_conj_il: [],
    show_conj_nous: [],
    show_conj_vous: [],
    show_conj_ils: [],
    ow: [],
    tag_classic: true,
    tag_debutant: true,
  },

  onLoad: function() {
    this.setData({
      show_conj_je: app.globalData.shitai_je,
      show_conj_tu: app.globalData.shitai_tu,
      show_conj_il: app.globalData.shitai_il,
      show_conj_nous: app.globalData.shitai_nous,
      show_conj_vous: app.globalData.shitai_vous,
      show_conj_ils: app.globalData.shitai_ils,
      ow: app.globalData.ow,
      tag_classic: app.globalData.tag_classic,
      tag_debutant: app.globalData.tag_debutant,
    })
  }
})