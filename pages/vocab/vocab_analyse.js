// pages/vocab/vocab_analyse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    learn_word_new_today: [],
    review_word: [],
    already_word: [],
    page_number: null,
    dark_mode: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    var learn_word_new_today = wx.getStorageSync('learn_word_new_today')
    let learn_word_new_today_temp = []
    learn_word_new_today_temp.push(learn_word_new_today[0])

    // learn_word_new_today.splice(0, 1)
    console.log(learn_word_new_today.splice(0, 1))
    var review_word = wx.getStorageSync('review_word')
    var already_word = wx.getStorageSync('already_word')
    var page_number = 1
    var settings_new = wx.getStorageSync('settings_new')

    console.log(review_word)
    console.log(already_word)

    if (review_word.length != 0) {
      this.array_sort(review_word)
    } else {
      review_word = ["暂无单词"]
    }
    if (already_word.length != 0) {
      this.array_sort(already_word)
    } else {
      already_word = ["暂无单词"]
    }
    if (learn_word_new_today.length != 0) {
      this.array_sort(learn_word_new_today)
    } else {
      learn_word_new_today = ["暂无单词"]
    }

    learn_word_new_today_temp.concat(learn_word_new_today)
    console.log(learn_word_new_today)
    console.log(learn_word_new_today_temp)
    wx.setStorageSync('review_word', review_word)
    wx.setStorageSync('already_word', already_word)
    wx.setStorageSync('learn_word_new_today', learn_word_new_today)

    this.setData({
      learn_word_new_today: learn_word_new_today,
      review_word: review_word,
      already_word: already_word,
      page_number: page_number,
      dark_mode: settings_new[0].dark_mode
    })
  },

  learn_word_new_today: function() {
    var page_number = 1
    wx.showToast({
      title: '🛰正在切换',
      icon: 'none',
      duration: 1500,
      mask: true,
    })
    this.setData({
      page_number: page_number
    })
  },

  review_word: function() {
    var page_number = 2
    wx.showToast({
      title: '🛰正在切换',
      icon: 'none',
      duration: 1500,
      mask: true,
    })
    this.setData({
      page_number: page_number
    })
  },

  already_word: function() {
    var page_number = 3
    wx.showToast({
      title: '🛰正在切换',
      icon: 'none',
      duration: 1500,
      mask: true,
    })
    this.setData({
      page_number: page_number
    })
  },

  array_sort: function(array_sort) {
    console.log(array_sort)
    console.log(array_sort[0][0])
    for (let i = 0; i < array_sort.length - 1; i++) {
      for (let j = 0; j < array_sort.length - i - 1; j++) {
        if (array_sort[j][0] > array_sort[j + 1][0]) {
          let temp = array_sort[j]
          array_sort[j] = array_sort[j + 1]
          array_sort[j + 1] = temp
        }
      }
    }
    return array_sort;
  },

  choosed_answer: function(e) {
    var learn_word_new_today = wx.getStorageSync('learn_word_new_today')
    var choosed_answer = learn_word_new_today[e.target.id];
    console.log(e.target.id);
    this.onQuery(choosed_answer);
    console.log(choosed_answer);
  },

  choosed_answer_1: function(e) {
    var review_word = wx.getStorageSync('review_word')
    var choosed_answer = review_word[e.target.id];
    console.log(e.target.id);
    this.onQuery(choosed_answer);
  },

  choosed_answer_2: function(e) {
    var already_word = wx.getStorageSync('already_word')
    var choosed_answer = already_word[e.target.id];
    console.log(e.target.id);
    this.onQuery(choosed_answer);
  },

  onQuery: function(search_word) {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      w_s: search_word
    }])).get({
      success: function(res) {
        console.log(res.data)
        wx.setStorageSync('consult_data', res.data);
        that.vocab_index_result();
      }
    })
  },

  vocab_index_result: function() {
    wx.navigateTo({
      url: 'vocab_index_result',
    })
  },

  vocab_index: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})