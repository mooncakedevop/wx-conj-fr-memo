const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('user_setting')
const picker = ['10', '15', '20', '25', '30','35', '40', '45', '50', '55', '60']

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  freq_1500: function (e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.freq = [true,false,false];
      wx.setStorageSync('freq', app.globalData.freq)
    } else {
      app.globalData.isChecked1 = [false, true, false];
      wx.setStorageSync('freq', app.globalData.freq)
    }
    this.successToast();
    this.onUpdate();
  },

  freq_3000: function (e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.freq = [false, true, false];
      wx.setStorageSync('freq', app.globalData.freq)
    } else {
      app.globalData.isChecked1 = [false, false, true];
      wx.setStorageSync('freq', app.globalData.freq)
    }
    this.successToast();
    this.onUpdate();
  },

  freq_5000: function (e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.freq = [false, false, true];
      wx.setStorageSync('freq', app.globalData.freq)
    } else {
      app.globalData.isChecked1 = [true, false, false];
      wx.setStorageSync('freq', app.globalData.freq)
    }
    this.successToast();
    this.onUpdate();
  },



  settings: function () {
    wx.navigateBack({
      delta: 1
    })
  },

  successToast: function () {
    wx.showToast({
      title: '设置已保存',
      icon: 'sucess',
      duration: 1000,
      mask: true,
    })
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.setStorageSync('openid', res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    this.onQuery();
  },

  onAdd: function () {
    const db = wx.cloud.database()
    db.collection('user_setting').add({
      data: {
        freq_number: app.globalData.freq_number,
        freq: app.globalData.freq,
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '同步记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  onQuery: function () {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('user_setting').where({
      _openid: app.globalData.openid
    }).get({
      success: function (res) {
        console.log(res.data)
        if (res.data.length === 0) {
          that.onAdd()
        } else {
          wx.setStorageSync('freq_number', res.data[0].freq_number);
          wx.setStorageSync('freq', res.data[0].freq);

          app.globalData.freq_number = res.data[0].freq_number;
          app.globalData.freq = res.data[0].freq;

          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }

        }
      }
    })
  },

  onUpdate: function () {
    const db = wx.cloud.database()
    db.collection('user_setting').doc().update({
      data: {
        freq_number: app.globalData.freq_number, //间隔天数
        freq: app.globalData.freq,   //哪个词汇本的哪部分
      },
      success: res => {
        wx.showToast({
          title: '添加记录成功',
        })
        console.log('[数据库] [更新记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        icon: 'none',
          console.error('[数据库] [更新记录] 失败：', err)
      }
    })
  },

  PickerChange(e) { //用来选时间
    console.log(e);
    var index = e.detail.value;
    var index = parseInt(index)
    var freq_number = picker[index]
    var freq_number = parseInt(freq_number)
    console.log(index);
    console.log(freq_number);

    app.globalData.freq_number = freq_number;
    wx.setStorageSync('freq_number', freq_number)

    this.onUpdate();
    this.setData({
      index: e.detail.value
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})