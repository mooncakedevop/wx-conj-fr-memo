const app = getApp()

Page({
  data: {
    zhangwo: null,
    xin: null,
  },

  onLoad: function() {
    var carte_arrey = app.globalData.carte_arrey //从卡片历史进度中读取对应时态的历史进度

    var sum = 0;
    for (var i = 0; i < carte_arrey.length; i++) { //将答题数组的值全部累加减去最初的就是背完的
      var sum = carte_arrey[i] + sum
    }
    var zhangwo = sum - 3805;
    var xin = 535 - zhangwo;

    this.setData({
      zhangwo: zhangwo,
      xin: xin,
    })
  },

  allcards: function () {
    wx.navigateTo({
      url: 'list',
    })
  },

  allcards: function () {
    wx.navigateTo({
      url: 'list',
    })
  },

  myfavorite: function () {
    wx.navigateTo({
      url: 'list',
    })
  },

  xianzaifenci: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 15 //指定时态序号
  },

  zcs_present: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 3 //指定时态序号
  },

  zcs_passecomposee: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 2 //指定时态序号
  },

  zcs_imparfait: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 4 //指定时态序号
  },

  zcs_plusqueparfait: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 5 //指定时态序号
  },

  zcs_passesimple: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 6 //指定时态序号
  },

  zcs_passeanterieur: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 7 //指定时态序号
  },

  zcs_futur: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 8 //指定时态序号
  },

  zcs_futuranterieur: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 9 //指定时态序号
  },

  tjs_present: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 10 //指定时态序号
  },

  tjs_passe: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 11 //指定时态序号
  },
  xns_present: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 12 //指定时态序号
  },

  xns_passe: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 13 //指定时态序号
  },

  imperatif: function() {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 14 //指定时态序号
  },
})