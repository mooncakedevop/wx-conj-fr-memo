const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('conj_all_20190722')
const avoir_etre = require('../../data/avoir_etre.js')
const word_test = require('../../data/pour_word_test.js')

Page({
  data: {

    content: null,
    idx_shitai: null,
    answer_for_choose: null,
    right_answer: null,
    current_input: null,
    focus: false,

    is_bg_green: [],
    value_answer: [" ", " ", " ", " ", " ", " "],
    iconType: [" ", " ", " ", " ", " ", " "],
    iconColor: [" ", " ", " ", " ", " ", " "],

    shitai_je: null,
    shitai_tu: null,
    shitai_il: null,
    shitai_nous: null,
    shitai_vous: null,
    shitai_ils: null,

    tag_classic: true,
    tag_selected: true,
    tag_50: true,
    tag_100: true,
    tag_230: true,

    mode_je: 'Je'
  },

  onLoad: function() {

    wx.showToast({
      title: '加载中',
      image: '/style/paper-plane.png',
      icon: 'sucess',
      duration: 500,
      mask: true,
    })

    console.log(app.globalData.isChecked1)
    console.log(app.globalData.isChecked1_selected)
    console.log(app.globalData.isChecked1_50)
    console.log(app.globalData.isChecked1_100)
    console.log(app.globalData.isChecked1_230)

    if (app.globalData.isChecked1 == '') {
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

    var shitai_choose = [0, 1, 6] //初始设置基础时态
    shitai_choose = shitai_choose.concat(app.globalData.advanced_shitai).concat(app.globalData.extra_shitai).concat(app.globalData.inusuel_shitai) //拼接四个时态的数组
    console.log(shitai_choose)
    var idx_shitai_num = Math.round(Math.random() * (shitai_choose.length - 1)) //统计新的数组长度，并以此为范围取随机数
    var idx_shitai = shitai_choose[idx_shitai_num] //选择新的数组中idx_shitai_num-1个元素，该元素为下面switch的case值（时态）
    console.log(idx_shitai_num)

    var is_bg_green = ["bg-green", " ", " ", " ", " ", " "] //先设置第一个绿

    this.setData({
      content: mot_test, //最终单词
      idx_shitai: idx_shitai, //最终时态
      is_bg_green: is_bg_green,
    })
    console.log(idx_shitai)
    this.search()

  },


  search: function() {
    var search_word = this.data.content;
    this.onQuery(search_word);
  },

  onQuery: function(search_word) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters

    const _ = db.command
    db.collection('conj_all_20190722').where(_.or([{
      ow: search_word
    }])).get({
      success: function(res) {
        console.log(res.data)
        app.globalData.consult_data = res.data;
        wx.setStorageSync('consult_data', res.data);
        that.exp();
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
    var shitai_je = [verbe_auxiliaire_je + ' ' + consult_data[0].past_part1] //拼接开始
    var shitai_tu = [verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1]
    var shitai_il = [verbe_auxiliaire_il + ' ' + consult_data[0].past_part1]
    var shitai_nous = [verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s]
    var shitai_vous = [verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s]
    var shitai_ils = [verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s]

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
    var shitai_je = shitai_je.concat([root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat([root_tu])
    var shitai_il = shitai_il.concat([root_il])
    var shitai_nous = shitai_nous.concat([root_nous])
    var shitai_vous = shitai_vous.concat([root_vous])
    var shitai_ils = shitai_ils.concat([root_ils])

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
    var shitai_je = shitai_je.concat([root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat([root_tu])
    var shitai_il = shitai_il.concat([root_il])
    var shitai_nous = shitai_nous.concat([root_nous])
    var shitai_vous = shitai_vous.concat([root_vous])
    var shitai_ils = shitai_ils.concat([root_ils])

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
    var shitai_je = shitai_je.concat([verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat([verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat([verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat([verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat([verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat([verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


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
    var shitai_je = shitai_je.concat([root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat([root_tu])
    var shitai_il = shitai_il.concat([root_il])
    var shitai_nous = shitai_nous.concat([root_nous])
    var shitai_vous = shitai_vous.concat([root_vous])
    var shitai_ils = shitai_ils.concat([root_ils])


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
    var shitai_je = shitai_je.concat([verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat([verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat([verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat([verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat([verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat([verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])

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
    var shitai_je = shitai_je.concat([root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat([root_tu])
    var shitai_il = shitai_il.concat([root_il])
    var shitai_nous = shitai_nous.concat([root_nous])
    var shitai_vous = shitai_vous.concat([root_vous])
    var shitai_ils = shitai_ils.concat([root_ils])


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
    var shitai_je = shitai_je.concat([verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat([verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat([verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat([verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat([verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat([verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


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
    var shitai_je = shitai_je.concat([root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat([root_tu])
    var shitai_il = shitai_il.concat([root_il])
    var shitai_nous = shitai_nous.concat([root_nous])
    var shitai_vous = shitai_vous.concat([root_vous])
    var shitai_ils = shitai_ils.concat([root_ils])


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
    var shitai_je = shitai_je.concat([verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat([verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat([verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat([verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat([verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat([verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


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
    var shitai_je = shitai_je.concat([root_je]) //拼接开始
    var shitai_tu = shitai_tu.concat([root_tu])
    var shitai_il = shitai_il.concat([root_il])
    var shitai_nous = shitai_nous.concat([root_nous])
    var shitai_vous = shitai_vous.concat([root_vous])
    var shitai_ils = shitai_ils.concat([root_ils])


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
    var shitai_je = shitai_je.concat([verbe_auxiliaire_je + ' ' + consult_data[0].past_part1]) //拼接开始
    var shitai_tu = shitai_tu.concat([verbe_auxiliaire_tu + ' ' + consult_data[0].past_part1])
    var shitai_il = shitai_il.concat([verbe_auxiliaire_il + ' ' + consult_data[0].past_part1])
    var shitai_nous = shitai_nous.concat([verbe_auxiliaire_nous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_vous = shitai_vous.concat([verbe_auxiliaire_vous + ' ' + consult_data[0].past_part1 + mode_s])
    var shitai_ils = shitai_ils.concat([verbe_auxiliaire_ils + ' ' + consult_data[0].past_part1 + mode_s])


    console.log(shitai_je)
    console.log(shitai_tu)
    console.log(random_shitai_chinois)
    console.log(this.data.idx_shitai)


    // 答案选项的处理
    var idx_shitai = this.data.idx_shitai
    var right_answer = []
    right_answer.push(shitai_je[idx_shitai])
    right_answer.push(shitai_tu[idx_shitai])
    right_answer.push(shitai_il[idx_shitai])
    right_answer.push(shitai_nous[idx_shitai])
    right_answer.push(shitai_vous[idx_shitai])
    right_answer.push(shitai_ils[idx_shitai])

    var answer = shitai_je.concat(shitai_tu).concat(shitai_il).concat(shitai_nous).concat(shitai_vous).concat(shitai_ils) //所有答案总数

    var answer_for_choose = []
    for (var i = 0; i < 14; i++) {
      var answer_idx = Math.round(Math.random() * (answer.length - 1))
      answer_for_choose.push(answer[answer_idx])
    }
    var answer_for_choose = answer_for_choose.concat(right_answer)

    console.log(answer_for_choose)

    function shuffle(array) {
      let length = array.length;
      while (length) {
        let position = Math.floor(Math.random() * length--);
        [array[position], array[length]] = [array[length], array[position]];
      }
    }

    shuffle(answer_for_choose)

    console.log(right_answer)
    console.log(answer_for_choose)
    console.log(answer)

    app.globalData.shitai_je = shitai_je
    app.globalData.shitai_tu = shitai_tu
    app.globalData.shitai_il = shitai_il
    app.globalData.shitai_nous = shitai_nous
    app.globalData.shitai_vous = shitai_vous
    app.globalData.shitai_ils = shitai_ils



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

  choosed_answer: function(e) {
    var current_position = this.data.is_bg_green.indexOf("bg-green")
    var value_answer = this.data.value_answer
    value_answer[current_position] = this.data.answer_for_choose[e.target.id]

    var is_bg_green = [" ", " ", " ", " ", " ", " "]
    if (current_position < 5) {
      is_bg_green[current_position + 1] = "bg-green" //向下一格高亮
    }

    this.setData({
      value_answer: value_answer,
      is_bg_green: is_bg_green
    })

    //如果填满了
    var that = this
    if (value_answer[0] != " " && value_answer[1] != " " && value_answer[2] != " " && value_answer[3] != " " && value_answer[4] != " " && value_answer[5] != " ") {
      console.log("ergbvsrtgbnsdrtgyhn")
      that.check()
    }

    console.log(current_position)
    console.log(value_answer)
  },

  input_je: function() {
    var is_bg_green = ["bg-green", " ", " ", " ", " ", " "]
    this.setData({
      is_bg_green: is_bg_green
    })
  },

  input_tu: function(e) {
    var is_bg_green = [" ", "bg-green", " ", " ", " ", " "]
    this.setData({
      is_bg_green: is_bg_green
    })
  },

  input_il: function(e) {
    var is_bg_green = [" ", " ", "bg-green", " ", " ", " "]
    this.setData({
      is_bg_green: is_bg_green
    })
  },

  input_nous: function(e) {
    var is_bg_green = [" ", " ", " ", "bg-green", " ", " "]
    this.setData({
      is_bg_green: is_bg_green
    })
  },

  input_vous: function(e) {
    var is_bg_green = [" ", " ", " ", " ", "bg-green", " "]
    this.setData({
      is_bg_green: is_bg_green
    })
  },

  input_ils: function(e) {
    var is_bg_green = [" ", " ", " ", " ", " ", "bg-green"]
    this.setData({
      is_bg_green: is_bg_green
    })
  },

  check: function() {
    var iconType = this.data.iconType;
    var iconColor = this.data.iconColor;

    if (this.data.value_answer[0] == this.data.right_answer[0]) {
      var vrai_je = 1
      iconType[0] = 'success'
      iconColor[0] = '#44b549'
    } else {
      iconType[0] = 'warn'
      iconColor[0] = '#E64340'
    }

    console.log(iconType)
    console.log(iconColor)

    if (this.data.value_answer[1] == this.data.right_answer[1]) {
      var vrai_tu = 1
      iconType[1] = 'success'
      iconColor[1] = '#44b549'
    } else {
      iconType[1] = 'warn'
      iconColor[1] = '#E64340'
    }

    if (this.data.value_answer[2] == this.data.right_answer[2]) {
      var vrai_il = 1
      iconType[2] = 'success'
      iconColor[2] = '#44b549'
    } else {
      iconType[2] = 'warn'
      iconColor[2] = '#E64340'
    }

    if (this.data.value_answer[3] == this.data.right_answer[3]) {
      var vrai_nous = 1
      iconType[3] = 'success'
      iconColor[3] = '#44b549'
    } else {
      iconType[3] = 'warn'
      iconColor[3] = '#E64340'
    }

    if (this.data.value_answer[4] == this.data.right_answer[4]) {
      var vrai_vous = 1
      iconType[4] = 'success'
      iconColor[4] = '#44b549'
    } else {
      iconType[4] = 'warn'
      iconColor[4] = '#E64340'
    }

    if (this.data.value_answer[5] == this.data.right_answer[5]) {
      var vrai_ils = 1
      iconType[5] = 'success'
      iconColor[5] = '#44b549'
    } else {
      iconType[5] = 'warn'
      iconColor[5] = '#E64340'
    }

    this.setData({
      iconType: iconType,
      iconColor: iconColor,

    })

    if (vrai_je == 1 && vrai_tu == 1 && vrai_il == 1 && vrai_nous == 1 && vrai_vous == 1 && vrai_ils == 1) {

      wx.showToast({
        title: '答对了！',
        image: '/style/dianzan.png',
        icon: 'sucess',
        duration: 2000,
        mask: true,
      })

      this.setData({
        iconType: [" ", " ", " ", " ", " ", " "],
        iconColor: [" ", " ", " ", " ", " ", " "],
        value_answer: [" ", " ", " ", " ", " ", " "],
      })

      setTimeout(function () {
        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }
      }, 2000)

    }
  },

  hint: function() {
    console.log(this.data.shitai_je)
    wx.showModal({
      title: '提示',
      content: '根据单词和语式时态选择合适的动词变位'+'\r\n' + this.data.right_answer[0] + '\r\n' + this.data.right_answer[1] + '\r\n' + this.data.right_answer[2] +'\r\n' + this.data.right_answer[3] + '\r\n' + this.data.right_answer[4] + '\r\n' + this.data.right_answer[5],
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    })
  },

  next_conj: function() {
    this.setData({
      iconType: [" ", " ", " ", " ", " ", " "],
      iconColor: [" ", " ", " ", " ", " ", " "],
      value_answer: [" ", " ", " ", " ", " ", " "],
    })

    wx.showToast({
      title: '加载中',
      image: '/style/paper-plane.png',
      icon: 'sucess',
      duration: 500,
      mask: true,
    })

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }

  },


  onShareAppMessage: function(res) {
    return {
      title: '搞定法语动词变位就靠它了！😱',
      path: 'pages/welcome/welcome',
      imageUrl: '',
      success: function(shareTickets) {
        console.info(shareTickets + '成功');
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


})