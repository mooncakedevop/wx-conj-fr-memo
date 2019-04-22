//index.js
//获取应用实例
const app = getApp()
const verb = require('../../data/verb_7016_fr_20190330.js')
const classic = require('../../data/classic_149_fr_20190330.js')
const word_test = require('../../data/pour_word_test.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    input_je: null,
    input_tu: null,
    input_il: null,
    input_nous: null,
    input_vous: null,
    input_ils: null,
    content: null,
    idx_shitai: null,

    shitai_je: null,
    shitai_tu: null,
    shitai_il: null,
    shitai_nous: null,
    shitai_vous: null,
    shitai_ils: null,
    iconType_je: null,
    iconType_tu: null,
    iconType_il: null,
    iconType_nous: null,
    iconType_vous: null,
    iconType_ils: null,

    tag_classic: true,
    tag_selected: true,
    tag_50: true,
    tag_100: true,
    tag_230: true,

    mode_je: 'Je'
  },

  onLoad: function() {

    console.log(app.globalData.isChecked1)
    console.log(app.globalData.isChecked1_selected)
    console.log(app.globalData.isChecked1_50)
    console.log(app.globalData.isChecked1_100)
    console.log(app.globalData.isChecked1_230)

    if (app.globalData.isChecked1 == ''){
      var word_test_50 = word_test.pourEtudier50
    }


    if (app.globalData.isChecked1 == true) { //典型词 不重要
      var word_test_classic = word_test.pourEtudierClassic
    } else {
      var word_test_classic = []
    }

    if (app.globalData.isChecked1_selected == true) { //典型精选
      var word_test_selected = word_test.pourEtudierSelected
    } else {
      var word_test_selected = []
    }

    if (app.globalData.isChecked1_50 == true) { //50
      var word_test_50 = word_test.pourEtudier50
    } else {
      var word_test_50 = []
    }

    if (app.globalData.isChecked1_100 == true) { //100
      var word_test_100 = word_test.pourEtudier100
    } else {
      var word_test_100 = []
    }

    if (app.globalData.isChecked1_230 == true) { //230
      var word_test_230 = word_test.pourEtudier230
    } else {
      var word_test_230 = []
    }

    var word_test_final = word_test_50.concat(word_test_classic).concat(word_test_selected).concat(word_test_100).concat(word_test_230)
    var idx = word_test_final.length
    var idx = (Math.floor(Math.random() * idx)) //从单词总数中抽取号码
    console.log(idx)
    var word_test_final = word_test_final[idx]


    var mot_test = word_test_final["mot_test"]
    var chinois = word_test_final["chinois"]

    var shitai_choose = [2, 2, 3, 8] //初始设置基础时态
    shitai_choose = shitai_choose.concat(app.globalData.advanced_shitai).concat(app.globalData.extra_shitai).concat(app.globalData.inusuel_shitai) //拼接四个时态的数组
    console.log(shitai_choose)
    var idx_shitai_num = Math.floor(Math.random() * (shitai_choose.length - 2 + 1) + 2) //统计新的数组长度，并以此为范围取随机数
    var idx_shitai = shitai_choose[idx_shitai_num - 1] //选择新的数组中idx_shitai_num-1个元素，该元素为下面switch的case值（时态）
    console.log(idx_shitai)


    this.setData({
      content: mot_test,
      idx_shitai: idx_shitai,
    })


    this.exp(this.data.content, this.data.idx_shitai)

  },

  exp: function(search_word, idx_shitai) {
    var search_word
    console.log(search_word)
    console.log(idx_shitai)

    var idx_shitai
    //查找verb中的单词行号
    var i;
    var temp_txt = [];
    var temp_txt_simple = [];
    for (i in verb.verbFr) {
      temp_txt = temp_txt.concat(verb.verbFr[i].ow)
    }

    var idx = temp_txt.indexOf(search_word);

    //查找单词对应典型词在classic中的行号
    var word_verb = verb.verbFr[idx];
    var cw = word_verb["cw"]
    var j;
    var temp_txt_classic = [];
    for (j in classic.classicFr) {
      temp_txt_classic = temp_txt_classic.concat(classic.classicFr[j].cw)
    }
    var idx_classic = temp_txt_classic.indexOf(cw);

//查找tag
    var tg = word_verb["tg"]
    if (tg.match("classic") == "classic"){
      this.setData({
        tag_classic: false,
      })
    }else{
      this.setData({
        tag_classic: true,
      })
    }

    if (tg.match("select") == "select") {
      this.setData({
        tag_selected: false,
      })
    } else {
      this.setData({
        tag_selected: true,
      })
    }

    if (tg.match("m50") == "m50") {
      this.setData({
        tag_50: false,
      })
    } else {
      this.setData({
        tag_50: true,
      })
    }

    if (tg.match("m100") == "m100") {
      this.setData({
        tag_100: false,
      })
    } else {
      this.setData({
        tag_100: true,
      })
    }

    if (tg.match("m230") == "m230") {
      this.setData({
        tag_230: false,
      })
    } else {
      this.setData({
        tag_230: true,
      })
    }


//查找对应时态
    switch (idx_shitai) {
      case 2: //复合过去时 复合时态
        var verb_info = verb.verbFr[idx] //查找动词信息
        if (verb_info["wn"] == 'etre') { //判断助动词是否为etre
          var verbe_auxiliaire_je = classic.classicFr[834] //etre的位置
          var verbe_auxiliaire_tu = classic.classicFr[835]
          var verbe_auxiliaire_il = classic.classicFr[836]
          var verbe_auxiliaire_nous = classic.classicFr[837]
          var verbe_auxiliaire_vous = classic.classicFr[838]
          var verbe_auxiliaire_ils = classic.classicFr[839]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["indicative-present"] //etre的直现变位
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["indicative-present"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["indicative-present"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["indicative-present"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["indicative-present"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["indicative-present"]
          var mode_je = 'Je' //je要不要缩合？
          var mode_s = 's' //复数要配合
        } else {
          var verbe_auxiliaire_je = classic.classicFr[828]
          var verbe_auxiliaire_tu = classic.classicFr[829]
          var verbe_auxiliaire_il = classic.classicFr[830]
          var verbe_auxiliaire_nous = classic.classicFr[831]
          var verbe_auxiliaire_vous = classic.classicFr[832]
          var verbe_auxiliaire_ils = classic.classicFr[833]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["indicative-present"]
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["indicative-present"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["indicative-present"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["indicative-present"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["indicative-present"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["indicative-present"]
          var mode_je = 'J\''
          var mode_s = '' //复数不要配合
        }
        var random_shitai_chinois = "直陈式 复合过去时";
        var wr = word_verb["wr"]; //查找单词词根
        var past_participle_root = classic.classicFr[idx_classic] //查找典型词的过去分词词根
        var past_participle_root = past_participle_root["past-participle"]
        var shitai_je = verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;


      case 3: //直陈式现在时 简单时态
        var random_shitai_chinois = "直陈式 现在时";
        var wr = word_verb["wr"]; //查找单词词根
        var sw = word_verb["sw"]; //查找单词简单版本
        var verb_info = verb.verbFr[idx] //查找动词信息,为了看是不是嘘音
        var first_caracter = sw.substr(0, 1)
        if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || verb_info["wn"] == 'aspirate-h') {
          var mode_je = 'J\''
        } else {
          var mode_je = 'Je'
        }

        if (sw == 'aller' || sw == 'etre') { //两个坑货
          var mode_je = 'Je'
        }

        var root_je = classic.classicFr[idx_classic] //查找典型词的直陈式现在时词根
        var root_tu = classic.classicFr[idx_classic + 1] //查找典型词的过去分词词根
        var root_il = classic.classicFr[idx_classic + 2] //查找典型词的过去分词词根   
        var root_nous = classic.classicFr[idx_classic + 3] //查找典型词的过去分词词根
        var root_vous = classic.classicFr[idx_classic + 4] //查找典型词的过去分词词根
        var root_ils = classic.classicFr[idx_classic + 5] //查找典型词的过去分词词根     
        var root_je = root_je["indicative-present"]
        var root_tu = root_tu["indicative-present"]
        var root_il = root_il["indicative-present"]
        var root_nous = root_nous["indicative-present"]
        var root_vous = root_vous["indicative-present"]
        var root_ils = root_ils["indicative-present"]
        var shitai_je = wr + root_je //拼接开始
        var shitai_tu = wr + root_tu
        var shitai_il = wr + root_il
        var shitai_nous = wr + root_nous
        var shitai_vous = wr + root_vous
        var shitai_ils = wr + root_ils
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 4: //直陈式未完成过去时 简单时态
        var random_shitai_chinois = "直陈式 未完成过去时";
        var wr = word_verb["wr"]; //查找单词词根
        var sw = word_verb["sw"]; //查找单词简单版本
        var verb_info = verb.verbFr[idx] //查找动词信息,为了看是不是嘘音
        var first_caracter = sw.substr(0, 1)
        if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || verb_info["wn"] == 'aspirate-h') {
          var mode_je = 'J\''
        } else {
          var mode_je = 'Je'
        }

        var root_je = classic.classicFr[idx_classic] //查找典型词的直陈式现在时词根
        var root_tu = classic.classicFr[idx_classic + 1] //查找典型词的过去分词词根
        var root_il = classic.classicFr[idx_classic + 2] //查找典型词的过去分词词根   
        var root_nous = classic.classicFr[idx_classic + 3] //查找典型词的过去分词词根
        var root_vous = classic.classicFr[idx_classic + 4] //查找典型词的过去分词词根
        var root_ils = classic.classicFr[idx_classic + 5] //查找典型词的过去分词词根     
        var root_je = root_je["indicative-imperfect"]
        var root_tu = root_tu["indicative-imperfect"]
        var root_il = root_il["indicative-imperfect"]
        var root_nous = root_nous["indicative-imperfect"]
        var root_vous = root_vous["indicative-imperfect"]
        var root_ils = root_ils["indicative-imperfect"]
        var shitai_je = wr + root_je //拼接开始
        var shitai_tu = wr + root_tu
        var shitai_il = wr + root_il
        var shitai_nous = wr + root_nous
        var shitai_vous = wr + root_vous
        var shitai_ils = wr + root_ils
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 5: //直陈式愈过去时 复合时态
        var random_shitai_chinois = "直陈式 愈过去时";
        var verb_info = verb.verbFr[idx] //查找动词信息
        if (verb_info["wn"] == 'etre') { //判断助动词是否为etre
          var verbe_auxiliaire_je = classic.classicFr[834] //etre的位置
          var verbe_auxiliaire_tu = classic.classicFr[835]
          var verbe_auxiliaire_il = classic.classicFr[836]
          var verbe_auxiliaire_nous = classic.classicFr[837]
          var verbe_auxiliaire_vous = classic.classicFr[838]
          var verbe_auxiliaire_ils = classic.classicFr[839]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["indicative-imperfect"] //etre的直现变位
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["indicative-imperfect"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["indicative-imperfect"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["indicative-imperfect"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["indicative-imperfect"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["indicative-imperfect"]
          var mode_je = 'J\'' //je要不要缩合？
          var mode_s = 's' //复数要配合
        } else {
          var verbe_auxiliaire_je = classic.classicFr[828]
          var verbe_auxiliaire_tu = classic.classicFr[829]
          var verbe_auxiliaire_il = classic.classicFr[830]
          var verbe_auxiliaire_nous = classic.classicFr[831]
          var verbe_auxiliaire_vous = classic.classicFr[832]
          var verbe_auxiliaire_ils = classic.classicFr[833]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["indicative-imperfect"]
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["indicative-imperfect"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["indicative-imperfect"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["indicative-imperfect"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["indicative-imperfect"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["indicative-imperfect"]
          var mode_je = 'J\''
          var mode_s = '' //复数不要配合
        }


        var wr = word_verb["wr"]; //查找单词词根
        var past_participle_root = classic.classicFr[idx_classic] //查找典型词的过去分词词根
        var past_participle_root = past_participle_root["past-participle"]
        var shitai_je = verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 6: //直陈式简单过去时 简单时态
        var random_shitai_chinois = "直陈式 简单过去时";
        var wr = word_verb["wr"]; //查找单词词根
        var sw = word_verb["sw"]; //查找单词简单版本
        var verb_info = verb.verbFr[idx] //查找动词信息,为了看是不是嘘音
        var first_caracter = sw.substr(0, 1)
        if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || verb_info["wn"] == 'aspirate-h') {
          var mode_je = 'J\''
        } else {
          var mode_je = 'Je'
        }

        if (sw == 'etre') { //一个坑货
          var mode_je = 'Je'
        }
        var root_je = classic.classicFr[idx_classic] //查找典型词的直陈式现在时词根
        var root_tu = classic.classicFr[idx_classic + 1] //查找典型词的过去分词词根
        var root_il = classic.classicFr[idx_classic + 2] //查找典型词的过去分词词根   
        var root_nous = classic.classicFr[idx_classic + 3] //查找典型词的过去分词词根
        var root_vous = classic.classicFr[idx_classic + 4] //查找典型词的过去分词词根
        var root_ils = classic.classicFr[idx_classic + 5] //查找典型词的过去分词词根     
        var root_je = root_je["indicative-simple-past"]
        var root_tu = root_tu["indicative-simple-past"]
        var root_il = root_il["indicative-simple-past"]
        var root_nous = root_nous["indicative-simple-past"]
        var root_vous = root_vous["indicative-simple-past"]
        var root_ils = root_ils["indicative-simple-past"]
        var shitai_je = mode_je + ' ' + wr + root_je //拼接开始
        var shitai_tu = 'Tu' + ' ' + wr + root_tu
        var shitai_il = 'Il' + ' ' + wr + root_il
        var shitai_nous = 'Nous' + ' ' + wr + root_nous
        var shitai_vous = 'Vous' + ' ' + wr + root_vous
        var shitai_ils = 'Ils' + ' ' + wr + root_ils
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 7: //直陈式先过去时 复合时态
        var random_shitai_chinois = "直陈式 先过去时";
        var verb_info = verb.verbFr[idx] //查找动词信息
        if (verb_info["wn"] == 'etre') { //判断助动词是否为etre
          var verbe_auxiliaire_je = classic.classicFr[834] //etre的位置
          var verbe_auxiliaire_tu = classic.classicFr[835]
          var verbe_auxiliaire_il = classic.classicFr[836]
          var verbe_auxiliaire_nous = classic.classicFr[837]
          var verbe_auxiliaire_vous = classic.classicFr[838]
          var verbe_auxiliaire_ils = classic.classicFr[839]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["indicative-simple-past"] //etre的直现变位
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["indicative-simple-past"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["indicative-simple-past"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["indicative-simple-past"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["indicative-simple-past"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["indicative-simple-past"]
          var mode_je = 'Je' //je要不要缩合？
          var mode_s = 's' //复数要配合
        } else {
          var verbe_auxiliaire_je = classic.classicFr[828]
          var verbe_auxiliaire_tu = classic.classicFr[829]
          var verbe_auxiliaire_il = classic.classicFr[830]
          var verbe_auxiliaire_nous = classic.classicFr[831]
          var verbe_auxiliaire_vous = classic.classicFr[832]
          var verbe_auxiliaire_ils = classic.classicFr[833]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["indicative-simple-past"]
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["indicative-simple-past"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["indicative-simple-past"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["indicative-simple-past"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["indicative-simple-past"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["indicative-simple-past"]
          var mode_je = 'J\''
          var mode_s = '' //复数不要配合
        }
        var wr = word_verb["wr"]; //查找单词词根
        var past_participle_root = classic.classicFr[idx_classic] //查找典型词的过去分词词根
        var past_participle_root = past_participle_root["past-participle"]
        var shitai_je = verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 8: //直陈式简单将来时 简单时态
        var random_shitai_chinois = "直陈式 简单将来时";
        var wr = word_verb["wr"]; //查找单词词根
        var sw = word_verb["sw"]; //查找单词简单版本
        var verb_info = verb.verbFr[idx] //查找动词信息,为了看是不是嘘音
        var first_caracter = sw.substr(0, 1)
        if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || verb_info["wn"] == 'aspirate-h') {
          var mode_je = 'J\''
        } else {
          var mode_je = 'Je'
        }
        if (sw == 'etre') { //一个坑货
          var mode_je = 'Je'
        }
        var root_je = classic.classicFr[idx_classic] //查找典型词的直陈式现在时词根
        var root_tu = classic.classicFr[idx_classic + 1] //查找典型词的过去分词词根
        var root_il = classic.classicFr[idx_classic + 2] //查找典型词的过去分词词根   
        var root_nous = classic.classicFr[idx_classic + 3] //查找典型词的过去分词词根
        var root_vous = classic.classicFr[idx_classic + 4] //查找典型词的过去分词词根
        var root_ils = classic.classicFr[idx_classic + 5] //查找典型词的过去分词词根     
        var root_je = root_je["indicative-future"]
        var root_tu = root_tu["indicative-future"]
        var root_il = root_il["indicative-future"]
        var root_nous = root_nous["indicative-future"]
        var root_vous = root_vous["indicative-future"]
        var root_ils = root_ils["indicative-future"]
        var shitai_je = wr + root_je //拼接开始
        var shitai_tu = wr + root_tu
        var shitai_il = wr + root_il
        var shitai_nous = wr + root_nous
        var shitai_vous = wr + root_vous
        var shitai_ils = wr + root_ils
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 9: //直陈式先将来时 复合时态
        var random_shitai_chinois = "直陈式 先将来时";
        var verb_info = verb.verbFr[idx] //查找动词信息
        if (verb_info["wn"] == 'etre') { //判断助动词是否为etre
          var verbe_auxiliaire_je = classic.classicFr[834] //etre的位置
          var verbe_auxiliaire_tu = classic.classicFr[835]
          var verbe_auxiliaire_il = classic.classicFr[836]
          var verbe_auxiliaire_nous = classic.classicFr[837]
          var verbe_auxiliaire_vous = classic.classicFr[838]
          var verbe_auxiliaire_ils = classic.classicFr[839]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["indicative-future"] //etre的直现变位
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["indicative-future"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["indicative-future"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["indicative-future"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["indicative-future"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["indicative-future"]
          var mode_je = 'Je' //je要不要缩合？
          var mode_s = 's' //复数要配合
        } else {
          var verbe_auxiliaire_je = classic.classicFr[828]
          var verbe_auxiliaire_tu = classic.classicFr[829]
          var verbe_auxiliaire_il = classic.classicFr[830]
          var verbe_auxiliaire_nous = classic.classicFr[831]
          var verbe_auxiliaire_vous = classic.classicFr[832]
          var verbe_auxiliaire_ils = classic.classicFr[833]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["indicative-future"]
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["indicative-future"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["indicative-future"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["indicative-future"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["indicative-future"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["indicative-future"]
          var mode_je = 'J\''
          var mode_s = '' //复数不要配合
        }
        var wr = word_verb["wr"]; //查找单词词根
        var past_participle_root = classic.classicFr[idx_classic] //查找典型词的过去分词词根
        var past_participle_root = past_participle_root["past-participle"]
        var shitai_je = verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;



      case 10: //条件式现在时 简单时态
        var random_shitai_chinois = "条件式 现在时";
        var wr = word_verb["wr"]; //查找单词词根
        var sw = word_verb["sw"]; //查找单词简单版本
        var verb_info = verb.verbFr[idx] //查找动词信息,为了看是不是嘘音
        var first_caracter = sw.substr(0, 1)
        if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || verb_info["wn"] == 'aspirate-h') {
          var mode_je = 'J\''
        } else {
          var mode_je = 'Je'
        }
        if (sw == 'etre') { //一个坑货
          var mode_je = 'Je'
        }
        var root_je = classic.classicFr[idx_classic] //查找典型词的直陈式现在时词根
        var root_tu = classic.classicFr[idx_classic + 1] //查找典型词的过去分词词根
        var root_il = classic.classicFr[idx_classic + 2] //查找典型词的过去分词词根   
        var root_nous = classic.classicFr[idx_classic + 3] //查找典型词的过去分词词根
        var root_vous = classic.classicFr[idx_classic + 4] //查找典型词的过去分词词根
        var root_ils = classic.classicFr[idx_classic + 5] //查找典型词的过去分词词根     
        var root_je = root_je["conditional-present"]
        var root_tu = root_tu["conditional-present"]
        var root_il = root_il["conditional-present"]
        var root_nous = root_nous["conditional-present"]
        var root_vous = root_vous["conditional-present"]
        var root_ils = root_ils["conditional-present"]
        var shitai_je = wr + root_je //拼接开始
        var shitai_tu = wr + root_tu
        var shitai_il = wr + root_il
        var shitai_nous = wr + root_nous
        var shitai_vous = wr + root_vous
        var shitai_ils = wr + root_ils
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 11: //条件式过去时 复合时态
        var random_shitai_chinois = "条件式 过去时";
        var verb_info = verb.verbFr[idx] //查找动词信息
        if (verb_info["wn"] == 'etre') { //判断助动词是否为etre
          var verbe_auxiliaire_je = classic.classicFr[834] //etre的位置
          var verbe_auxiliaire_tu = classic.classicFr[835]
          var verbe_auxiliaire_il = classic.classicFr[836]
          var verbe_auxiliaire_nous = classic.classicFr[837]
          var verbe_auxiliaire_vous = classic.classicFr[838]
          var verbe_auxiliaire_ils = classic.classicFr[839]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["conditional-present"] //etre的直现变位
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["conditional-present"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["conditional-present"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["conditional-present"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["conditional-present"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["conditional-present"]
          var mode_je = 'Je' //je要不要缩合？
          var mode_s = 's' //复数要配合
        } else {
          var verbe_auxiliaire_je = classic.classicFr[828]
          var verbe_auxiliaire_tu = classic.classicFr[829]
          var verbe_auxiliaire_il = classic.classicFr[830]
          var verbe_auxiliaire_nous = classic.classicFr[831]
          var verbe_auxiliaire_vous = classic.classicFr[832]
          var verbe_auxiliaire_ils = classic.classicFr[833]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["conditional-present"]
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["conditional-present"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["conditional-present"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["conditional-present"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["conditional-present"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["conditional-present"]
          var mode_je = 'J\''
          var mode_s = '' //复数不要配合
        }
        var wr = word_verb["wr"]; //查找单词词根
        var past_participle_root = classic.classicFr[idx_classic] //查找典型词的过去分词词根
        var past_participle_root = past_participle_root["past-participle"]
        var shitai_je = verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 12: //虚拟式现在时 简单时态
        var random_shitai_chinois = "虚拟式 现在时";
        var wr = word_verb["wr"]; //查找单词词根
        var sw = word_verb["sw"]; //查找单词简单版本
        var verb_info = verb.verbFr[idx] //查找动词信息,为了看是不是嘘音
        var first_caracter = sw.substr(0, 1)
        if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || verb_info["wn"] == 'aspirate-h') {
          var mode_je = 'J\''
        } else {
          var mode_je = 'Je'
        }
        if (sw == 'etre') { //一个坑货
          var mode_je = 'Je'
        }
        var root_je = classic.classicFr[idx_classic] //查找典型词的直陈式现在时词根
        var root_tu = classic.classicFr[idx_classic + 1] //查找典型词的过去分词词根
        var root_il = classic.classicFr[idx_classic + 2] //查找典型词的过去分词词根   
        var root_nous = classic.classicFr[idx_classic + 3] //查找典型词的过去分词词根
        var root_vous = classic.classicFr[idx_classic + 4] //查找典型词的过去分词词根
        var root_ils = classic.classicFr[idx_classic + 5] //查找典型词的过去分词词根     
        var root_je = root_je["subjunctive-present"]
        var root_tu = root_tu["subjunctive-present"]
        var root_il = root_il["subjunctive-present"]
        var root_nous = root_nous["subjunctive-present"]
        var root_vous = root_vous["subjunctive-present"]
        var root_ils = root_ils["subjunctive-present"]
        var shitai_je = wr + root_je //拼接开始
        var shitai_tu = wr + root_tu
        var shitai_il = wr + root_il
        var shitai_nous = wr + root_nous
        var shitai_vous = wr + root_vous
        var shitai_ils = wr + root_ils
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 13: //虚拟式过去时 复合时态
        var random_shitai_chinois = "虚拟式 过去时";
        var verb_info = verb.verbFr[idx] //查找动词信息
        if (verb_info["wn"] == 'etre') { //判断助动词是否为etre
          var verbe_auxiliaire_je = classic.classicFr[834] //etre的位置
          var verbe_auxiliaire_tu = classic.classicFr[835]
          var verbe_auxiliaire_il = classic.classicFr[836]
          var verbe_auxiliaire_nous = classic.classicFr[837]
          var verbe_auxiliaire_vous = classic.classicFr[838]
          var verbe_auxiliaire_ils = classic.classicFr[839]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["subjunctive-present"] //etre的直现变位
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["subjunctive-present"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["subjunctive-present"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["subjunctive-present"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["subjunctive-present"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["subjunctive-present"]
          var mode_je = 'Je' //je要不要缩合？
          var mode_s = 's' //复数要配合
        } else {
          var verbe_auxiliaire_je = classic.classicFr[828]
          var verbe_auxiliaire_tu = classic.classicFr[829]
          var verbe_auxiliaire_il = classic.classicFr[830]
          var verbe_auxiliaire_nous = classic.classicFr[831]
          var verbe_auxiliaire_vous = classic.classicFr[832]
          var verbe_auxiliaire_ils = classic.classicFr[833]
          var verbe_auxiliaire_je = verbe_auxiliaire_je["subjunctive-present"]
          var verbe_auxiliaire_tu = verbe_auxiliaire_tu["subjunctive-present"]
          var verbe_auxiliaire_il = verbe_auxiliaire_il["subjunctive-present"]
          var verbe_auxiliaire_nous = verbe_auxiliaire_nous["subjunctive-present"]
          var verbe_auxiliaire_vous = verbe_auxiliaire_vous["subjunctive-present"]
          var verbe_auxiliaire_ils = verbe_auxiliaire_ils["subjunctive-present"]
          var mode_je = 'J\''
          var mode_s = '' //复数不要配合
        }
        var wr = word_verb["wr"]; //查找单词词根
        var past_participle_root = classic.classicFr[idx_classic] //查找典型词的过去分词词根
        var past_participle_root = past_participle_root["past-participle"]
        var shitai_je = verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 14: //命令式 简单时态
        var random_shitai_chinois = "命令式";
        var wr = word_verb["wr"]; //查找单词词根
        var sw = word_verb["sw"]; //查找单词简单版本
        var verb_info = verb.verbFr[idx] //查找动词信息,为了看是不是嘘音
        var first_caracter = sw.substr(0, 1)
        if (first_caracter == 'a' || first_caracter == 'e' || first_caracter == 'i' || first_caracter == 'o' || first_caracter == 'u' || verb_info["wn"] == 'aspirate-h') {
          var mode_je = 'J\''
        } else {
          var mode_je = 'Je'
        }
        var root_je = classic.classicFr[idx_classic] //查找典型词的直陈式现在时词根
        var root_tu = classic.classicFr[idx_classic + 1] //查找典型词的过去分词词根
        var root_il = classic.classicFr[idx_classic + 2] //查找典型词的过去分词词根   
        var root_nous = classic.classicFr[idx_classic + 3] //查找典型词的过去分词词根
        var root_vous = classic.classicFr[idx_classic + 4] //查找典型词的过去分词词根
        var root_ils = classic.classicFr[idx_classic + 5] //查找典型词的过去分词词根     
        var root_je = root_je["imperative-present"]
        var root_tu = root_tu["imperative-present"]
        var root_il = root_il["imperative-present"]
        var root_nous = root_nous["imperative-present"]
        var root_vous = root_vous["imperative-present"]
        var root_ils = root_ils["imperative-present"]
        var shitai_je = '第一人称木有'
        var shitai_tu = '(Tu)' + ' ' + wr + root_je
        var shitai_il = '第三人称木有'
        var shitai_nous = '(Nous)' + ' ' + wr + root_tu
        var shitai_vous = '(Vous)' + ' ' + wr + root_il
        var shitai_ils = '第三人称复数木有'
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;

      case 15: //现在分词 和 过去分词
        var random_shitai_chinois = "现在分词 和 过去分词";
        var wr = word_verb["wr"]; //查找单词词根
        var past_participle_root = classic.classicFr[idx_classic] //查找典型词的过去分词词根
        var present_participle_root = past_participle_root["present-participle"]
        var past_participle_root = past_participle_root["past-participle"]
        if (present_participle_root == '-') {
          var shitai_je = '不存在' //拼接开始
        } else {
          var shitai_je = wr + present_participle_root //拼接开始
        }
        var shitai_tu = wr + past_participle_root
        var shitai_il = ''
        var shitai_nous = ''
        var shitai_vous = ''
        var shitai_ils = ''
        this.setData({
          mode_je: mode_je,
          shitai_je: shitai_je,
          shitai_tu: shitai_tu,
          shitai_il: shitai_il,
          shitai_nous: shitai_nous,
          shitai_vous: shitai_vous,
          shitai_ils: shitai_ils,
        })
        break;
    }

    console.log(shitai_je)

    this.setData({
      mode_je: mode_je,
      shitai_chinois: random_shitai_chinois,
      shitai_je: shitai_je,
      shitai_tu: shitai_tu,
      shitai_il: shitai_il,
      shitai_nous: shitai_nous,
      shitai_vous: shitai_vous,
      shitai_ils: shitai_ils,
    })

  },

//获取用户信息
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  input_je: function(e) {
    console.log(e);
    this.setData({
      input_je: e.detail.value.toLowerCase()
    })
  },

  input_tu: function(e) {
    console.log(e);
    this.setData({
      input_tu: e.detail.value.toLowerCase()
    })
  },

  input_il: function(e) {
    console.log(e);
    this.setData({
      input_il: e.detail.value.toLowerCase()
    })
  },

  input_nous: function(e) {
    console.log(e);
    this.setData({
      input_nous: e.detail.value.toLowerCase()
    })
  },

  input_vous: function(e) {
    console.log(e);
    this.setData({
      input_vous: e.detail.value.toLowerCase()
    })
  },

  input_ils: function(e) {
    console.log(e);
    this.setData({
      input_ils: e.detail.value.toLowerCase()
    })
  },

  check: function() {
    console.log(this.data.input_je);
    console.log(this.data.input_tu);
    console.log(this.data.input_il);
    console.log(this.data.input_nous);
    console.log(this.data.input_vous);
    console.log(this.data.input_ils);

    console.log(this.data.shitai_je)

    if (this.data.input_je == this.data.shitai_je) {
      var iconType_je;
      var vrai_je = 1;
      this.setData({
        iconType_je: 'success',
        iconColor_je: '#44b549',
      })
    } else {
      this.setData({
        iconType_je: 'warn',
        iconColor_je: '#E64340',
      })
    }

    console.log(iconType_je);

    if (this.data.input_tu == this.data.shitai_tu) {
      var iconType_tu;
      var vrai_tu = 1;
      this.setData({
        iconType_tu: 'success',
        iconColor_tu: '#44b549',
      })
    } else {
      this.setData({
        iconType_tu: 'warn',
        iconColor_tu: '#E64340',
      })
    }

    if (this.data.input_il == this.data.shitai_il) {
      var iconType_il;
      var vrai_il = 1;
      this.setData({
        iconType_il: 'success',
        iconColor_il: '#44b549',
      })
    } else {
      this.setData({
        iconType_il: 'warn',
        iconColor_il: '#E64340',
      })
    }

    if (this.data.input_nous == this.data.shitai_nous) {
      var iconType_nous;
      var vrai_nous = 1;
      this.setData({
        iconType_nous: 'success',
        iconColor_nous: '#44b549',
      })
    } else {
      this.setData({
        iconType_nous: 'warn',
        iconColor_nous: '#E64340',
      })
    }

    if (this.data.input_vous == this.data.shitai_vous) {
      var iconType_vous;
      var vrai_vous = 1;
      this.setData({
        iconType_vous: 'success',
        iconColor_vous: '#44b549',
      })
    } else {
      this.setData({
        iconType_vous: 'warn',
        iconColor_vous: '#E64340',
      })
    }

    if (this.data.input_ils == this.data.shitai_ils) {
      var iconType_ils;
      var vrai_ils = 1;
      this.setData({
        iconType_ils: 'success',
        iconColor_ils: '#44b549',
      })
    } else {
      this.setData({
        iconType_ils: 'warn',
        iconColor_ils: '#E64340',
      })
    }

    console.log(vrai_je)

    if (vrai_je == 1 && vrai_tu == 1 && vrai_il == 1 && vrai_nous == 1 && vrai_vous == 1 && vrai_ils == 1) {

      wx.showToast({
        title: '答对了！',
        image: '/style/dianzan.png',
        icon: 'sucess',
        duration: 3000,
        mask: true,
      })

      if (getCurrentPages().length != 0) {
        //刷新当前页面的数据
        getCurrentPages()[getCurrentPages().length - 1].onLoad()
      }

      this.setData({
        iconType_je: null,
        iconType_tu: null,
        iconType_il: null,
        iconType_nous: null,
        iconType_vous: null,
        iconType_ils: null,
        value_input: null,
      })
    }

  },

  hint: function() {

    console.log(this.data.shitai_je)
    wx.showModal({
      title: '提示',
      content: this.data.shitai_je + '\r\n' + this.data.shitai_tu + '\r\n' + this.data.shitai_il + '\r\n' + this.data.shitai_nous + '\r\n' + this.data.shitai_vous + '\r\n' + this.data.shitai_ils,
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

  next_conj: function() {
    //判断是否有打开过页面
    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
    this.setData({
      iconType_je: null,
      iconType_tu: null,
      iconType_il: null,
      iconType_nous: null,
      iconType_vous: null,
      iconType_ils: null,
      value_input: null,
    })
  }


})