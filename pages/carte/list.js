const app = getApp()
const verb = require('../../data/verb_7016_fr_20190330.js')
const classic = require('../../data/classic_149_fr_20190330.js')
const carte = require('../../data/apprendre_500_20190506.js')
const shitai = new Array("0", "1", "直陈式复合过去时", "直陈式现在时", "直陈式未完成过去时", "直陈式愈过去时", "直陈式简单过去时", "直陈式先过去时", "直陈式简单将来时", "直陈式先将来时", "条件式现在时", "条件式过去时", "虚拟式现在时", "虚拟式过去时", "命令式", "现在分词和过去分词")

Page({
  data: {
    array: null,
    list: null,
    list_title: null,
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },

  hideModal(e) {
    this.setData({
      modalName: null
    })
  },

  onLoad: function () {
    if (app.globalData.list == "favorite") {
      var likeandsave = app.globalData.likeandsave;
      var list_favorite = [];
      var array = [];
      for (var prop in likeandsave) {
        prop = likeandsave[prop]
        prop = parseInt(prop);
        var carte_prop = carte.carteFr;
        var carte_prop = carte_prop[prop];
        list_favorite = list_favorite.concat(carte_prop);
      }
      var list_title = "我的收藏";
      this.setData({
        array: list_favorite,
        list_title: list_title,
      })
    } else {
      var list_title = "全部卡片列表";
      this.setData({
        array: carte.carteFr,
        list_title: list_title,
      })
    }
  },

  // ListTouch触摸开始
  ListTouchStart(e) {
    this.setData({
      ListTouchStart: e.touches[0].pageX
    })
  },

  // ListTouch计算方向
  ListTouchMove(e) {
    this.setData({
      ListTouchDirection: e.touches[0].pageX - this.data.ListTouchStart > 0 ? 'right' : 'left'
    })
  },

  // ListTouch计算滚动
  ListTouchEnd(e) {
    if (this.data.ListTouchDirection == 'left') {
      this.setData({
        modalName: e.currentTarget.dataset.target
      })
    } else {
      this.setData({
        modalName: null
      })
    }
    this.setData({
      ListTouchDirection: null
    })
  },


  hint: function() {
    wx.showModal({
      title: '提示',
      content: '将卡片向左滑可以标星标和取消星标',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },


  like_save: function (e) {

    console.log(e)
    var id = e.target.id;   //获取当页的id号，也就是卡号
    var likeandsave = app.globalData.likeandsave;  //读取原来全局变量中的likeandsave
    var likeandsave_exist = likeandsave.indexOf(id);   //看看id号是否在原来的likeandsave中

    if (likeandsave_exist == -1) {      //如果没有（返回-1），那么：
      likeandsave.push(id);            //将id号写入likeandsave, likeandsave为加入后的数组
      app.globalData.likeandsave = likeandsave;   //写入全局变量
      wx.setStorageSync('likeandsave', likeandsave)    //写入缓存
      this.setData({
        change_color: 'text-yellow',            //改变颜色
      })
    } else {
      likeandsave.splice(likeandsave_exist, 1);   //将id号起删除一个元素, likeandsave为删除后剩下的数组
      app.globalData.likeandsave = likeandsave;  //写入全局变量
      wx.setStorageSync('likeandsave', likeandsave)  //写入缓存
      this.setData({
        change_color: 'text-blue',      //改变颜色
      })
    }

    console.log(likeandsave_exist)
    console.log(app.globalData.likeandsave)
  }
})