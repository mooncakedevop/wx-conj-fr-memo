// pages/settings/help/more.js
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
    copy: function () {
      var self = this;
      wx.setClipboardData({
        data: "https://hxd.red/conj-helper",
        success: function (res) {
          wx.showModal({
            title: '提示',
            content: '✨复制成功✨请粘贴到浏览器访问',
            success: function (res) {
              if (res.confirm) {
                console.log('确定')
              } else if (res.cancel) {
                console.log('取消')
              }
            }
          })
        }
      });
    }
  }
})
