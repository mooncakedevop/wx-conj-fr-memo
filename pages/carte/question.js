//index.js
//获取应用实例
const app = getApp()
const verb = require('../../data/verb_7016_fr_20190330.js')
const classic = require('../../data/classic_149_fr_20190330.js')
const carte = require('../../data/apprendre_500_20190506.js')
const shitai = new Array("0", "1", "直陈式复合过去时", "直陈式现在时", "直陈式未完成过去时","直陈式愈过去时","直陈式简单过去时", "直陈式先过去时", "直陈式简单将来时", "直陈式先将来时", "条件式现在时", "条件式过去时", "虚拟式现在时", "虚拟式过去时", "命令式", "现在分词和过去分词")

Page({
  data: {
    input_word_conj: null,
    idx_shitai: null,
    shitai_chinois: null,
    true_or_false: true,

    show_conj_je: [],
    show_conj_tu: [],
    show_conj_il: [],
    show_conj_nous: [],
    show_conj_vous: [],
    show_conj_ils: [],

    carte_number: null,
    search_word: null,

    zhangwo: null,   //掌握数量（看过）
    shengshu: null,   //生疏数量（没看过）
    xin:null, 

    ps1: null,
    ps2: null,
  },

  onLoad: function () {
    var timer; // 计时器
    var seconds_wait = app.globalData.time_count;  //设定倒计时时间
    Countdown(this);  //注意this和that

    var carte_arrey = app.globalData.carte_arrey   //从卡片历史进度中读取对应时态的历史进度
    
    console.log(carte_arrey)
    
    var sum = 0;
    for (var i = 0; i < carte_arrey.length; i++){
      var sum = carte_arrey[i] + sum
    }
    var zhangwo = sum - 3805;

    var idx_shitai = app.globalData.shitai_no;    //显示时态序号
    var carte_number = carte_arrey[idx_shitai];   //卡号
    console.log(idx_shitai)
    console.log(carte_number)

    var search_word = carte.carteFr[carte_number].mot     //初始页面显示单词，直接看卡号，卡号唯一
    var ps1 = carte.carteFr[carte_number].ps1     //卡片ps1信息
    var ps2 = carte.carteFr[carte_number].ps2    //卡片ps2信息
    var idx_shitai = app.globalData.shitai_no;    //显示时态序号
    var shitai_chinois = shitai[idx_shitai]

    app.globalData.carte_number = carte_number;
    app.globalData.search_word = search_word;
    app.globalData.ps1 = ps1;
    app.globalData.ps2 = ps2;
    console.log(idx_shitai)

    this.setData({
      zhangwo: zhangwo,
      carte_number: carte_number,
      search_word: search_word,
      idx_shitai: idx_shitai,
      shitai_chinois: shitai_chinois, //通过时态序号查找时态对应的中文
    })


    let that = this;
    setTimeout(function () {
      that.setData({
        loading: true
      })
    }, 500)

    var search_word = app.globalData.search_word
    var idx_shitai = app.globalData.shitai_no
    this.exp(search_word, idx_shitai);

    function Countdown(that) { //注意this和that
      timer = setTimeout(function () {
        seconds_wait--;
        that.setData({
          seconds_wait: seconds_wait,
        })
        if (seconds_wait <= 0) {
          seconds_wait = 0;
          that.setData({
            true_or_false: false,
          })
          wx.navigateTo({      //倒计时结束之后立马跳转
            url: 'carte',
          })//要延时执行的代码
        } else {
          Countdown(that);
        }
      }, 1000);
    };

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


  exp: function (search_word,idx_shitai) {
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
    console.log(idx)
    console.log(idx_shitai)

    //查找单词对应典型词在classic中的行号
    var word_verb = verb.verbFr[idx];
    var cw = word_verb["cw"];
    app.globalData.ow = word_verb["ow"];

    if (app.globalData.ow == cw) {
      app.globalData.tag_classic = false
    } else {
      app.globalData.tag_classic = true
    }

    console.log(app.globalData.ow)

    var j;
    var temp_txt_classic = [];
    for (j in classic.classicFr) {
      temp_txt_classic = temp_txt_classic.concat(classic.classicFr[j].cw)
    }
    var idx_classic = temp_txt_classic.indexOf(cw);



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
        var shitai_je = mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = "Tu" + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = "Il" + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = "Nous" + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = "Vous" + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = "Ils" + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + wr + root_je //拼接开始
        var shitai_tu = "Tu" + ' ' + wr + root_tu
        var shitai_il = "Il" + ' ' + wr + root_il
        var shitai_nous = "Nous" + ' ' + wr + root_nous
        var shitai_vous = "Vous" + ' ' + wr + root_vous
        var shitai_ils = "Ils" + ' ' + wr + root_ils

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + wr + root_je //拼接开始
        var shitai_tu = "Tu" + ' ' + wr + root_tu
        var shitai_il = "Il" + ' ' + wr + root_il
        var shitai_nous = "Nous" + ' ' + wr + root_nous
        var shitai_vous = "Vous" + ' ' + wr + root_vous
        var shitai_ils = "Ils" + ' ' + wr + root_ils

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = "Tu" + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = "Il" + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = "Nous" + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = "Vous" + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = "Ils" + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = "Tu" + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = "Il" + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = "Nous" + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = "Vous" + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = "Ils" + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + wr + root_je //拼接开始
        var shitai_tu = "Tu" + ' ' + wr + root_tu
        var shitai_il = "Il" + ' ' + wr + root_il
        var shitai_nous = "Nous" + ' ' + wr + root_nous
        var shitai_vous = "Vous" + ' ' + wr + root_vous
        var shitai_ils = "Ils" + ' ' + wr + root_ils

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = "Tu" + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = "Il" + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = "Nous" + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = "Vous" + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = "Ils" + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + wr + root_je //拼接开始
        var shitai_tu = "Tu" + ' ' + wr + root_tu
        var shitai_il = "Il" + ' ' + wr + root_il
        var shitai_nous = "Nous" + ' ' + wr + root_nous
        var shitai_vous = "Vous" + ' ' + wr + root_vous
        var shitai_ils = "Ils" + ' ' + wr + root_ils

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = "Tu" + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = "Il" + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = "Nous" + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = "Vous" + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = "Ils" + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + wr + root_je //拼接开始
        var shitai_tu = "Tu" + ' ' + wr + root_tu
        var shitai_il = "Il" + ' ' + wr + root_il
        var shitai_nous = "Nous" + ' ' + wr + root_nous
        var shitai_vous = "Vous" + ' ' + wr + root_vous
        var shitai_ils = "Ils" + ' ' + wr + root_ils

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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
        var shitai_je = mode_je + ' ' + verbe_auxiliaire_je + ' ' + wr + past_participle_root //拼接开始
        var shitai_tu = "Tu" + ' ' + verbe_auxiliaire_tu + ' ' + wr + past_participle_root
        var shitai_il = "Il" + ' ' + verbe_auxiliaire_il + ' ' + wr + past_participle_root
        var shitai_nous = "Nous" + ' ' + verbe_auxiliaire_nous + ' ' + wr + past_participle_root + mode_s
        var shitai_vous = "Vous" + ' ' + verbe_auxiliaire_vous + ' ' + wr + past_participle_root + mode_s
        var shitai_ils = "Ils" + ' ' + verbe_auxiliaire_ils + ' ' + wr + past_participle_root + mode_s

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
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

        app.globalData.shitai_je = shitai_je
        app.globalData.shitai_tu = shitai_tu
        app.globalData.shitai_il = shitai_il
        app.globalData.shitai_nous = shitai_nous
        app.globalData.shitai_vous = shitai_vous
        app.globalData.shitai_ils = shitai_ils
        break;
    }

  },

  
  hint_countdown: function(tap_word) {
    wx.showModal({
      title: '提示',
      content: '在倒计时的这段时间内，您可以回想或者口头念出它们的变位形式。时间归0之后您能看到答案以检验。下一个版本将能自由修改时间。',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },
});
