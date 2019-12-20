const app = getApp()

Page({
  data: {
    show_conj_je: [],
    show_conj_tu: [],
    show_conj_il: [],
    show_conj_nous: [],
    show_conj_vous: [],
    show_conj_ils: [],
    ow: [],
    tag_classic: true,
    tag_debutant: true,
    dark_mode: null,
  },

  onLoad: function() {
    var settings_new = wx.getStorageSync('settings_new');
    var dark_mode = settings_new[0].dark_mode;

    this.setData({
      show_conj_je: app.globalData.shitai_je,
      show_conj_tu: app.globalData.shitai_tu,
      show_conj_il: app.globalData.shitai_il,
      show_conj_nous: app.globalData.shitai_nous,
      show_conj_vous: app.globalData.shitai_vous,
      show_conj_ils: app.globalData.shitai_ils,
      ow: app.globalData.ow,
      tag_classic: app.globalData.tag_classic,
      dark_mode: dark_mode,
    })
  },

  backto: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  liju: function() {
    var search_word = app.globalData.ow;
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      w_s: search_word
    }])).get({
      success: function(res) {
        console.log(res.data)
        app.globalData.consult_data = res.data;
        wx.setStorageSync('consult_data', res.data);
        wx.navigateTo({
          url: '../../vocab/vocab_index_result',
        })
      }
    })
  },

  onShareAppMessage: function(res) {
    return {
      title: '法语动词变位查询利器！快来看看吧😁',
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