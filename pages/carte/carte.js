//index.js
//获取应用实例
const app = getApp()
const shitai = new Array("0", "1", "直陈式复合过去时", "直陈式现在时", "直陈式未完成过去时", "直陈式愈过去时", "直陈式简单过去时", "直陈式先过去时", "直陈式简单将来时", "直陈式先将来时", "条件式现在时", "条件式过去时", "虚拟式现在时", "虚拟式过去时", "命令式", "现在分词和过去分词")


const db = wx.cloud.database() //初始化数据库
const verb = db.collection('conj_verb7016')
const classic = db.collection('conj_classic149')

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
    })

    let that = this;
    setTimeout(function() {
      that.setData({
        loading: true
      })
    }, 500)
  },

  bien_enregistre: function() {
    var idx_shitai = app.globalData.shitai_no;
    var carte_number = app.globalData.carte_number + 1 //全局卡片编号加1
    var carte_arrey = app.globalData.carte_arrey
    carte_arrey.splice(idx_shitai, 1, carte_number) //删除从idx_shitai开始1个元素，替换成carte_number
    console.log(carte_arrey)
    wx.setStorageSync('carte_arrey', carte_arrey)

    wx.redirectTo({
      url: 'question',
    })
    console.log("bien_enregistre")
  },

  JNSP: function() {
    wx.redirectTo({
      url: 'question',
    })
    console.log("JNSP")
  },


  retour: function() {
    wx.switchTab({
      url: 'milestone',
    })
    console.log("retour")
  },

  like_save: function(e) {
    var id = e.target.id; //获取当页的id号，也就是卡号
    var likeandsave = app.globalData.likeandsave; //读取原来全局变量中的likeandsave
    var likeandsave_exist = likeandsave.indexOf(id); //看看id号是否在原来的likeandsave中

    if (likeandsave_exist == -1) { //如果没有（返回-1），那么：
      likeandsave.push(id); //将id号写入likeandsave, likeandsave为加入后的数组
      app.globalData.likeandsave = likeandsave; //写入全局变量
      wx.setStorageSync('likeandsave', likeandsave) //写入缓存
      this.setData({
        change_color: 'text-yellow', //改变颜色
      })
    } else {
      likeandsave.splice(likeandsave_exist, 1); //将id号起删除一个元素, likeandsave为删除后剩下的数组
      app.globalData.likeandsave = likeandsave; //写入全局变量
      wx.setStorageSync('likeandsave', likeandsave) //写入缓存
      this.setData({
        change_color: 'text-blue', //改变颜色
      })
    }

    this.onUpdate()
    console.log(likeandsave_exist)
    console.log(app.globalData.likeandsave)
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
});