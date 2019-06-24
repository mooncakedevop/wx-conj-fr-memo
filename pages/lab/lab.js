//index.js
//获取应用实例
const app = getApp()
const verb = require('../../data/verb_7016_fr_20190330.js')
const classic = require('../../data/classic_149_fr_20190330.js')

Page({
  data: {
    input_word_conj: null,
    idx_shitai: null,
    shitai_chinois: null,
    shitai_je: [],
    shitai_tu: [],
    shitai_il: [],
    shitai_nous: [],
    shitai_vous: [],
    shitai_ils: [],
  },

  input_word_conj: function (e) {
    var input_word_conj = e.detail.value.toLowerCase();
    console.log(e);
    this.setData({
      input_word_conj: input_word_conj
    })
    console.log(input_word_conj);
  },

  tap_word: function (tap_word) {
    var input_word_conj = tap_word;
    this.setData({
      input_word_conj: tap_word
    })
    console.log(input_word_conj);

    this.exp(input_word_conj);

    wx.navigateTo({
      url: 'result/result',
    })
  },

  search: function () {
    var search_word = this.data.input_word_conj;
    if (search_word == null) {
      wx.showToast({
        title: '请输入内容！',
        image: '/style/gantanhao.png',
        icon: 'sucess',
        duration: 1000,
        mask: true,
      })
      return;
    }
    this.exp(search_word);


    wx.navigateTo({
      url: 'result/result',
    })
  },


  exp: function (search_word) {
    //查找verb中的单词行号
    var i;
    var temp_txt = [];
    var temp_txt_simple = [];
    for (i in verb.verbFr) {
      temp_txt = temp_txt.concat(verb.verbFr[i].ow)
      temp_txt_simple = temp_txt_simple.concat(verb.verbFr[i].sw)
    }

    var idx = temp_txt.indexOf(search_word);
    var idx_simple = temp_txt_simple.indexOf(search_word);

    if (idx == -1 && idx_simple == -1) {
      wx.showToast({
        title: '请检查是否正确',
        image: '/style/gantanhao.png',
        icon: 'sucess',
        duration: 1000,
        mask: true,
      })
      return;
    }

    if (idx != -1) {
      idx = idx
    }

    if (idx_simple != -1) {
      idx = idx_simple
    }

    //查找单词对应典型词在classic中的行号
    var word_verb = verb.verbFr[idx];
    var cw = word_verb["cw"];
    app.globalData.ow = word_verb["ow"];

    if (app.globalData.ow == cw ){
      app.globalData.tag_classic = false
    }else{
      app.globalData.tag_classic = true
    }

    console.log(app.globalData.tag_classic)

    var j;
    var temp_txt_classic = [];
    for (j in classic.classicFr) {
      temp_txt_classic = temp_txt_classic.concat(classic.classicFr[j].cw)
    }
    var idx_classic = temp_txt_classic.indexOf(cw);

//复合过去时 复合时态
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

    console.log(past_participle_root)
        var past_participle_root = past_participle_root["past-participle"]
        var shitai_je = [mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root] //拼接开始
        var shitai_tu = ['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root]
        var shitai_il =[ 'Il' + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root]
        var shitai_nous = ['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s]
        var shitai_vous =['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s]
        var shitai_ils = ['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s]
         


//直陈式现在时 简单时态
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

        if (sw == 'aller' || sw == 'etre') {   //两个坑货
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
    var shitai_je = shitai_je.concat([mode_je + ' ' + wr + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + wr + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + wr + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + wr + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + wr + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + wr + root_ils])
         

//直陈式未完成过去时 简单时态
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
    var shitai_je = shitai_je.concat([mode_je + ' ' + wr + root_je]) //拼接开始
        var shitai_tu = shitai_tu.concat(['Tu' + ' ' + wr + root_tu])
        var shitai_il = shitai_il.concat(['Il' + ' ' + wr + root_il])
        var shitai_nous =shitai_nous.concat(['Nous' + ' ' + wr + root_nous])
        var shitai_vous = shitai_vous.concat(['Vous' + ' ' + wr + root_vous])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + wr + root_ils])
         

 //直陈式愈过去时 复合时态
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
    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root]) //拼接开始
        var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root])
        var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root])
        var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s])
        var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s])
         

 //直陈式简单过去时 简单时态
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

        if (sw == 'etre') {   //一个坑货
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
        var shitai_je = shitai_je.concat([mode_je + ' ' + wr + root_je]) //拼接开始
        var shitai_tu = shitai_tu.concat(['Tu' + ' ' + wr + root_tu])
        var shitai_il = shitai_il.concat(['Il' + ' ' + wr + root_il])
        var shitai_nous = shitai_nous.concat(['Nous' + ' ' + wr + root_nous])
        var shitai_vous = shitai_vous.concat(['Vous' + ' ' + wr + root_vous])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + wr + root_ils])
         

//直陈式先过去时 复合时态
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
    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root]) //拼接开始
        var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root])
        var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root])
        var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s])
        var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s])
         

//直陈式简单将来时 简单时态
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
        if (sw == 'etre') {   //一个坑货
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
    var shitai_je = shitai_je.concat([mode_je + ' ' + wr + root_je]) //拼接开始
        var shitai_tu = shitai_tu.concat(['Tu' + ' ' + wr + root_tu])
        var shitai_il = shitai_il.concat(['Il' + ' ' + wr + root_il])
        var shitai_nous = shitai_nous.concat(['Nous' + ' ' + wr + root_nous])
        var shitai_vous = shitai_vous.concat(['Vous' + ' ' + wr + root_vous])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + wr + root_ils])
         

