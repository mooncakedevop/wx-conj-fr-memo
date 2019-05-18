//index.js
//获取应用实例
const app = getApp()
const verb = require('../../data/verb_7016_fr_20190330.js')
const classic = require('../../data/classic_149_fr_20190330.js')
const shitai = new Array("0", "1", "直陈式复合过去时", "直陈式现在时", "直陈式未完成过去时", "直陈式愈过去时", "直陈式简单过去时", "直陈式先过去时", "直陈式简单将来时", "直陈式先将来时", "条件式现在时", "条件式过去时", "虚拟式现在时", "虚拟式过去时", "命令式", "现在分词和过去分词")

Page({
  data: {
    search_word: null,
    idx_shitai: null,
    shitai_chinois: null,
    carte_number: null,

    show_conj_je: [],
    show_conj_tu: [],
    show_conj_il: [],
    show_conj_nous: [],
    show_conj_vous: [],
    show_conj_ils: [],
    ps1: null,
    ps2: null,
    change_color: null,
    likeandsave: [],
  },

  onLoad: function() {
    var idx_shitai = app.globalData.shitai_no; //显示时态序号
    var shitai_chinois = shitai[idx_shitai]
    var carte_number = app.globalData.carte_number;
    var ps1 = app.globalData.ps1;
    var ps2 = app.globalData.ps2;

    this.setData({
      show_conj_je: app.globalData.shitai_je,
      show_conj_tu: app.globalData.shitai_tu,
      show_conj_il: app.globalData.shitai_il,
      show_conj_nous: app.globalData.shitai_nous,
      show_conj_vous: app.globalData.shitai_vous,
      show_conj_ils: app.globalData.shitai_ils,

      search_word: app.globalData.search_word,
      carte_number: carte_number,
      shitai_chinois: shitai_chinois, //通过时态序号查找时态对应的中文
      ps1: ps1,
      ps2: ps2,
      change_color: 'text-yellow', //改变颜色
    })

    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)
  },

  bien_enregistre: function() {
    var idx_shitai = app.globalData.shitai_no
    app.globalData.idx_carte_number = app.globalData.idx_carte_number + 1 //全局卡片编号加1
    var carte_arrey = app.globalData.likeandsave
    console.log(app.globalData.idx_carte_number)

    wx.navigateBack({
      delta: 1
    })
    console.log("bien_enregistre")
  },

  JNSP: function() {
    wx.navigateBack({
      delta: 1
    })
    console.log("JNSP")
  },

  onUnload: function() {
    // 页面关闭
    var pages = getCurrentPages()
    var prevPage = pages[pages.length - 2]
    prevPage.onLoad()
  },

  like_save: function (e) {
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
      app.globalData.idx_carte_number = app.globalData.idx_carte_number -1 ; //取消星标之后，likeandsave中也就少一个元素
      app.globalData.carte_number
      this.setData({
        change_color: 'text-blue',      //改变颜色
      })
    }

    console.log(likeandsave_exist)
    console.log(app.globalData.likeandsave)
  }
});