// pages/contact/contact.js
const app = getApp();
var inputVal = '';
var msgList = [];
var windowWidth = wx.getSystemInfoSync().windowWidth;
var windowHeight = wx.getSystemInfoSync().windowHeight;
var keyHeight = 0;

/**
 * 初始化数据
 */
function initData(that) {
  inputVal = '';

  msgList = [{
    speaker: 'server',
    contentType: 'text',
    content: '欢迎来到英雄联盟，敌军还有30秒到达战场，请做好准备！'
  },
  {
    speaker: 'customer',
    contentType: 'text',
    content: '我怕是走错片场了...'
  }
  ]
  that.setData({
    msgList,
    inputVal
  })
}

/**
 * 计算msg总高度
 */
// function calScrollHeight(that, keyHeight) {
//   var query = wx.createSelectorQuery();
//   query.select('.scrollMsg').boundingClientRect(function(rect) {
//   }).exec();
// }

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '100vh',
    inputBottom: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    initData(this);
    this.setData({
      cusHeadIcon: app.globalData.userInfo.avatarUrl,
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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
   * 获取聚焦
   */
  focus: function (e) {
    keyHeight = e.detail.height;
    this.setData({
      scrollHeight: (windowHeight - keyHeight) + 'px'
    });
    this.setData({
      toView: 'msg-' + (msgList.length - 1),
      inputBottom: keyHeight + 'px'
    })
    //计算msg高度
    // calScrollHeight(this, keyHeight);

  },

  //失去聚焦(软键盘消失)
  blur: function (e) {
    this.setData({
      scrollHeight: '100vh',
      inputBottom: 0
    })
    this.setData({
      toView: 'msg-' + (msgList.length - 1)
    })

  },

  /**
   * 发送点击监听
   */
  sendClick: function (e) {
    msgList.push({
      speaker: 'customer',
      contentType: 'text',
      content: e.detail.value
    })
    inputVal = '';


    msgList.push({
      speaker: 'server',
      contentType: 'text',
      content: '请选择想要查询的时态',
    })


    this.setData({
      msgList,
      inputVal
    });


  },

  exp: function (search_word) {
    var i;
    var temp_txt = [];
    for (i in list.conjAnswer) {
      temp_txt = temp_txt.concat(list.conjAnswer[i].word)
    }
    var idx = temp_txt.indexOf(search_word);

    if (idx == -1) {
      wx.showToast({
        title: '暂时没有收录',
        image: '/style/gantanhao.png',
        icon: 'sucess',
        duration: 1000,
        mask: true,
      })
      return;
    }

    switch (this.data.idx_shitai) {
      case 2:
        var random_shitai_chinois = "直陈式 复合过去时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["fuhe_guoqushi"];
        var shitai_tu = word_tu["fuhe_guoqushi"];
        var shitai_il = word_il["fuhe_guoqushi"];
        var shitai_nous = word_nous["fuhe_guoqushi"]
        var shitai_vous = word_vous["fuhe_guoqushi"];
        var shitai_ils = word_ils["fuhe_guoqushi"];
        break;

      case 3:
        var random_shitai_chinois = "直陈式 现在时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["zhichenshi_xianzaishi"];
        var shitai_tu = word_tu["zhichenshi_xianzaishi"];
        var shitai_il = word_il["zhichenshi_xianzaishi"];
        var shitai_nous = word_nous["zhichenshi_xianzaishi"]
        var shitai_vous = word_vous["zhichenshi_xianzaishi"];
        var shitai_ils = word_ils["zhichenshi_xianzaishi"];
        break;

      case 4:
        var random_shitai_chinois = "直陈式 未完成过去时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["weiwancheng_guoqushi"];
        var shitai_tu = word_tu["weiwancheng_guoqushi"];
        var shitai_il = word_il["weiwancheng_guoqushi"];
        var shitai_nous = word_nous["weiwancheng_guoqushi"]
        var shitai_vous = word_vous["weiwancheng_guoqushi"];
        var shitai_ils = word_ils["weiwancheng_guoqushi"];
        break;

      case 5:
        var random_shitai_chinois = "直陈式 愈过去时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["Plus-que-parfait"];
        var shitai_tu = word_tu["Plus-que-parfait"];
        var shitai_il = word_il["Plus-que-parfait"];
        var shitai_nous = word_nous["Plus-que-parfait"]
        var shitai_vous = word_vous["Plus-que-parfait"];
        var shitai_ils = word_ils["Plus-que-parfait"];
        break;

      case 6:
        var random_shitai_chinois = "直陈式 简单过去时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["jiandan_guoqushi"];
        var shitai_tu = word_tu["jiandan_guoqushi"];
        var shitai_il = word_il["jiandan_guoqushi"];
        var shitai_nous = word_nous["jiandan_guoqushi"]
        var shitai_vous = word_vous["jiandan_guoqushi"];
        var shitai_ils = word_ils["jiandan_guoqushi"];
        break;

      case 7:
        var random_shitai_chinois = "直陈式 先过去时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["xian_guoqushi"];
        var shitai_tu = word_tu["xian_guoqushi"];
        var shitai_il = word_il["xian_guoqushi"];
        var shitai_nous = word_nous["xian_guoqushi"]
        var shitai_vous = word_vous["xian_guoqushi"];
        var shitai_ils = word_ils["xian_guoqushi"];
        break;

      case 8:
        var random_shitai_chinois = "直陈式 简单将来时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["jianglaishi"];
        var shitai_tu = word_tu["jianglaishi"];
        var shitai_il = word_il["jianglaishi"];
        var shitai_nous = word_nous["jianglaishi"]
        var shitai_vous = word_vous["jianglaishi"];
        var shitai_ils = word_ils["jianglaishi"];
        break;

      case 9:
        var random_shitai_chinois = "直陈式 先将来时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["xian_futur"];
        var shitai_tu = word_tu["xian_futur"];
        var shitai_il = word_il["xian_futur"];
        var shitai_nous = word_nous["xian_futur"]
        var shitai_vous = word_vous["xian_futur"];
        var shitai_ils = word_ils["xian_futur"];
        break;

      case 10:
        var random_shitai_chinois = "直陈式 最近将来时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["zuijin_futur"];
        var shitai_tu = word_tu["zuijin_futur"];
        var shitai_il = word_il["zuijin_futur"];
        var shitai_nous = word_nous["zuijin_futur"]
        var shitai_vous = word_vous["zuijin_futur"];
        var shitai_ils = word_ils["zuijin_futur"];
        break;

      case 11:
        var random_shitai_chinois = "条件式 现在时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["tiaojianshi_xianzaishi"];
        var shitai_tu = word_tu["tiaojianshi_xianzaishi"];
        var shitai_il = word_il["tiaojianshi_xianzaishi"];
        var shitai_nous = word_nous["tiaojianshi_xianzaishi"]
        var shitai_vous = word_vous["tiaojianshi_xianzaishi"];
        var shitai_ils = word_ils["tiaojianshi_xianzaishi"];
        break;

      case 12:
        var random_shitai_chinois = "条件式 过去时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["jiaojianshi_guoqushi"];
        var shitai_tu = word_tu["jiaojianshi_guoqushi"];
        var shitai_il = word_il["jiaojianshi_guoqushi"];
        var shitai_nous = word_nous["jiaojianshi_guoqushi"]
        var shitai_vous = word_vous["jiaojianshi_guoqushi"];
        var shitai_ils = word_ils["jiaojianshi_guoqushi"];
        break;

      case 13:
        var random_shitai_chinois = "虚拟式 现在时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["xunishi_xianzaishi"];
        var shitai_tu = word_tu["xunishi_xianzaishi"];
        var shitai_il = word_il["xunishi_xianzaishi"];
        var shitai_nous = word_nous["xunishi_xianzaishi"]
        var shitai_vous = word_vous["xunishi_xianzaishi"];
        var shitai_ils = word_ils["xunishi_xianzaishi"];
        break;

      case 14:
        var random_shitai_chinois = "虚拟式 未完成过去时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["xunishi_weiwanchengguoqushi"];
        var shitai_tu = word_tu["xunishi_weiwanchengguoqushi"];
        var shitai_il = word_il["xunishi_weiwanchengguoqushi"];
        var shitai_nous = word_nous["xunishi_weiwanchengguoqushi"]
        var shitai_vous = word_vous["xunishi_weiwanchengguoqushi"];
        var shitai_ils = word_ils["xunishi_weiwanchengguoqushi"];
        break;

      case 15:
        var random_shitai_chinois = "虚拟式 愈过去时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["xunishi_yuguoqushi"];
        var shitai_tu = word_tu["xunishi_yuguoqushi"];
        var shitai_il = word_il["xunishi_yuguoqushi"];
        var shitai_nous = word_nous["xunishi_yuguoqushi"]
        var shitai_vous = word_vous["xunishi_yuguoqushi"];
        var shitai_ils = word_ils["xunishi_yuguoqushi"];
        break;

      case 16:
        var random_shitai_chinois = "虚拟式 过去时";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["xunishi_guoqushi"];
        var shitai_tu = word_tu["xunishi_guoqushi"];
        var shitai_il = word_il["xunishi_guoqushi"];
        var shitai_nous = word_nous["xunishi_guoqushi"]
        var shitai_vous = word_vous["xunishi_guoqushi"];
        var shitai_ils = word_ils["xunishi_guoqushi"];
        break;

      case 17:
        var random_shitai_chinois = "命令式";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["minglingshi"];
        var shitai_tu = word_tu["minglingshi"];
        var shitai_il = word_il["minglingshi"];
        var shitai_nous = word_nous["minglingshi"];
        var shitai_vous = word_vous["minglingshi"];
        var shitai_ils = word_ils["minglingshi"];
        break;

      case 18:
        var random_shitai_chinois = "分词";
        var word_je = list.conjAnswer[idx];
        var word_tu = list.conjAnswer[idx + 1];
        var word_il = list.conjAnswer[idx + 2];
        var word_nous = list.conjAnswer[idx + 3];
        var word_vous = list.conjAnswer[idx + 4];
        var word_ils = list.conjAnswer[idx + 5];
        var shitai_je = word_je["fenci"];
        var shitai_tu = word_tu["fenci"];
        var shitai_il = word_il["fenci"];
        var shitai_nous = word_nous["fenci"];
        var shitai_vous = word_vous["fenci"];
        var shitai_ils = word_ils["fenci"];
        break;
    }

    this.setData({
      random_shitai_chinois: random_shitai_chinois,
      shitai_je: shitai_je,
      shitai_tu: shitai_tu,
      shitai_il: shitai_il,
      shitai_nous: shitai_nous,
      shitai_vous: shitai_vous,
      shitai_ils: shitai_ils,
    })


    wx.showModal({
      title: random_shitai_chinois,
      content: this.data.shitai_je + '\r\n' + this.data.shitai_tu + '\r\n' + this.data.shitai_il + '\r\n' + this.data.shitai_nous + '\r\n' + this.data.shitai_vous + '\r\n' + this.data.shitai_ils,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

  toBackClick: function () {
    wx.navigateBack({})
  }

})