//直陈式先将来时 复合时态
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
    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root]) //拼接开始
        var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root])
        var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root])
        var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s])
        var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s])
         


//条件式现在时 简单时态
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
        if (sw == 'etre') {   //一个坑货
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
    var shitai_je = shitai_je.concat([mode_je + ' ' + wr + root_je]) //拼接开始
        var shitai_tu = shitai_tu.concat(['Tu' + ' ' + wr + root_tu])
        var shitai_il = shitai_il.concat(['Il' + ' ' + wr + root_il])
        var shitai_nous = shitai_nous.concat(['Nous' + ' ' + wr + root_nous])
        var shitai_vous = shitai_vous.concat(['Vous' + ' ' + wr + root_vous])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + wr + root_ils])
         

//条件式过去时 复合时态
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
    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root]) //拼接开始
        var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root])
        var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root])
        var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s])
        var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s])
         

//虚拟式现在时 简单时态
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
        if (sw == 'etre') {   //一个坑货
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
    var shitai_je = shitai_je.concat([ mode_je + ' ' + wr + root_je]) //拼接开始
        var shitai_tu =shitai_tu.concat([ 'Tu' + ' ' + wr + root_tu])
        var shitai_il = shitai_il.concat(['Il' + ' ' + wr + root_il])
        var shitai_nous = shitai_nous.concat(['Nous' + ' ' + wr + root_nous])
        var shitai_vous = shitai_vous.concat(['Vous' + ' ' + wr + root_vous])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + wr + root_ils])
         

 //虚拟式过去时 复合时态
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
    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root]) //拼接开始
        var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root])
        var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root])
        var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s])
        var shitai_vous =shitai_vous.concat( ['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s])
        var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s])
         

//命令式 简单时态
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
        var shitai_je = shitai_je.concat(['第一人称木有'])
        var shitai_tu = shitai_tu.concat(['(Tu)' + ' ' + wr + root_je])
        var shitai_il = shitai_il.concat(['第三人称木有'])
        var shitai_nous = shitai_nous.concat(['(Nous)' + ' ' + wr + root_tu])
        var shitai_vous = shitai_vous.concat(['(Vous)' + ' ' + wr + root_il])
        var shitai_ils = shitai_ils.concat(['第三人称复数木有'])

//现在分词 和 过去分词
        var random_shitai_chinois = "现在分词 和 过去分词";
        var wr = word_verb["wr"]; //查找单词词根
        var past_participle_root = classic.classicFr[idx_classic] //查找典型词的过去分词词根
        var present_participle_root = past_participle_root["present-participle"]
        var past_participle_root = past_participle_root["past-participle"]
        if (present_participle_root == '-') {
          var shitai_je = shitai_je.concat(['现在分词' + ' ' + '不存在']) //拼接开始)
        } else {
          var shitai_je = shitai_je.concat(['现在分词' + ' ' + wr + present_participle_root]) //拼接开始
        }

        var shitai_tu = shitai_tu.concat(['过去分词' + ' ' + wr + past_participle_root])
        var shitai_il = shitai_il.concat([''])
        var shitai_nous = shitai_nous.concat([''])
        var shitai_vous = shitai_vous.concat([''])
        var shitai_ils = shitai_ils.concat([''])
         
    


    app.globalData.shitai_je= shitai_je
     app.globalData.shitai_tu= shitai_tu
      app.globalData.shitai_il= shitai_il
      app.globalData.shitai_nous= shitai_nous
      app.globalData.shitai_vous= shitai_vous
      app.globalData.shitai_ils= shitai_ils
  
  },




  etre: function () {
    this.tap_word("être");
  },

  avoir: function () {
    this.tap_word("avoir");
  },

  faire: function () {
    this.tap_word("faire");
  },

  dire: function () {
    this.tap_word("dire");
  },

  pouvoir: function () {
    this.tap_word("pouvoir");
  },

  aller: function () {
    this.tap_word("aller");
  },

  voir: function () {
    this.tap_word("voir");
  },

  savoir: function () {
    this.tap_word("savoir");
  },

  vouloir: function () {
    this.tap_word("vouloir");
  },

  venir: function () {
    this.tap_word("venir");
  },

  falloir: function () {
    this.tap_word("falloir");
  },

  devoir: function () {
    this.tap_word("devoir");
  },

  croire: function () {
    this.tap_word("croire");
  },

  trouver: function () {
    this.tap_word("trouver");
  },

  donner: function () {
    this.tap_word("donner");
  },

  prendre: function () {
    this.tap_word("prendre");
  },

  parler: function () {
    this.tap_word("parler");
  },

  aimer: function () {
    this.tap_word("aimer");
  },

  mettre: function () {
    this.tap_word("mettre");
  },

  tenir: function () {
    this.tap_word("tenir");
  },

  laisser: function () {
    this.tap_word("laisser");
  },

  repondre: function () {
    this.tap_word("répondre");
  },

  penser: function () {
    this.tap_word("penser");
  },

  entendre: function () {
    this.tap_word("entendre");
  },

  rendre: function () {
    this.tap_word("rendre");
  },

  connaitre: function () {
    this.tap_word("connaître");
  },

  sentir: function () {
    this.tap_word("sentir");
  },

  ecrire: function () {
    this.tap_word("écrire");
  },

  agir: function () {
    this.tap_word("agir");
  },

  onShareAppMessage: function (res) {
    return {
      title: '法语动词变位查询利器！快来看看吧😁',
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

});