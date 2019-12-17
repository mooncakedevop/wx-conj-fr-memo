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

    learn_cx: [],
    learn_js_cn: [],
    learn_js_fr: [],
    learn_word_all: [],
    learn_lj: []
  },

  onLoad: function() {
    var consult_data_js = app.globalData.consult_data_js
    var learn_cx = consult_data_js[0].w_cx;
    var learn_js_cn = consult_data_js[0].w_js_cn;
    var learn_js_fr = consult_data_js[0].w_js_fr;
    var learn_lj_cn = consult_data_js[0].w_lj_cn;
    var learn_lj_fr = consult_data_js[0].w_lj_fr;
    var learn_word_all = consult_data_js[0].word;
    learn_lj_fr = learn_lj_fr.split(";");
    learn_lj_cn = learn_lj_cn.split(";");

    var learn_lj = [];
    for (var i = 0; i < learn_lj_fr.length; i++) {
      learn_lj.push(learn_lj_fr[i])
      learn_lj.push(learn_lj_cn[i])
    }
    learn_lj = learn_lj.join("\r\n")

    console.log(learn_lj)

    this.setData({
      learn_cx: learn_cx,
      learn_js_cn: learn_js_cn,
      learn_js_fr: learn_js_fr,
      learn_word_all: learn_word_all,
      learn_lj: learn_lj
    })

    this.setData({
      show_conj_je: app.globalData.shitai_je,
      show_conj_tu: app.globalData.shitai_tu,
      show_conj_il: app.globalData.shitai_il,
      show_conj_nous: app.globalData.shitai_nous,
      show_conj_vous: app.globalData.shitai_vous,
      show_conj_ils: app.globalData.shitai_ils,
      ow: app.globalData.ow,
      tag_classic: app.globalData.tag_classic,
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