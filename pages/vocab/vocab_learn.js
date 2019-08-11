const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('vocab_dic_larousse_20190807')
const word_frequence = require('../../data/word_frequence.js')

Page({

  data: {
    learn_word: null,
    learn_example: null,
    learn_lj: null,
  },

  onLoad: function(options) {
    var repeat_date = new Date();
    var year = repeat_date.getFullYear();
    var month = repeat_date.getMonth()+1;
    var day = repeat_date.getDate();
    repeat_date = year.toString() +'/'+ month.toString() +'/'+ day.toString()
    console.log(new Date('2019-08-11'.replace(/-/g, "/")).getTime())
    repeat_date = new Date(repeat_date).getTime()

    if (app.globalData.freq[0] == true) {
      var verb_7300_fr = word_frequence;
      var learn_word_new_today = [];
      for (var i = 0; i < app.globalData.freq_number; i++) {
        var learn_no = Math.floor(Math.random() * (1500 - 0 + 1) + 0);
        var learn_word = verb_7300_fr.verb_7300_fr[learn_no].word;
        var learn_word_new = {
          learn_word: learn_word,
          date: repeat_date,
          level: 0
        };
        learn_word_new_today.push(learn_word_new)
      }

      console.log(learn_word_new_today)
    } else if (app.globalData.freq[1] == true) {
      var verb_7300_fr = word_frequence;
      var learn_no = Math.floor(Math.random() * (3000 - 1501 + 1) + 1501);
      console.log(learn_no)
    } else if (app.globalData.freq[2] == true) {
      var verb_7300_fr = word_frequence;
      var learn_no = Math.floor(Math.random() * (5000 - 3001 + 1) + 3001);
      console.log(learn_no)
    }

    //  var idx = verb_7300_fr.verb_7300_fr.length //对应范围的单词序号，每本词汇书一个js文件
    //var learn_no = (Math.floor(Math.random() * idx)) //从单词总数中抽取号码

    var learn_word = verb_7300_fr.verb_7300_fr[learn_no].word;
    var learn_word_no = verb_7300_fr.verb_7300_fr[learn_no].w_no;
    var learn_lj = '点击查看例句提示'

    app.globalData.learn_word = learn_word

    console.log(app.globalData.learn_word)

    this.setData({
      learn_word: learn_word,
      learn_word_no: learn_word_no,
      learn_lj: learn_lj
    })

    this.onQuery(learn_word);
    wx.showToast({
      title: '加载中🤷‍',
      icon: 'none',
      duration: 1500,
      mask: true,
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

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
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
        app.globalData.consult_data = res.data;
        wx.setStorageSync('consult_data', res.data);
      }
    })
  },

  hint: function() {
    var learn_lj_fr = app.globalData.consult_data[0].w_lj_fr;
    learn_lj_fr = learn_lj_fr.split(";");
    var learn_lj = [];
    if (learn_lj_fr == '') {
      learn_lj.push("暂无例句")
    } else {
      for (var i = 0; i < learn_lj_fr.length; i++) {
        learn_lj.push(i + 1)
        learn_lj.push(". ")
        learn_lj.push(learn_lj_fr[i])
        learn_lj.push("\r\n")
      }
      learn_lj = learn_lj.join(" ")
      console.log(learn_lj)
    }

    console.log(learn_lj)
    this.setData({
      learn_lj: learn_lj
    })
  },


  result: function() {
    wx.redirectTo({
      url: '../vocab/vocab_result',
    })
  },

  onShareAppMessage: function() {

  }
})