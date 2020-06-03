// pages/settings/help/help.js
Page({

  data: {
    dark_mode: null,
  },
  
  onLoad() {
    var settings_new = wx.getStorageSync('settings_new')

    this.setData({
      dark_mode: settings_new[0].dark_mode,
    })
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