// pages/settings/settings.js
const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('user_setting')
const picker = new Array('5', '10', '20', '30', '45', '60')
// 在页面中定义插屏广告
let interstitialAd = null

Page({

  data: {
    isChecked1: app.globalData.isChecked1,
    isChecked1_selected: app.globalData.isChecked1_selected,
    isChecked1_50: app.globalData.isChecked1_50,
    isChecked1_100: app.globalData.isChecked1_100,
    isChecked1_230: app.globalData.isChecked1_230,
    isChecked2: app.globalData.isChecked2, //进阶时态
    isChecked3: app.globalData.isChecked3, //高手时态
    isChecked4: app.globalData.isChecked4, //不常用时态

    index: null,
    time_count: null,
    picker: ['5', '10', '20', '30', '45', '60'],
    dark_mode: null,
  },

  onLoad() {
    var settings_new = wx.getStorageSync('settings_new')

    app.globalData.isChecked1 = settings_new[0].conj_type[0]
    app.globalData.isChecked1_selected = settings_new[0].conj_type[1]
    app.globalData.isChecked1_50 = settings_new[0].conj_type[2]
    app.globalData.isChecked1_100 = settings_new[0].conj_type[3]
    app.globalData.isChecked1_230 = settings_new[0].conj_type[4]

    app.globalData.isChecked2 = settings_new[0].time_type[0]
    app.globalData.isChecked3 = settings_new[0].time_type[1]
    app.globalData.isChecked4 = settings_new[0].time_type[2]

    app.globalData.time_count = settings_new[0].time_count

    this.setData({
      dark_mode: settings_new[0].dark_mode,
    })

    this.setData({
      isChecked1: app.globalData.isChecked1,
      isChecked1_selected: app.globalData.isChecked1_selected,
      isChecked1_50: app.globalData.isChecked1_50,
      isChecked1_100: app.globalData.isChecked1_100,
      isChecked1_230: app.globalData.isChecked1_230,
      isChecked2: app.globalData.isChecked2, //进阶时态
      isChecked3: app.globalData.isChecked3, //高手时态
      isChecked4: app.globalData.isChecked4, //不常用时态
      time_count: app.globalData.time_count
    })

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-e563df22798519aa'
      })
      interstitialAd.onLoad(() => { })
      interstitialAd.onError((err) => { })
      interstitialAd.onClose(() => { })
    }
  },

  extra_words: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.isChecked1 = true;
      settings_new[0].conj_type[0] = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      app.globalData.isChecked1 = false;
      settings_new[0].conj_type[0] = false;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  words_selected: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.isChecked1_selected = true;
      settings_new[0].conj_type[1] = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      app.globalData.isChecked1_selected = false;
      settings_new[0].conj_type[1] = false;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  words_50: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.isChecked1_50 = true;
      settings_new[0].conj_type[2] = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      app.globalData.isChecked1_50 = false;
      settings_new[0].conj_type[2] = false;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  words_100: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.isChecked1_100 = true;
      settings_new[0].conj_type[3] = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      app.globalData.isChecked1_100 = false;
      settings_new[0].conj_type[3] = false;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  words_230: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.isChecked1_230 = true;
      settings_new[0].conj_type[4] = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      app.globalData.isChecked1_230 = false;
      settings_new[0].conj_type[4] = false;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  advanced_shitai: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.advanced_shitai = [2, 7, 3];
      app.globalData.isChecked2 = true;
      settings_new[0].time_type[0] = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      app.globalData.advanced_shitai = [];
      app.globalData.isChecked2 = false;
      settings_new[0].time_type[0] = false;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
  },

  extra_shitai: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.extra_shitai = [10, 11, 8, 9];
      app.globalData.isChecked3 = true;
      settings_new[0].time_type[1] = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      app.globalData.extra_shitai = [];
      app.globalData.isChecked3 = false;
      settings_new[0].time_type[1] = false;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
  },

  inusuel_shitai: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.inusuel_shitai = [4, 5];
      app.globalData.isChecked4 = true;
      settings_new[0].time_type[2] = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      app.globalData.inusuel_shitai = [];
      app.globalData.isChecked4 = false;
      settings_new[0].time_type[2] = false;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
  },

  successToast: function() {
    wx.showToast({
      title: '设置已保存',
      icon: 'sucess',
      duration: 1000,
      mask: true,
    })
  },

  PickerChange(e) { //用来选时间
    console.log(e);

    var index = e.detail.value;
    var index = parseInt(index)
    var time_count = picker[index]
    var time_count = parseInt(time_count)
    var settings_new = wx.getStorageSync('settings_new')
    console.log(index);
    console.log(time_count);

    app.globalData.time_count = time_count;
    settings_new[0].time_count = time_count;
    wx.setStorageSync('settings_new', settings_new)

    this.setData({
      index: e.detail.value,
      time_count: time_count,
    })
  },

  settings: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  onShareAppMessage: function(res) {
    return {
      title: '搞定法语动词变位就靠它了！😱',
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