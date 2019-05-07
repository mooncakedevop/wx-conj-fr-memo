const app = getApp()

Page({
  data: {
    zhangwo:null,
  },

  onLoad: function () {
    var carte_arrey = app.globalData.carte_arrey   //从卡片历史进度中读取对应时态的历史进度

    console.log(carte_arrey)

    var sum = 0;
    for (var i = 0; i < carte_arrey.length; i++) {
      var sum = carte_arrey[i] + sum
    }

    console.log(sum)
    var zhangwo = sum - 3805;

    this.setData({
      zhangwo: zhangwo
    })
  },

  xianzaifenci: function () {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 15    //指定时态序号
  },

  zcs_present: function () {
    wx.navigateTo({
      url: 'question',
    })
    app.globalData.shitai_no = 3    //指定时态序号
  },


})