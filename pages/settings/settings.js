// pages/settings/settings.js
const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('mySettings')
const picker = new Array('5', '10', '20', '30', '45', '60')

Component({

  data: {
    isChecked1: app.globalData.isChecked1, 
    isChecked1_50: app.globalData.isChecked1_50,
    isChecked1_100: app.globalData.isChecked1_100,
    isChecked1_230: app.globalData.isChecked1_230,
    isChecked2: app.globalData.isChecked2, //进阶时态
    isChecked3: app.globalData.isChecked3, //高手时态
    isChecked4: app.globalData.isChecked4, //不常用时态
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',

    index: null,
    picker: ['5', '10', '20', '30', '45', '60']
  } ,


  methods: {
    onLoad() {
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
      })
    },

    extra_words: function (e) {
      var that = this;
      if (e.detail.value == true) {
        app.globalData.isChecked1 = true;
        wx.setStorageSync('mySettings_isChecked1', true)
      } else {
        app.globalData.isChecked1 = false;
        wx.setStorageSync('mySettings_isChecked1', false)
      }
      this.successToast();
    },

    words_selected: function (e) {
      var that = this;
      if (e.detail.value == true) {
        app.globalData.isChecked1_selected = true;
        wx.setStorageSync('mySettings_isChecked1_selected', true)
      } else {
        app.globalData.isChecked1_selected = false;
        wx.setStorageSync('mySettings_isChecked1_selected', false)
      }
      this.successToast();
    },

    words_50: function (e) {
      var that = this;
      if (e.detail.value == true) {
        app.globalData.isChecked1_50 = true;
        wx.setStorageSync('mySettings_isChecked1_50', true)
      } else {
        app.globalData.isChecked1_50 = false;
        wx.setStorageSync('mySettings_isChecked1_50', false)
      }
      this.successToast();
    },

    words_100: function (e) {
      var that = this;
      if (e.detail.value == true) {
        app.globalData.isChecked1_100 = true;
        wx.setStorageSync('mySettings_isChecked1_100', true)
      } else {
        app.globalData.isChecked1_100 = false;
        wx.setStorageSync('mySettings_isChecked1_100', false)
      }
      this.successToast();
    },

    words_230: function (e) {
      var that = this;
      if (e.detail.value == true) {
        app.globalData.isChecked1_230 = true;
        wx.setStorageSync('mySettings_isChecked1_230', true)
      } else {
        app.globalData.isChecked1_230 = false;
        wx.setStorageSync('mySettings_isChecked1_230', false)
      }
      this.successToast();
    },

    advanced_shitai: function (e) {
      var that = this;
      if (e.detail.value == true) {
        app.globalData.advanced_shitai = [4, 5, 7, 9];
        wx.setStorageSync('mySettings_isChecked2', true)
      } else {
        app.globalData.advanced_shitai = [];
        wx.setStorageSync('mySettings_isChecked2', false)
      }
      this.successToast();
    },

    extra_shitai: function (e) {
      var that = this;
      if (e.detail.value == true) {
        app.globalData.extra_shitai = [10, 11, 12, 13];
        wx.setStorageSync('mySettings_isChecked3', true)
      } else {
        app.globalData.extra_shitai = [];
        wx.setStorageSync('mySettings_isChecked3', false)
      }
      this.successToast();
    },

    inusuel_shitai: function (e) {
      var that = this;
      if (e.detail.value == true) {
        app.globalData.inusuel_shitai = [6];
        wx.setStorageSync('mySettings_isChecked4', true)
      } else {
        app.globalData.inusuel_shitai = [];
        wx.setStorageSync('mySettings_isChecked4', false)
      }
      this.successToast();
    },

    successToast: function(){
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

        const db = wx.cloud.database() //初始化数据库
        var isChecked1 = this.data.isChecked1
        var isChecked2 = this.data.isChecked2
        var isChecked3 = this.data.isChecked3
        var isChecked4 = this.data.isChecked4
        console.log(this.data.isChecked1)

        db.collection('mySettings').add({
          // data 字段表示需新增的 JSON 数据
          data: {
            isChecked1,
            isChecked2,
            isChecked3,
            isChecked4,
          }
        })
          .then(res => {
            console.log(res)
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
        },
        fail: err => {
          console.error('[云函数] [login] 调用失败', err)
        }
      })
    },

    help: function(){
      wx.navigateTo({
        url: 'help/help',
      })
    },

    about: function () {
      wx.navigateTo({
        url: 'help/more',
      })
    },

    PickerChange(e) {                        //用来选时间
      console.log(e);
      var index = e.detail.value;
      var index = parseInt(index)
      var time_count = picker[index]
      var time_count = parseInt(time_count)
      console.log(index);
      console.log(time_count);

      app.globalData.time_count = time_count;
      wx.setStorageSync('time_count', time_count)


      this.setData({
        index: e.detail.value
      })
    },

    hard_choice: function () {
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

    onShareAppMessage: function (res) {
      return {
        title: '搞定法语动词变位就靠它了！😱',
        path: 'pages/welcome/welcome',
        imageUrl: '',
        success: function (shareTickets) {
          console.info(shareTickets + '成功');
          // 转发成功
        },
        fail: function (res) {
          console.log(res + '失败');
          // 转发失败
        },
        complete: function (res) {
          // 不管成功失败都会执行
        }
      }
    }

  }
})