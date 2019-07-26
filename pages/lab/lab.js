const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('conj_all_20190722')
const avoir_etre = require('../../data/avoir_etre.js')

Page({
  data: {
    focus: true,
    disable_btn: true,
    cursor: null,
    input_word_conj: "",
    idx_shitai: null,
    shitai_chinois: null,
    shitai_je: [],
    shitai_tu: [],
    shitai_il: [],
    shitai_nous: [],
    shitai_vous: [],
    shitai_ils: [],
  },

  input_word_conj: function(e) {
    console.log(e);
    var input_word_conj = e.detail.value.toLowerCase();
    this.setData({
      input_word_conj: input_word_conj,
    })
    console.log(input_word_conj);
  },

  special_fr: function(e) {
    console.log(e.currentTarget.id);
    var input_word_conj = this.data.input_word_conj;
    var input_word_conj = input_word_conj.concat(e.currentTarget.id)
    var cursor = 100;

    console.log(input_word_conj);

    this.setData({
      input_word_conj: input_word_conj,
      focus: true,
      cursor: cursor
    })
  },

  bindblur: function() {
    this.setData({
      disable_btn: false,
    })
  },

  bindfocus: function() {
    this.setData({
      disable_btn: true,
    })
  },

  tap_word: function(tap_word) {
    var input_word_conj = tap_word;
    this.setData({
      input_word_conj: tap_word
    })
    console.log(input_word_conj);

    this.onQuery(input_word_conj);

    wx.showToast({
      title: '查询中',
      image: '/style/paper-plane.png',
      icon: 'sucess',
      duration: 1500,
      mask: true,
    })
  },

  search: function() {
    var search_word = this.data.input_word_conj;
    if (search_word == null) {
      wx.showToast({
        title: '请输入内容！',
        image: '/style/paper-plane.png',
        icon: 'sucess',
        duration: 1000,
        mask: true,
      })
      return;
    }
    this.onQuery(search_word);

    wx.showToast({
      title: '查询中',
      image: '/style/paper-plane.png',
      icon: 'sucess',
      duration: 1000,
      mask: true,
    })
  },

  etre: function() {
    this.tap_word("être");
  },

  avoir: function() {
    this.tap_word("avoir");
  },

  faire: function() {
    this.tap_word("faire");
  },

  dire: function() {
    this.tap_word("dire");
  },

  pouvoir: function() {
    this.tap_word("pouvoir");
  },

  aller: function() {
    this.tap_word("aller");
  },

  voir: function() {
    this.tap_word("voir");
  },

  savoir: function() {
    this.tap_word("savoir");
  },

  vouloir: function() {
    this.tap_word("vouloir");
  },

  venir: function() {
    this.tap_word("venir");
  },

  falloir: function() {
    this.tap_word("falloir");
  },

  devoir: function() {
    this.tap_word("devoir");
  },

  croire: function() {
    this.tap_word("croire");
  },

  trouver: function() {
    this.tap_word("trouver");
  },

  donner: function() {
    this.tap_word("donner");
  },

  prendre: function() {
    this.tap_word("prendre");
  },

  parler: function() {
    this.tap_word("parler");
  },

  aimer: function() {
    this.tap_word("aimer");
  },

  mettre: function() {
    this.tap_word("mettre");
  },

  tenir: function() {
    this.tap_word("tenir");
  },

  laisser: function() {
    this.tap_word("laisser");
  },

  repondre: function() {
    this.tap_word("répondre");
  },

  penser: function() {
    this.tap_word("penser");
  },

  entendre: function() {
    this.tap_word("entendre");
  },

  rendre: function() {
    this.tap_word("rendre");
  },

  connaitre: function() {
    this.tap_word("connaître");
  },

  sentir: function() {
    this.tap_word("sentir");
  },

  ecrire: function() {
    this.tap_word("écrire");
  },

  agir: function() {
    this.tap_word("agir");
  },

  onQuery: function(search_word) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters

    const _ = db.command
    db.collection('conj_all_20190722').where(_.or([{
        sw: search_word
      },
      {
        ow: search_word
      },
      {
        condi_pre1: search_word
      },
      {
        condi_pre2: search_word
      },
      {
        condi_pre3: search_word
      },
      {
        condi_pre4: search_word
      },
      {
        condi_pre5: search_word
      },
      {
        condi_pre6: search_word
      },
      {
        imp_pre1: search_word
      },
      {
        imp_pre2: search_word
      },
      {
        imp_pre3: search_word
      },
      {
        indi_fu1: search_word
      },
      {
        indi_fu2: search_word
      },
      {
        indi_fu3: search_word
      },
      {
        indi_fu4: search_word
      },
      {
        indi_fu5: search_word
      },
      {
        indi_fu6: search_word
      },
      {
        indi_imp1: search_word
      },
      {
        indi_imp2: search_word
      },
      {
        indi_imp3: search_word
      },
      {
        indi_imp4: search_word
      },
      {
        indi_imp5: search_word
      },
      {
        indi_imp6: search_word
      },
      {
        indi_past1: search_word
      },
      {
        indi_past2: search_word
      },
      {
        indi_past3: search_word
      },
      {
        indi_past4: search_word
      },
      {
        indi_past5: search_word
      },
      {
        indi_past6: search_word
      },
      {
        indi_pre1: search_word
      },
      {
        indi_pre2: search_word
      },
      {
        indi_pre3: search_word
      },
      {
        indi_pre4: search_word
      },
      {
        indi_pre5: search_word
      },
      {
        indi_pre6: search_word
      },
      {
        inf_pre: search_word
      },
      {
        pre_part: search_word
      },
      {
        past_part1: search_word
      },
      {
        past_part2: search_word
      },
      {
        past_part3: search_word
      },
      {
        past_part4: search_word
      },
      {
        subj_pre1: search_word
      },
      {
        subj_pre2: search_word
      },
      {
        subj_pre3: search_word
      },
      {
        subj_pre4: search_word
      },
      {
        subj_pre5: search_word
      },
      {
        subj_pre6: search_word
      },
      {
        subj_pre6: search_word
      },
      {
        subj_imp1: search_word
      },
      {
        subj_imp2: search_word
      },
      {
        subj_imp3: search_word
      },
      {
        subj_imp4: search_word
      },
      {
        subj_imp5: search_word
      },
      {
        subj_im6: search_word
      }
    ])).get({
      success: function(res) {
        console.log(res.data)
        app.globalData.consult_data = res.data;
        wx.setStorageSync('consult_data', res.data);
        that.wait();
        that.exp();

        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }

      }
    })
  },

  exp: function() {

    var consult_data = app.globalData.consult_data;

    if (consult_data == null && consult_data != search_word) {
      this.onQuery(search_word);
      var consult_data = app.globalData.consult_data;
    }

    console.log(consult_data[0].indi_imp1)

    app.globalData.ow = consult_data[0].ow
    app.globalData.tag_classic = consult_data[0].tg

    if (consult_data == []) {
      wx.showToast({
        title: '请检查是否正确',
        image: '/style/gantanhao.png',
        icon: 'sucess',
        duration: 1000,
        mask: true,
      })
      return;
    }

    //复合过去时 复合时态

    if (consult_data[0].wn == 'etre') { //判断助动词是否为etre
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[1].indi_pre1 //etre的位置
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[1].indi_pre2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[1].indi_pre3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[1].indi_pre4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[1].indi_pre5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[1].indi_pre6

      var mode_je = 'Je' //je要不要缩合？
      var mode_s = 's' //复数要配合
    } else {
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[0].indi_pre1
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[0].indi_pre2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[0].indi_pre3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[0].indi_pre4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[0].indi_pre5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[0].indi_pre6
      var mode_je = 'J\''
      var mode_s = '' //复数不要配合
    }
    var random_shitai_chinois = "直陈式 复合过去时";

    var shitai_je = [mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1] //拼接开始
    var shitai_tu = ['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1]
    var shitai_il = ['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1]
    var shitai_nous = ['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s]
    var shitai_vous = ['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s]
    var shitai_ils = ['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s]


    //直陈式现在时 简单时态
    var random_shitai_chinois = "直陈式 现在时";

    var first_caracter = consult_data[0].sw.substr(0, 1)
    if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || consult_data[0].wn == 'aspirate-h') {
      var mode_je = 'J\''
    } else {
      var mode_je = 'Je'
    }

    if (consult_data[0].sw == 'aller' || consult_data[0].sw == 'etre') { //两个坑货
      var mode_je = 'Je'
    }

    var root_je = consult_data[0].indi_pre1
    var root_tu = consult_data[0].indi_pre2
    var root_il = consult_data[0].indi_pre3
    var root_nous = consult_data[0].indi_pre4
    var root_vous = consult_data[0].indi_pre5
    var root_ils = consult_data[0].indi_pre6

    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])

    console.log(shitai_je)
    console.log(shitai_tu)
    console.log(shitai_il)
    console.log(shitai_nous)
    console.log(shitai_vous)
    console.log(shitai_ils)


    //直陈式未完成过去时 简单时态
    var random_shitai_chinois = "直陈式 未完成过去时";

    var first_caracter = consult_data[0].sw.substr(0, 1)
    if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || consult_data[0].wn == 'aspirate-h') {
      var mode_je = 'J\''
    } else {
      var mode_je = 'Je'
    }

    var root_je = consult_data[0].indi_imp1
    var root_tu = consult_data[0].indi_imp2
    var root_il = consult_data[0].indi_imp3
    var root_nous = consult_data[0].indi_imp4
    var root_vous = consult_data[0].indi_imp5
    var root_ils = consult_data[0].indi_imp6

    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])





    //直陈式愈过去时 复合时态
    var random_shitai_chinois = "直陈式 愈过去时";
    if (consult_data[0].wn == 'etre') { //判断助动词是否为etre
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[1].indi_imp1 //etre的位置
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[1].indi_imp2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[1].indi_imp3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[1].indi_imp4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[1].indi_imp5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[1].indi_imp6

      var mode_je = 'Je' //je要不要缩合？
      var mode_s = 's' //复数要配合
    } else {
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[0].indi_imp1
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[0].indi_imp2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[0].indi_imp3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[0].indi_imp4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[0].indi_imp5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[0].indi_imp6
      var mode_je = 'J\''
      var mode_s = '' //复数不要配合
    }

    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


    //直陈式简单过去时 简单时态
    var random_shitai_chinois = "直陈式 简单过去时";

    var first_caracter = consult_data[0].sw.substr(0, 1)
    if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || consult_data[0].wn == 'aspirate-h') {
      var mode_je = 'J\''
    } else {
      var mode_je = 'Je'
    }

    if (consult_data[0].sw == 'etre') { //一个坑货
      var mode_je = 'Je'
    }

    var root_je = consult_data[0].indi_past1
    var root_tu = consult_data[0].indi_past2
    var root_il = consult_data[0].indi_past3
    var root_nous = consult_data[0].indi_past4
    var root_vous = consult_data[0].indi_past5
    var root_ils = consult_data[0].indi_past6

    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])


    //直陈式先过去时 复合时态
    var random_shitai_chinois = "直陈式 先过去时";

    if (consult_data[0].wn == 'etre') { //判断助动词是否为etre
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[1].indi_past1 //etre的位置
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[1].indi_past2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[1].indi_past3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[1].indi_past4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[1].indi_past5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[1].indi_past6

      var mode_je = 'Je' //je要不要缩合？
      var mode_s = 's' //复数要配合
    } else {
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[0].indi_past1
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[0].indi_past2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[0].indi_past3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[0].indi_past4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[0].indi_past5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[0].indi_past6
      var mode_je = 'J\''
      var mode_s = '' //复数不要配合
    }

    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])

    //直陈式简单将来时 简单时态
    var random_shitai_chinois = "直陈式 简单将来时";
    var first_caracter = consult_data[0].sw.substr(0, 1)
    if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || consult_data[0].wn == 'aspirate-h') {
      var mode_je = 'J\''
    } else {
      var mode_je = 'Je'
    }

    if (consult_data[0].sw == 'etre') { //一个坑货
      var mode_je = 'Je'
    }

    var root_je = consult_data[0].indi_fu1
    var root_tu = consult_data[0].indi_fu2
    var root_il = consult_data[0].indi_fu3
    var root_nous = consult_data[0].indi_fu4
    var root_vous = consult_data[0].indi_fu5
    var root_ils = consult_data[0].indi_fu6

    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])


    //直陈式先将来时 复合时态
    var random_shitai_chinois = "直陈式 先将来时";
    if (consult_data[0].wn == 'etre') { //判断助动词是否为etre
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[1].indi_fu1 //etre的位置
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[1].indi_fu2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[1].indi_fu3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[1].indi_fu4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[1].indi_fu5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[1].indi_fu6

      var mode_je = 'Je' //je要不要缩合？
      var mode_s = 's' //复数要配合
    } else {
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[0].indi_fu1
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[0].indi_fu2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[0].indi_fu3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[0].indi_fu4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[0].indi_fu5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[0].indi_fu6
      var mode_je = 'J\''
      var mode_s = '' //复数不要配合
    }

    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


    //条件式现在时 简单时态
    var random_shitai_chinois = "条件式 现在时";
    var first_caracter = consult_data[0].sw.substr(0, 1)
    if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || consult_data[0].wn == 'aspirate-h') {
      var mode_je = 'J\''
    } else {
      var mode_je = 'Je'
    }

    if (consult_data[0].sw == 'etre') { //一个坑货
      var mode_je = 'Je'
    }

    var root_je = consult_data[0].condi_pre1
    var root_tu = consult_data[0].condi_pre2
    var root_il = consult_data[0].condi_pre3
    var root_nous = consult_data[0].condi_pre4
    var root_vous = consult_data[0].condi_pre5
    var root_ils = consult_data[0].condi_pre6

    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])


    //条件式过去时 复合时态
    var random_shitai_chinois = "条件式 过去时";
    if (consult_data[0].wn == 'etre') { //判断助动词是否为etre
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[1].condi_pre1 //etre的位置
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[1].condi_pre2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[1].condi_pre3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[1].condi_pre4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[1].condi_pre5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[1].condi_pre6

      var mode_je = 'Je' //je要不要缩合？
      var mode_s = 's' //复数要配合
    } else {
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[0].condi_pre1
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[0].condi_pre2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[0].condi_pre3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[0].condi_pre4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[0].condi_pre5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[0].condi_pre6
      var mode_je = 'J\''
      var mode_s = '' //复数不要配合
    }

    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


    //虚拟式现在时 简单时态
    var random_shitai_chinois = "虚拟式 现在时";
    var first_caracter = consult_data[0].sw.substr(0, 1)
    if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || consult_data[0].wn == 'aspirate-h') {
      var mode_je = 'J\''
    } else {
      var mode_je = 'Je'
    }

    if (consult_data[0].sw == 'etre') { //一个坑货
      var mode_je = 'Je'
    }

    var root_je = consult_data[0].subj_pre1
    var root_tu = consult_data[0].subj_pre2
    var root_il = consult_data[0].subj_pre3
    var root_nous = consult_data[0].subj_pre4
    var root_vous = consult_data[0].subj_pre5
    var root_ils = consult_data[0].subj_pre6

    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])


    //虚拟式过去时 复合时态
    var random_shitai_chinois = "虚拟式 过去时";
    if (consult_data[0].wn == 'etre') { //判断助动词是否为etre
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[1].subj_pre1 //etre的位置
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[1].subj_pre2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[1].subj_pre3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[1].subj_pre4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[1].subj_pre5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[1].subj_pre6

      var mode_je = 'Je' //je要不要缩合？
      var mode_s = 's' //复数要配合
    } else {
      var verbe_auxiliaire_je = avoir_etre.avoirEtre[0].subj_pre1
      var verbe_auxiliaire_tu = avoir_etre.avoirEtre[0].subj_pre2
      var verbe_auxiliaire_il = avoir_etre.avoirEtre[0].subj_pre3
      var verbe_auxiliaire_nous = avoir_etre.avoirEtre[0].subj_pre4
      var verbe_auxiliaire_vous = avoir_etre.avoirEtre[0].subj_pre5
      var verbe_auxiliaire_ils = avoir_etre.avoirEtre[0].subj_pre6
      var mode_je = 'J\''
      var mode_s = '' //复数不要配合
    }

    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


    //命令式 简单时态
    var random_shitai_chinois = "命令式";
    var first_caracter = consult_data[0].sw.substr(0, 1)
    if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || consult_data[0].wn == 'aspirate-h') {
      var mode_je = 'J\''
    } else {
      var mode_je = 'Je'
    }

    var root_tu = consult_data[0].imp_pre1
    var root_nous = consult_data[0].imp_pre2
    var root_vous = consult_data[0].imp_pre3

    var shitai_je = shitai_je.concat(['第一人称木有'])
    var shitai_tu = shitai_tu.concat(['(Tu)' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['第三人称木有'])
    var shitai_nous = shitai_nous.concat(['(Nous)' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['(Vous)' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['第三人称复数木有'])

    //现在分词 和 过去分词
    var random_shitai_chinois = "现在分词 和 过去分词";

    var past_participle_root = consult_data[0].past_part1
    var present_participle_root = consult_data[0].pre_part

    if (present_participle_root == '-') {
      var shitai_je = shitai_je.concat(['现在分词' + ' ' + '不存在']) //拼接开始)
    } else {
      var shitai_je = shitai_je.concat(['现在分词' + ' ' + present_participle_root]) //拼接开始
    }

    var shitai_tu = shitai_tu.concat(['过去分词（单数阳性）' + ' ' + past_participle_root])
    var shitai_il = shitai_il.concat([''])
    var shitai_nous = shitai_nous.concat([''])
    var shitai_vous = shitai_vous.concat([''])
    var shitai_ils = shitai_ils.concat([''])

    app.globalData.shitai_je = shitai_je
    app.globalData.shitai_tu = shitai_tu
    app.globalData.shitai_il = shitai_il
    app.globalData.shitai_nous = shitai_nous
    app.globalData.shitai_vous = shitai_vous
    app.globalData.shitai_ils = shitai_ils

  },

  intro: function() {
    wx.switchTab({
      url: '../index/index',
    })
  },

  training: function() {
    wx.switchTab({
      url: '../carte/milestone',
    })
  },

  wait: function() {
    wx.navigateTo({
      url: 'result/result',
    })
  },

  onShareAppMessage: function(res) {
    return {
      title: '法语动词变位查询利器！快来看看吧😁',
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