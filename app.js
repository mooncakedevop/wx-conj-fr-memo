//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

  },
  globalData: {
    userInfo: null,
    ow:null,

    newer: null,
    isChecked1: false,
    isChecked1_selected: false,
    isChecked1_50: true,
    isChecked1_100: false,
    isChecked1_230: false,

    isChecked2: null,
    isChecked3: null,
    isChecked4: null,
    true_or_false: true,
    advanced_shitai:[],
    extra_shitai:[],
    inusuel_shitai: [],
    shitai_je: [],
    shitai_tu: [],
    shitai_il: [],
    shitai_nous: [],
    shitai_vous: [],
    shitai_ils: [],
    tag_classic: true,
    tag_selected: true,
    tag_50: true,
    tag_100: true,
    tag_230: true,

    shitai_no: null,
    search_word: null,
    carte_number: null,
    carte_arrey: null
  }
})