const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('user_setting')
const picker = new Array('5', '10', '20', '30', '45', '60')
// 在页面中定义插屏广告
let interstitialAd = null

Page({

  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',

    index: null,
    picker: ['5', '10', '20', '30', '45', '60'],
    hidden_or_not: null,

    msg: null,
    dark_mode: null,
  },

  onLoad() {
    var settings_new = wx.getStorageSync('settings_new')
    app.globalData.openid = wx.getStorageSync('openid')

    this.onQuery_msg();

    this.setData({
      dark_mode: settings_new[0].dark_mode,
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

  dark_mode: function(e) {
    var settings_new = wx.getStorageSync('settings_new')
    if (e.detail.value == true) {
      settings_new[0].dark_mode = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      settings_new[0].dark_mode = false;
      wx.setStorageSync('settings_new', settings_new)
    }

    this.setData({
      dark_mode: settings_new[0].dark_mode,
    })
    this.successToast();

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },

  onQuery_msg: function(search_word) {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('setting_msg').get({
      success: function(res) {
        console.log(res.data)
        app.globalData.msg_data = res.data;
        that.setData({
          msg: res.data[0].msg,
        })
      }
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