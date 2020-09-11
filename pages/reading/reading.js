const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('user_setting')
// 在页面中定义插屏广告
let interstitialAd = null

Page({
  data: {
    title:null,
    author:null,
    summary:null,
    date:null,
    contents: null,
    dark_mode: null,
  },

  onLoad() {
    var settings_new = wx.getStorageSync('settings_new');
    this.onQuery_article();

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

  onQuery_article: function() {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('reading_articles').get({
      success: function(res) {
        console.log(res.data)
        that.setData({
          title: res.data[0].title,
          author: res.data[0].author,
          date: res.data[0].date,
          summary: res.data[0].summary,
          contents: res.data[0].contents,
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