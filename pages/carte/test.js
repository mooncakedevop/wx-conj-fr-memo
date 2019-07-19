const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('conj_verb7016')
const classic = db.collection('conj_classic149')

Page({
  data: {
    test_line: null,
    input_word_conj: null
  },

  onLoad: function() {
    var test_line = verb;
    console.log(test_line)
    this.setData({
      test_line: test_line
    })
  },

  input_word_conj: function(e) {
    var input_word_conj = e.detail.value.toLowerCase();
    console.log(e);
    this.setData({
      input_word_conj: input_word_conj
    })
    console.log(input_word_conj);
  },

  search: function() {
    var search_word = this.data.input_word_conj;
    this.onQuery(search_word);
  },

  onQuery: function(search_word) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('conj_verb7016').where({
      ow: search_word
    }).get({
      success: function(res) {
        console.log(res.data)
        if (res.data.length === 0) {

          db.collection('conj_verb7016').where({
            sw: search_word
          }).get({
            success: function(res) {
              console.log(res.data)
              wx.setStorageSync('cw', res.data[0].cw);
              wx.setStorageSync('ow', res.data[0].ow);
              wx.setStorageSync('sw', res.data[0].sw);
              wx.setStorageSync('tg', res.data[0].tg);
              wx.setStorageSync('wn', res.data[0].wn);
              wx.setStorageSync('wr', res.data[0].wr);

              if (getCurrentPages().length != 0) {
                //刷新当前页面的数据
                getCurrentPages()[getCurrentPages().length - 1].onLoad()
              }
              console.log(app.globalData.cw)
              console.log(app.globalData.ow)
              console.log(app.globalData.sw)
              console.log(app.globalData.tg)
              console.log(app.globalData.wn)
              console.log(app.globalData.wr)
            }
          })

        } else {
          wx.setStorageSync('cw', res.data[0].cw);
          wx.setStorageSync('ow', res.data[0].ow);
          wx.setStorageSync('sw', res.data[0].sw);
          wx.setStorageSync('tg', res.data[0].tg);
          wx.setStorageSync('wn', res.data[0].wn);
          wx.setStorageSync('wr', res.data[0].wr);

          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }
          console.log(app.globalData.cw)
          console.log(app.globalData.ow)
          console.log(app.globalData.sw)
          console.log(app.globalData.tg)
          console.log(app.globalData.wn)
          console.log(app.globalData.wr)
        }
      }
    })
  },
})