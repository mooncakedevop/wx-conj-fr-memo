// pages/settings/settings.js
const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('user_setting')
const picker = new Array('5', '10', '20', '30', '45', '60')
// 在页面中定义插屏广告
let interstitialAd = null


Page({

  data: {
    isChecked1: app.globalData.isChecked1,
    isChecked1_50: app.globalData.isChecked1_50,
    isChecked1_100: app.globalData.isChecked1_100,
    isChecked1_230: app.globalData.isChecked1_230,
    isChecked2: app.globalData.isChecked2, //进阶时态
    isChecked3: app.globalData.isChecked3, //高手时态
    isChecked4: app.globalData.isChecked4, //不常用时态
    tongbu: "⛅点击进行同步",
    avatarUrl: "user-unlogin.png",
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',

    index: null,
    picker: ['5', '10', '20', '30', '45', '60'],
    hidden_or_not: null,
  },

  onLoad() {
    var avatarUrl = "user-unlogin.png"
    var hidden_or_not = wx.getStorageSync("hidden_or_not")
    var tongbu = wx.getStorageSync("tongbu")

    if (tongbu == "") {
      tongbu = "⛅点击进行同步"
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              console.log(res.userInfo)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                nickName: res.userInfo.nickName
              })
            }
          })
        }
      }
    })

    this.setData({
      isChecked1: app.globalData.isChecked1,
      isChecked1_selected: app.globalData.isChecked1_selected,
      isChecked1_50: app.globalData.isChecked1_50,
      isChecked1_100: app.globalData.isChecked1_100,
      isChecked1_230: app.globalData.isChecked1_230,
      isChecked2: app.globalData.isChecked2, //进阶时态
      isChecked3: app.globalData.isChecked3, //高手时态
      isChecked4: app.globalData.isChecked4, //不常用时态

      hidden_or_not: hidden_or_not,
      avatarUrl: avatarUrl,
      tongbu: tongbu,
    })

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-e563df22798519aa'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }
  },

  extra_words: function(e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.isChecked1 = true;
      wx.setStorageSync('isChecked1', true)
    } else {
      app.globalData.isChecked1 = false;
      wx.setStorageSync('isChecked1', false)
    }
    this.successToast();
    this.onUpdate();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  words_selected: function(e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.isChecked1_selected = true;
      wx.setStorageSync('isChecked1_selected', true)
    } else {
      app.globalData.isChecked1_selected = false;
      wx.setStorageSync('isChecked1_selected', false)
    }
    this.successToast();
    this.onUpdate();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  words_50: function(e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.isChecked1_50 = true;
      wx.setStorageSync('isChecked1_50', true)
    } else {
      app.globalData.isChecked1_50 = false;
      wx.setStorageSync('isChecked1_50', false)
    }
    this.successToast();
    this.onUpdate();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  words_100: function(e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.isChecked1_100 = true;
      wx.setStorageSync('isChecked1_100', true)
    } else {
      app.globalData.isChecked1_100 = false;
      wx.setStorageSync('isChecked1_100', false)
    }
    this.successToast();
    this.onUpdate();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  words_230: function(e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.isChecked1_230 = true;
      wx.setStorageSync('isChecked1_230', true)
    } else {
      app.globalData.isChecked1_230 = false;
      wx.setStorageSync('isChecked1_230', false)
    }
    this.successToast();
    this.onUpdate();
    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  advanced_shitai: function(e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.advanced_shitai = [2, 7, 3];
      app.globalData.isChecked2 = true;
      wx.setStorageSync('isChecked2', true)
    } else {
      app.globalData.advanced_shitai = [];
      app.globalData.isChecked2 = false;
      wx.setStorageSync('isChecked2', false)
    }
    this.successToast();
    this.onUpdate();
  },

  extra_shitai: function(e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.extra_shitai = [10, 11, 8, 9];
      app.globalData.isChecked3 = true;
      wx.setStorageSync('isChecked3', true)
    } else {
      app.globalData.extra_shitai = [];
      app.globalData.isChecked3 = false;
      wx.setStorageSync('isChecked3', false)
    }
    this.successToast();
    this.onUpdate();
  },

  inusuel_shitai: function(e) {
    var that = this;
    if (e.detail.value == true) {
      app.globalData.inusuel_shitai = [4, 5];
      app.globalData.isChecked4 = true;
      wx.setStorageSync('isChecked4', true)
    } else {
      app.globalData.inusuel_shitai = [];
      app.globalData.isChecked4 = false;
      wx.setStorageSync('isChecked4', false)
    }
    this.successToast();
    this.onUpdate();
  },

  successToast: function() {
    wx.showToast({
      title: '设置已保存',
      icon: 'sucess',
      duration: 1000,
      mask: true,
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid: function() {
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

  onAdd: function() {
    const db = wx.cloud.database()
    db.collection('user_setting').add({
      data: {
        carte_arrey: app.globalData.carte_arrey,
        newer: app.globalData.newer,
        version: app.globalData.version,
        likeandsave: app.globalData.likeandsave,
        time_count: app.globalData.time_count,
        hidden_or_not: app.globalData.hidden_or_not,
        isChecked1: app.globalData.isChecked1,
        isChecked1_selected: app.globalData.isChecked1_selected,
        isChecked1_50: app.globalData.isChecked1_50,
        isChecked1_100: app.globalData.isChecked1_100,
        isChecked1_230: app.globalData.isChecked1_230,
        isChecked2: app.globalData.isChecked2,
        isChecked3: app.globalData.isChecked3,
        isChecked4: app.globalData.isChecked4,
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

  onQuery: function() {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('user_setting').where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        console.log(res.data)
        if (res.data.length === 0) {
          that.onAdd()
        } else {
          wx.setStorageSync('carte_arrey', res.data[0].carte_arrey);
          wx.setStorageSync('newer', res.data[0].newer);
          wx.setStorageSync('likeandsave', res.data[0].likeandsave);
          wx.setStorageSync('time_count', res.data[0].time_count);
          wx.setStorageSync('hidden_or_not', res.data[0].hidden_or_not);
          wx.setStorageSync('isChecked1', res.data[0].isChecked1);
          wx.setStorageSync('isChecked1_selected', res.data[0].isChecked1_selected);
          wx.setStorageSync('isChecked1_50', res.data[0].isChecked1_50);
          wx.setStorageSync('isChecked1_100', res.data[0].isChecked1_100);
          wx.setStorageSync('isChecked1_230', res.data[0].isChecked1_230);
          wx.setStorageSync('isChecked2', res.data[0].isChecked2);
          wx.setStorageSync('isChecked3', res.data[0].isChecked3);
          wx.setStorageSync('isChecked4', res.data[0].isChecked4);

          app.globalData.carte_arrey = res.data[0].carte_arrey;
          app.globalData.newer = res.data[0].newer;
          app.globalData.likeandsave = res.data[0].likeandsave;
          app.globalData.time_count = res.data[0].time_count;
          app.globalData.hidden_or_not = res.data[0].hidden_or_not;
          app.globalData.isChecked1 = res.data[0].isChecked1;
          app.globalData.isChecked1_selected = res.data[0].isChecked1_selected;
          app.globalData.isChecked1_50 = res.data[0].isChecked1_50;
          app.globalData.isChecked1_100 = res.data[0].isChecked1_100;
          app.globalData.isChecked1_230 = res.data[0].isChecked1_230;
          app.globalData.isChecked2 = res.data[0].isChecked2;
          app.globalData.isChecked3 = res.data[0].isChecked3;
          app.globalData.isChecked4 = res.data[0].isChecked4;

          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }

          that.setData({
            tongbu: "💯已自动同步"
          })
          wx.setStorageSync('tongbu', "💯已自动同步");
        }
      }
    })
  },

  onUpdate: function() {
    const db = wx.cloud.database()
    db.collection('user_setting').doc().update({
      data: {
        carte_arrey: app.globalData.carte_arrey,
        newer: app.globalData.newer,
        version: app.globalData.version,
        likeandsave: app.globalData.likeandsave,
        time_count: app.globalData.time_count,
        hidden_or_not: app.globalData.hidden_or_not,
        isChecked1: app.globalData.isChecked1,
        isChecked1_selected: app.globalData.isChecked1_selected,
        isChecked1_50: app.globalData.isChecked1_50,
        isChecked1_100: app.globalData.isChecked1_100,
        isChecked1_230: app.globalData.isChecked1_230,
        isChecked2: app.globalData.isChecked2,
        isChecked3: app.globalData.isChecked3,
        isChecked4: app.globalData.isChecked4,
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
    var time_count = picker[index]
    var time_count = parseInt(time_count)
    console.log(index);
    console.log(time_count);

    app.globalData.time_count = time_count;
    wx.setStorageSync('time_count', time_count)

    this.onUpdate();
    this.setData({
      index: e.detail.value
    })
  },

  settings: function() {
    wx.navigateBack({
      delta: 1
    })
  },

  onShareAppMessage: function(res) {
    return {
      title: '搞定法语动词变位就靠它了！😱',
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