const db = wx.cloud.database() //初始化数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    learn_word: null,
    learn_cx: null,
    learn_js_cn: null,
    learn_js_fr: null,
    learn_lj_cn: null,
    learn_lj_fr: null,
    learn_word_all: null,
    learn_word_cx: null,
    learn_lj: null,
    dark_mode: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var settings_new = wx.getStorageSync('settings_new');
    var dark_mode = settings_new[0].dark_mode;
    
    var consult_data = wx.getStorageSync('consult_data');
    console.log(consult_data)
    var learn_word = consult_data[0].w_s;
    var learn_cx = consult_data[0].w_cx;
    var learn_js_cn = consult_data[0].w_js_cn;
    var learn_js_fr = consult_data[0].w_js_fr;
    var learn_lj_cn = consult_data[0].w_lj_cn;
    var learn_lj_fr = consult_data[0].w_lj_fr;
    var learn_word_all = consult_data[0].word;

    learn_cx = learn_cx.split(";");
    learn_js_cn = learn_js_cn.split(";");
    learn_js_fr = learn_js_fr.split(";");
    learn_lj_cn = learn_lj_cn.split(";");
    learn_lj_fr = learn_lj_fr.split(";");
    learn_word_all = learn_word_all.split(";");

    var learn_word_cx = []  //第二格
    for (var i = 0; i < learn_word_all.length; i++) {
      var learn_word_cx_objet = {
        list: " ",
        word: " ",
        cx: " "
      };
      learn_word_cx_objet.list = i + 1
      learn_word_cx_objet.word = learn_word_all[i]
      learn_word_cx_objet.cx = learn_cx[i]
      learn_word_cx.push(learn_word_cx_objet)
    }

    var learn_js = []  //第三格
    for (var i = 0; i < learn_js_cn.length; i++) {
      var learn_js_objet = {
        list: " ",
        js_cn: " ",
        js_fr: " "
      };
      learn_js_objet.list = i + 1
      learn_js_objet.js_cn = learn_js_cn[i]
      learn_js_objet.js_fr = learn_js_fr[i]
      learn_js.push(learn_js_objet)
    }

    var learn_lj = []  //第四格
    for (var i = 0; i < learn_lj_cn.length; i++) {
      var learn_lj_objet = {
        list: " ",
        lj_cn: " ",
        lj_fr: " "
      };
      learn_lj_objet.list = i + 1
      learn_lj_objet.lj_cn = learn_lj_cn[i]
      learn_lj_objet.lj_fr = learn_lj_fr[i]
      learn_lj.push(learn_lj_objet)
    }

    this.setData({
      learn_word: learn_word,
      learn_word_cx: learn_word_cx,
      learn_js: learn_js,
      learn_lj: learn_lj,
      dark_mode: dark_mode,
    })
  },

  vocab_index: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    return {
      title: '搞定法语背单词就靠它了！😱',
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