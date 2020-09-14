const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('user_setting')
// 在页面中定义插屏广告
let interstitialAd = null

Page({
  data: {
    article_detail:null,
    dark_mode: null,
  },

  onLoad() {
    var settings_new = wx.getStorageSync('settings_new');
    var article_all = wx.getStorageSync('article_detail_info');
    console.log(article_all);
    console.log(app.globalData.article_number);

    this.setData({
      dark_mode: settings_new[0].dark_mode,
      article_detail: article_all[app.globalData.article_number],
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
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