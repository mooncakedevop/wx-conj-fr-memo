// pages/settings/help/help.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    onShareAppMessage: function(res) {
      return {
        title: '有它!再也不用自己作决定了！😱',
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
    },


    copy: function() {
      var self = this;
      wx.setClipboardData({
        data: "https://uniquelab.cn/conj-helper",
        success: function(res) {
          wx.showModal({
            title: '提示',
            content: '✨复制成功✨请粘贴到浏览器访问',
            success: function(res) {
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

  }


})