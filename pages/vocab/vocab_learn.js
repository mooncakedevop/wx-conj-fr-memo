const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')

Page({

  data: {
    learn_word: null,
    learn_example: null,
    learn_lj: null,
    learn_level: null,
  },

  onLoad: function(options) {
    var word_frequence_5000 = wx.getStorageSync('word_frequence_5000');
    var learn_word_today = wx.getStorageSync('learn_word_today')
    var learn_word_today_no = wx.getStorageSync('learn_word_today_no')
    var idx = learn_word_today.length //对应范围的单词序号，每本词汇书一个js文件

    console.log(learn_word_today)
    console.log(learn_word_today_no)

    var learn_no = (Math.floor(Math.random() * (idx - 2 + 1) + 1)) //从单词总数中抽取号码
    console.log(learn_no)

    if (learn_word_today.length == 1) {
      this.success();
    }

    var learn_word = learn_word_today[learn_no];
    var learn_word_no = learn_word_today_no[learn_no - 1];
    var learn_level = word_frequence_5000[learn_word_no].level;
    var learn_lj = '点击查看例句提示'

    app.globalData.learn_word = learn_word

    console.log(app.globalData.learn_word)
    console.log(learn_level)
    console.log(learn_word_no)

    this.setData({
      learn_word: learn_word,
      learn_lj: learn_lj,
      learn_level: learn_level
    })

    wx.setStorageSync("consult_data", null) //将consult_data重置后再去查询，避免显示上一次的数据
    this.onQuery(learn_word);

    wx.showToast({
      title: 'Chargement😍',
      icon: 'none',
      duration: 1500,
      mask: true,
    })
  },

  success: function() {
    wx.redirectTo({
      url: '../vocab/vocab_success',
    })
  },

  todate: function() {

  },

  fromdate: function() {

  },

  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onQuery: function(search_word) {

    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      w_s: search_word
    }])).get({
      success: function(res) {
        console.log(res.data)
        wx.setStorageSync('consult_data', res.data);
      }
    })
  },

  hint: function() {
    var consult_data = wx.getStorageSync('consult_data')


    if (consult_data != null) {
      var learn_lj_fr = consult_data[0].w_lj_fr;
      learn_lj_fr = learn_lj_fr.split(";");
      var learn_lj = [];
      if (learn_lj_fr == '') {
        learn_lj.push("暂无例句")
      } else {
        for (var i = 0; i < learn_lj_fr.length; i++) {
          var learn_objet = {
            list: " ",
            fr: " "
          };
          learn_objet.list = i + 1
          learn_objet.fr = learn_lj_fr[i]
          learn_lj.push(learn_objet)
        }
      }
      console.log(learn_lj)
      this.setData({
        learn_lj: learn_lj
      })
    } else {
      wx.showToast({
        title: '请检查网络或稍等😥',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
    }
  },


  result: function() {
    var consult_data = wx.getStorageSync('consult_data')
    if (consult_data != null) {
      wx.redirectTo({
        url: '../vocab/vocab_result',
      })
    } else {
      wx.showToast({
        title: '请检查网络或稍等😥',
        icon: 'none',
        duration: 1000,
        mask: true,
      })
    }
  },

  onShareAppMessage: function(res) {
    return {
      title: '搞定法语背单词就靠它了！😱',
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