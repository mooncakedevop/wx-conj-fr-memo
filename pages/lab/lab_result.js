// pages/vocab/vocab_analyse.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list_number: null,
    dark_mode: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var lab_result_list = wx.getStorageSync('consult_data_dic')
    var settings_new = wx.getStorageSync('settings_new') 
    var list_number = lab_result_list.length
    console.log(lab_result_list)

    this.setData({
      list_number: list_number,
      dark_mode: settings_new[0].dark_mode,
      lab_result_list:lab_result_list
    })
  },

  choosed_answer: function (e) {
    var lab_result_list = wx.getStorageSync('consult_data_dic')
    var choosed_answer = lab_result_list[e.target.id].w_s;
    console.log(e.target.id);
    this.onQuery(choosed_answer);
    console.log(choosed_answer);
  },

  onQuery: function (search_word) {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('vocab_dic_larousse_20190807').where(_.or([{
      w_s: search_word
    }])).get({
      success: function (res) {
        console.log(res.data)
        wx.setStorageSync('consult_data', res.data);
        that.vocab_index_result();
      }
    })
  },

  vocab_index_result: function () {
    wx.navigateTo({
      url: '../vocab/vocab_index_result',
    })
  },

  vocab_index: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})