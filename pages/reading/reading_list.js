const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('user_setting')
// 在页面中定义插屏广告
let interstitialAd = null

Page({
  data: {
    article_detail_info: null,
    dark_mode: null,
  },

  onLoad() {
    var settings_new = wx.getStorageSync('settings_new');
    this.onQuery_article('newest');

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

  onQuery_article: function (listType) {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command

    if (listType == "random") {
      db.collection('reading_articles')
        .aggregate()
        .sample({
          size: 5
        })
        .end().then(res => {
            console.log(res.list)
            wx.setStorageSync('article_detail_info', res.list);
            that.setData({
              article_detail_info: res.list,
            })
            wx.showToast({
              title: '更新完成',
              duration: 1500,
              mask: true,
            })
          }
        )
    }

    if (listType == "newest") {
      db.collection('reading_articles')
        .orderBy('articleid', 'desc')
        .limit(5)
        .get({
          success: function (res) {
            console.log(res.data)
            wx.setStorageSync('article_detail_info', res.data);
            that.setData({
              article_detail_info: res.data,
            })
            wx.showToast({
              title: '更新完成',
              duration: 1500,
              mask: true,
            })
          }
        })
    }
  },

  article_reading_page: function (e) {
    console.log(e);
    app.globalData.article_number = e.currentTarget.id;
    wx.navigateTo({
      url: 'reading',
    })
  },

  random_5: function (e) {
    this.onQuery_article('random');
  },

  newest_5: function (e) {
    this.onQuery_article('newest');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },

  onShareAppMessage: function (res) {
    return {
      title: '搞定法语动词变位就靠它了！😱',
      path: 'pages/welcome/welcome',
      imageUrl: '',
      success: function (shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function (res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function (res) {
        // 不管成功失败都会执行
      }
    }
  }
})