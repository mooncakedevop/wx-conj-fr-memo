const app = getApp()


Page({
  data: {
    true_or_false: true,
    isChecked1: true,
    isChecked2: false,
    welcome_botton: '轻触继续学习'
  },

  onLoad: function() {
    app.globalData.newer = wx.getStorageSync('newer')
    app.globalData.version = wx.getStorageSync('version')
    console.log(app.globalData.version)

    if (app.globalData.newer == '' && app.globalData.version == '') { //如果没有任何数据，那就代表是新用户
      wx.setStorageSync('isChecked1_50', true) //写下用户的第一个数据
      wx.setStorageSync('carte_arrey', [0, 0, 123, 1, 84, 177, 203, 235, 261, 300, 325, 364, 388, 423, 447, 474]) //写下用户的第一个数据
      wx.setStorageSync('newer', true)
      wx.setStorageSync('version', "v3.1.0") //写入新版本的版本号
      wx.setStorageSync('likeandsave', []) //写下用户的第一个数据
      wx.setStorageSync('time_count', 10)
      wx.setStorageSync("hidden_or_not", false)
      wx.setStorageSync('freq', [true, false, false])
      wx.setStorageSync('freq_number', "30")
    }

    if (app.globalData.version != "v3.1.0") { //如果只是新版本的数据没有
      wx.setStorageSync('version', "v3.1.0") //写入新版本的版本
      wx.setStorageSync("hidden_or_not", false)
    }

    app.globalData.isChecked1 = wx.getStorageSync('isChecked1')
    app.globalData.isChecked1_selected = wx.getStorageSync('isChecked1_selected')
    app.globalData.isChecked1_50 = wx.getStorageSync('isChecked1_50')
    app.globalData.isChecked1_100 = wx.getStorageSync('isChecked1_100')
    app.globalData.isChecked1_230 = wx.getStorageSync('isChecked1_230')
    app.globalData.isChecked2 = wx.getStorageSync('isChecked2')
    app.globalData.isChecked3 = wx.getStorageSync('isChecked3')
    app.globalData.isChecked4 = wx.getStorageSync('isChecked4')
    app.globalData.carte_arrey = wx.getStorageSync('carte_arrey')
    app.globalData.likeandsave = wx.getStorageSync('likeandsave')
    app.globalData.time_count = wx.getStorageSync('time_count')
    app.globalData.freq = wx.getStorageSync('freq')
    app.globalData.freq_number = wx.getStorageSync('freq_number')

    if (app.globalData.isChecked2 == true) {
      app.globalData.advanced_shitai = [2, 3, 7];
    } else {
      app.globalData.advanced_shitai = [];
    }

    if (app.globalData.isChecked3 == true) {
      app.globalData.extra_shitai = [8, 9, 10, 11];
    } else {
      app.globalData.extra_shitai = [];
    }

    if (app.globalData.isChecked4 == true) {
      app.globalData.inusuel_shitai = [4, 5];
    } else {
      app.globalData.inusuel_shitai = [];
    }

    this.setData({
      true_or_false: false
    })

  },

  vocab_index: function() {
    wx.switchTab({
      url: '../vocab/vocab_index',
    })
  },

  intro: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  searcher: function() {
    wx.switchTab({
      url: '../lab/lab',
    })
  },

  training: function() {
    wx.navigateTo({
      url: '../carte/milestone',
    })
  },

  settings: function() {
    wx.switchTab({
      url: '../settings/settings',
    })
  },

  onShareAppMessage: function(res) {
    return {
      title: '搞定法语记忆很轻松😘戳这里',
      path: 'pages/welcome/welcome',
      imageUrl: '',
      success: function(shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function(res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function(res) {
        // 不管成功失败都会执行
      }
    }
  }

})