const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('conj_all_20190722')
const avoir_etre = require('../../data/avoir_etre.js')
const carte = require('../../data/apprendre_500_20190506.js')
const shitai = new Array("直陈式复合过去时", "直陈式现在时", "直陈式未完成过去时","直陈式愈过去时","直陈式简单过去时", "直陈式先过去时", "直陈式简单将来时", "直陈式先将来时", "条件式现在时", "条件式过去时", "虚拟式现在时", "虚拟式过去时", "命令式", "现在分词和过去分词")

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
    this.onQuery(search_word);

    function Countdown(that) { //注意this和that
      timer = setTimeout(function () {
        seconds_wait--;
        that.setData({
          seconds_wait: seconds_wait,
        })
        if (seconds_wait <= 0) {
          seconds_wait = app.globalData.time_count;
          that.setData({
            true_or_false: false,
          })
          wx.redirectTo({
            url: 'carte',
          })
        } else {
          Countdown(that);
        }
      }, 1000);
    };

  },

  onQuery: function (search_word) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters

    const _ = db.command
    db.collection('conj_all_20190722').where(_.or([{
      ow: search_word
    }])).get({
      success: function (res) {
        console.log(res.data)
        app.globalData.consult_data = res.data;
        wx.setStorageSync('consult_data', res.data);
        that.exp();
      }
    })
  },


  exp: function () {
    var consult_data = app.globalData.consult_data;

    if (consult_data == null && consult_data != search_word) {
      this.onQuery(search_word);
      var consult_data = app.globalData.consult_data;
    }

    console.log(consult_data[0].indi_imp1)

    app.globalData.ow = consult_data[0].ow

    console.log(consult_data[0].wn)
    consult_data[0].wn

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

    var random_shitai_chinois = ["直陈式 复合过去时"];
    var shitai_je = [mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1] //拼接开始
    var shitai_tu = ['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1]
    var shitai_il = ['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1]
    var shitai_nous = ['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s]
    var shitai_vous = ['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s]
    var shitai_ils = ['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s]

    console.log(verbe_auxiliaire_je)
    console.log(verbe_auxiliaire_tu)
    console.log(shitai_il)
    console.log(shitai_nous)
    console.log(shitai_vous)
    console.log(shitai_ils)

    //直陈式现在时 简单时态
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

    var random_shitai_chinois = random_shitai_chinois.concat(["直陈式 现在时"]);
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

    var random_shitai_chinois = random_shitai_chinois.concat(["直陈式 未完成过去时"]);
    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])

    //直陈式愈过去时 复合时态
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
    var random_shitai_chinois = random_shitai_chinois.concat(["直陈式 愈过去时"]);
    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


    //直陈式简单过去时 简单时态
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
    var random_shitai_chinois = random_shitai_chinois.concat(["直陈式 简单过去时"]);
    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])


    //直陈式先过去时 复合时态
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
    var random_shitai_chinois = random_shitai_chinois.concat(["直陈式 先过去时"]);
    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])

    //直陈式简单将来时 简单时态
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
    var random_shitai_chinois = random_shitai_chinois.concat(["直陈式 简单将来时"]);
    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])


    //直陈式先将来时 复合时态
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
    var random_shitai_chinois = random_shitai_chinois.concat(["直陈式 先将来时"]);
    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])

    //条件式现在时 简单时态
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

    var random_shitai_chinois = random_shitai_chinois.concat(["条件式 现在时"]);
    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])

    //条件式过去时 复合时态
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
    var random_shitai_chinois = random_shitai_chinois.concat(["条件式 过去时"]);
    var shitai_je = shitai_je.concat([mode_je + ' ' + verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat(['Il' + ' ' + verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


    //虚拟式现在时 简单时态
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

    var random_shitai_chinois = random_shitai_chinois.concat(["虚拟式 现在时"]);
    var shitai_je = shitai_je.concat([mode_je + ' ' + root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat(['Tu' + ' ' + root_tu])
    var shitai_il = shitai_il.concat(['Il' + ' ' + root_il])
    var shitai_nous = shitai_nous.concat(['Nous' + ' ' + root_nous])
    var shitai_vous = shitai_vous.concat(['Vous' + ' ' + root_vous])
    var shitai_ils = shitai_ils.concat(['Ils' + ' ' + root_ils])


    //虚拟式过去时 复合时态
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
    var random_shitai_chinois = random_shitai_chinois.concat(["虚拟式 过去时"]);
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

    // 答案选项的处理
    var idx_shitai = this.data.idx_shitai
    var right_answer = []
    right_answer.push(shitai_je[idx_shitai])
    right_answer.push(shitai_tu[idx_shitai])
    right_answer.push(shitai_il[idx_shitai])
    right_answer.push(shitai_nous[idx_shitai])
    right_answer.push(shitai_vous[idx_shitai])
    right_answer.push(shitai_ils[idx_shitai])

    app.globalData.right_answer = right_answer

    console.log(right_answer)

    this.setData({
      mode_je: mode_je,
      shitai_chinois: random_shitai_chinois[this.data.idx_shitai],
      shitai_je: shitai_je,
      shitai_tu: shitai_tu,
      shitai_il: shitai_il,
      shitai_nous: shitai_nous,
      shitai_vous: shitai_vous,
      shitai_ils: shitai_ils,
      answer_for_choose: answer_for_choose,
      right_answer: right_answer,
    })

  },

  
  hint_countdown: function(tap_word) {
    wx.showModal({
      title: '提示',
      content: '在倒计时的这段时间内，您可以回想或者口头念出它们的变位形式。时间归0之后您能看到答案以检验。',
      success: function (res) {
        if (res.confirm) {
          console.log('确定')
        } else if (res.cancel) {
          console.log('取消')
        }
      }
    })
  },

  settings: function () {
    wx.navigateBack({
      delta: 1
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
});
