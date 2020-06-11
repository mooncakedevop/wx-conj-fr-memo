const app = getApp()
const picker = ['10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60']
const word_frequence = require('../../data/word_frequence.js')
// 在页面中定义插屏广告
let interstitialAd = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    freq_number: app.globalData.freq_number,
    freq_1500: null,
    freq_3000: null,
    freq_5000: null,
    picker: ['10', '15', '20', '25', '30', '35', '40', '45', '50', '55', '60'],
    dark_mode: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var settings_new = wx.getStorageSync('settings_new')

    app.globalData.freq = settings_new[0].freq
    app.globalData.freq_number = settings_new[0].freq_number
    
    var freq = app.globalData.freq

    this.setData({
      freq_number: app.globalData.freq_number,
      dark_mode: settings_new[0].dark_mode,
      freq_1500: freq[0],
      freq_3000: freq[1],
      freq_5000: freq[2],
    })

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-e563df22798519aa'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }

  },

  freq_1500: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.freq = [true, false, false];
      settings_new[0].freq = app.globalData.freq;
      wx.setStorageSync('settings_new', settings_new)
      wx.setStorageSync('learn_word_new_today', null);
    } else {
      app.globalData.freq = [false, true, false];
      settings_new[0].freq = app.globalData.freq;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  freq_3000: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.freq = [false, true, false];
      settings_new[0].freq = app.globalData.freq;
      wx.setStorageSync('settings_new', settings_new)
      wx.setStorageSync('learn_word_new_today', null);
    } else {
      app.globalData.freq = [false, false, true];
      settings_new[0].freq = app.globalData.freq;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  freq_5000: function(e) {
    var settings_new = wx.getStorageSync('settings_new');
    if (e.detail.value == true) {
      app.globalData.freq = [false, false, true];
      settings_new[0].freq = app.globalData.freq;
      wx.setStorageSync('settings_new', settings_new)
      wx.setStorageSync('learn_word_new_today', null);
    } else {
      app.globalData.freq = [true, false, false];
      settings_new[0].freq = app.globalData.freq;
      wx.setStorageSync('settings_new', settings_new)
    }
    this.successToast();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  new_user_data: function(options) {
    var repeat_date = new Date();
    var year = repeat_date.getFullYear();
    var month = repeat_date.getMonth() + 1;
    var day = repeat_date.getDate();
    repeat_date = year.toString() + '/' + month.toString() + '/' + day.toString()
    console.log(new Date('2019-08-11'.replace(/-/g, "/")).getTime())
    repeat_date = new Date(repeat_date).getTime()

    if (app.globalData.freq[0] == true) {
      var verb_7300_fr = word_frequence;
      var word_frequence_1500 = [];
      for (var i = 0; i < 1500; i++) {
        var learn_word = verb_7300_fr.verb_7300_fr[i].word;
        var learn_word_new = {
          learn_word: learn_word,
          date: repeat_date,
          level: 0
        };
        word_frequence_1500.push(learn_word_new)
      }
      app.globalData.word_frequence_1500 = word_frequence_1500
      console.log(word_frequence_1500)
    } else if (app.globalData.freq[1] == true) {
      var verb_7300_fr = word_frequence;
      var word_frequence_3000 = [];
      for (var i = 1501; i < 3000; i++) {
        var learn_word = verb_7300_fr.verb_7300_fr[i].word;
        var learn_word_new = {
          learn_word: learn_word,
          date: repeat_date,
          level: 0
        };
        word_frequence_3000.push(learn_word_new)
      }
      app.globalData.word_frequence_3000 = word_frequence_3000
      console.log(word_frequence_3000)
    } else if (app.globalData.freq[2] == true) {
      var verb_7300_fr = word_frequence;
      var word_frequence_5000 = [];
      for (var i = 3001; i < 5000; i++) {
        var learn_word = verb_7300_fr.verb_7300_fr[i].word;
        var learn_word_new = {
          learn_word: learn_word,
          date: repeat_date,
          level: 0
        };
        word_frequence_5000.push(learn_word_new)
      }
      app.globalData.word_frequence_5000 = word_frequence_5000
      console.log(word_frequence_5000)
    }
  },

  settings: function() {
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
    wx.navigateBack({
      delta: 1
    })
  },

  successToast: function() {
    wx.showToast({
      title: '设置已保存',
      icon: 'sucess',
      duration: 1000,
      mask: true,
    })

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },

  PickerChange(e) { //用来选
    console.log(e);
    var index = e.detail.value;
    var index = parseInt(index)
    var freq_number = picker[index]
    var freq_number = parseInt(freq_number)
    var settings_new = wx.getStorageSync('settings_new')
    console.log(index);
    console.log(freq_number);

    app.globalData.freq_number = freq_number;
    settings_new[0].freq_number = freq_number;
    wx.setStorageSync('settings_new', settings_new)
    wx.setStorageSync('learn_word_new_today', null);

    this.setData({
      index: e.detail.value,
      freq_number: freq_number,
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  onShareAppMessage: function(res) {
    return {
      title: '搞定法语背单词就靠它了！😱',
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