// pages/settings/help/help.js
const app = getApp()
const db = wx.cloud.database() //初始化数据库
// 在页面中定义插屏广告
let interstitialAd = null

Page({

  data: {
    dark_mode: null,
  },

  onLoad() {
    var settings_new = wx.getStorageSync('settings_new')
    app.globalData.openid = wx.getStorageSync('openid')

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

  onShareAppMessage: function (res) {
    return {
      title: '有它!再也不用自己作决定了！😱',
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
  },

  backLastPage: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  remind: function (e) {

    wx.requestSubscribeMessage({
      tmplIds: ['rAL1dIT5XEigQKmW14Ulxw24couywZ6su6jNUhdVNn4'],
      success(res) {
        console.log(res)
        if (res.errMsg == "requestSubscribeMessage:ok") {
          console.log(app.globalData.openid)
          const db = wx.cloud.database()
          db.collection('subscribeMessages').where({
            touser: app.globalData.openid,
            done: false
          }).get({
            success: function (res) {
              console.log(res)

              if (res.data.length != 0) {
                wx.showToast({
                  title: '您已设置过',
                  icon: 'none',
                  duration: 1500
                })
              }

              if (res.data.length == 0) {
                wx.cloud.callFunction({
                  touser: app.globalData.openid,
                  name: "subscribe",
                  data: {},
                  success: function (res) {
                    console.log(res.result)
                    wx.showToast({
                      title: '设置成功',
                      icon: 'success',
                      duration: 1500
                    })
                  },
                  fail: console.error
                })
              }
            }
          });
        } else {
          wx.showToast({
            title: '设置失败',
            icon: 'none',
            duration: 1500
          })
        }
      }
    })

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },

  copy_current: function () {
    var self = this;
    wx.setClipboardData({
      data: "hxdred",
      success: function (res) {
        wx.showModal({
          title: '提示',
          content: '✨复制成功✨请粘贴到微信搜一搜',
          success: function (res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },
})