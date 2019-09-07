// pages/settings/settings.js
const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('user_setting')
const picker = new Array('5', '10', '20', '30', '45', '60')

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
  },

  close_it: function() {
    wx.setStorageSync("hidden_or_not", true)

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
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

  onGetOpenid_download: function() {
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
    var that = this
    wx.showModal({
      title: '注意',
      content: '点击“确定”将会下载云端数据，云端数据将会覆盖本地。使用场景：恢复记录',
      success(res) {
        if (res.confirm) {
          that.onQuery();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },

  onGetOpenid_upload: function() {
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
    var that = this
    wx.showModal({
      title: '注意',
      content: '点击“确定”将会上传本地数据，本地数据将会覆盖云端。使用场景：备份记录',
      success(res) {
        if (res.confirm) {
          that.onUpdate();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })

  },


  onAdd: function() {
    const db = wx.cloud.database()
    db.collection('user_setting').add({
      data: {
        carte_arrey: wx.getStorageSync('carte_arrey'),
        newer: wx.getStorageSync('newer'),
        version: wx.getStorageSync('version'),
        likeandsave: wx.getStorageSync('likeandsave'),
        time_count: wx.getStorageSync('time_count'),
        hidden_or_not: wx.getStorageSync('hidden_or_not'),
        isChecked1: wx.getStorageSync('isChecked1'),
        isChecked1_selected: wx.getStorageSync('isChecked1_selected'),
        isChecked1_50: wx.getStorageSync('isChecked1_50'),
        isChecked1_100: wx.getStorageSync('isChecked1_100'),
        isChecked1_230: wx.getStorageSync('isChecked1_230'),
        isChecked2: wx.getStorageSync('isChecked2'),
        isChecked3: wx.getStorageSync('isChecked3'),
        isChecked4: wx.getStorageSync('isChecked4'),

        freq: wx.getStorageSync('freq'),
        freq_number: wx.getStorageSync('freq_number'),
        word_frequence_5000: wx.getStorageSync('word_frequence_5000'),
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '同步成功',
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

          wx.setStorageSync('freq', res.data[0].freq);
          wx.setStorageSync('freq_number', res.data[0].freq_number);
          wx.setStorageSync('word_frequence_5000', res.data[0].word_frequence_5000);

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

          app.globalData.freq = res.data[0].freq;
          app.globalData.freq_number = res.data[0].freq_number;
          app.globalData.word_frequence_5000 = res.data[0].word_frequence_5000;

          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }

          that.setData({
            tongbu: "💯已自动同步"
          })
          wx.setStorageSync('tongbu', "💯已自动同步");

          wx.showToast({
            title: '同步成功',
          })
        }
      }
    })
  },

  onUpdate: function() {
    var that = this
    const db = wx.cloud.database()
    db.collection('user_setting').where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        console.log(res.data)
        if (res.data.length === 0) {
          that.onAdd()
        } else {
          db.collection('user_setting').doc(res.data[0]._id).remove({
            success: function (res) {
              console.log(res.data)
            }
          })
          that.onAdd()
        }
      }
    })
  },


  help: function() {
    wx.navigateTo({
      url: 'help/help',
    })
  },

  about: function() {
    wx.navigateTo({
      url: 'help/more',
    })
  },

  copy: function() {
    var self = this;
    wx.setClipboardData({
      data: "https://uniquelab.cn/conj-helper",
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '✨复制成功✨请粘贴到浏览器访问',
          success: function(res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },

  settings_vocab: function() {
    wx.navigateTo({
      url: 'settings_vocab',
    })
  },

  settings_conj: function() {
    wx.navigateTo({
      url: 'settings_conj',
    })
  },

  copy_current: function() {
    var self = this;
    wx.setClipboardData({
      data: "https://uniquelab.cn/conj-helper-3-0-0",
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '✨复制成功✨请粘贴到浏览器访问',
          success: function(res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },

  like_me: function() {
    wx.previewImage({
      urls: ['cloud://conj-helper-96fe10.636f-conj-helper-96fe10/likeme.jpg'],
    });
  },

  hard_choice: function() {
    wx.navigateToMiniProgram({
      appId: 'wx4b37e8a18be82a4d',
      path: 'pages/index1/index1',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
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