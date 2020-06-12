// pages/vocab/vocab_analyse.js
const app = getApp()

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
      lab_result_list: lab_result_list
    })
  },

  choosed_answer(e) {
    app.globalData.choosed_answer_number = e.currentTarget.id;
    console.log(app.globalData.choosed_answer_number)
    console.log(e)
    wx.navigateTo({
      url: '../lab/lab_index_result',
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