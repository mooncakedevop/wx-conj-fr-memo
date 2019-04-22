const app = getApp()


Page({
  data: {
    true_or_false: true,
    isChecked1: true,
    isChecked2: false,
    welcome_botton:'轻触继续学习'
  },

onLoad: function() {

  if (app.globalData.isChecked1 == '') {    //如果没有任何数据，那就代表是新用户
    wx.setStorageSync('mySettings_isChecked1_50', true)  //写下用户的第一个数据
    this.setData({
      welcome_botton: '轻触开始学习'
    })
  }
  
  app.globalData.isChecked1 = wx.getStorageSync('mySettings_isChecked1') 
  app.globalData.isChecked1_selected = wx.getStorageSync('mySettings_isChecked1_selected') 
  app.globalData.isChecked1_50 = wx.getStorageSync('mySettings_isChecked1_50') 
  app.globalData.isChecked1_100 = wx.getStorageSync('mySettings_isChecked1_100') 
  app.globalData.isChecked1_230 = wx.getStorageSync('mySettings_isChecked1_230') 
  app.globalData.isChecked2 = wx.getStorageSync('mySettings_isChecked2') 
  app.globalData.isChecked3 = wx.getStorageSync('mySettings_isChecked3')
  app.globalData.isChecked4 = wx.getStorageSync('mySettings_isChecked4') 


  if (app.globalData.isChecked2 == true) {
    app.globalData.advanced_shitai = [4, 5, 7, 9];
  } else {
    app.globalData.advanced_shitai = [];
  }

  if (app.globalData.isChecked3 == true) {
    app.globalData.extra_shitai = [10, 11, 12, 13];
  } else {
    app.globalData.extra_shitai = [];
  }

  if (app.globalData.isChecked4 == true) {
    app.globalData.inusuel_shitai = [6];
  } else {
    app.globalData.inusuel_shitai = [];
  }





 
      this.setData({
        true_or_false: false
      })

},

intro: function() {
  wx.switchTab({
    url: '../index/index',
  })
},
  

})