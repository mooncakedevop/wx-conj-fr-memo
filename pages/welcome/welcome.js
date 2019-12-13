const app = getApp()

Page({
  data: {
    true_or_false: true,
    isChecked1: true,
    isChecked2: false,
    welcome_botton: '轻触继续学习'
  },

  onLoad: function() {
    var version = wx.getStorageSync('version')

    if (version == '') { //如果没有任何数据，那就代表是新用户
      wx.setStorageSync('carte_arrey', [{
        "carte_arrey": [0, 0, 123, 1, 84, 177, 203, 235, 261, 300, 325, 364, 388, 423, 447, 474],
        "likeandsave": [424]
      }])
      wx.setStorageSync('version', [{
        "version": "v3.3.0"
      }])
      wx.setStorageSync('settings_new', [{
        "dark_mode": false,
        "freq_number": 30,
        "freq": [true, false, false],
        "time_count": 10,
        "conj_type": [true, false, false, false, false],
        "time_type": [true, true, false]
      }])
    }

    if (version[0].version != "v3.3.0" && version != "v3.3.0") { //如果只是新版本的数据没有
      wx.setStorageSync('carte_arrey', [{
        "carte_arrey": [0, 0, 123, 1, 84, 177, 203, 235, 261, 300, 325, 364, 388, 423, 447, 474],
        "likeandsave": [424]
      }])
      wx.setStorageSync('version', [{
        "version": "v3.3.0"
      }]) //写入新版本的版本号
      wx.setStorageSync('settings_new', [{
        "dark_mode": false,
        "freq_number": 30,
        "freq": [true, false, false],
        "time_count": 10,
        "conj_type": [true, false, false, false, false],
        "time_type": [true, true, false]
      }])

      var settings_new = wx.getStorageSync('settings_new')
      var carte_arrey = wx.getStorageSync('carte_arrey')

      settings_new[0].freq_number = wx.getStorageSync('freq_number')
      settings_new[0].freq = wx.getStorageSync('freq')
      settings_new[0].time_count = wx.getStorageSync('time_count')
      settings_new[0].freq = wx.getStorageSync('freq')
      carte_arrey[0].likeandsave = wx.getStorageSync('likeandsave')

      wx.setStorageSync('settings_new', settings_new)
      wx.setStorageSync('carte_arrey', carte_arrey)

      wx.removeStorageSync('isChecked1')
      wx.removeStorageSync('isChecked1_selected')
      wx.removeStorageSync('isChecked1_50')
      wx.removeStorageSync('isChecked1_100')
      wx.removeStorageSync('isChecked1_230')
      wx.removeStorageSync('isChecked2')
      wx.removeStorageSync('isChecked3')
      wx.removeStorageSync('isChecked4')
      wx.removeStorageSync('likeandsave')
      wx.removeStorageSync('time_count')
      wx.removeStorageSync('freq')
      wx.removeStorageSync('freq_number')
      wx.removeStorageSync('newer')

      console.log(wx.getStorageSync('version'))
      console.log(wx.getStorageSync('settings_new'))
      console.log(wx.getStorageSync('carte_arrey'))
    }

    app.globalData.isChecked1 = wx.getStorageSync('isChecked1')

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