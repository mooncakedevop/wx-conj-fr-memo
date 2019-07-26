const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('conj_all_20190722')
const avoir_etre = require('../../data/avoir_etre.js')
const word_test = require('../../data/pour_word_test.js')

Page({
  data: {

    input_je: null,
    input_tu: null,
    input_il: null,
    input_nous: null,
    input_vous: null,
    input_ils: null,
    content: null,
    idx_shitai: null,
    answer: null,

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
    var idx_shitai_num = Math.floor(Math.random() * (shitai_choose.length - 2 + 1) + 2) //统计新的数组长度，并以此为范围取随机数
    var idx_shitai = shitai_choose[idx_shitai_num - 1] //选择新的数组中idx_shitai_num-1个元素，该元素为下面switch的case值（时态）
    console.log(idx_shitai)


    this.setData({
      content: mot_test, //最终单词
      idx_shitai: idx_shitai, //最终时态
    })
    console.log(mot_test)
    console.log(idx_shitai)
    this.search()

  },


  search: function () {
    var search_word = this.data.content;
    this.onQuery(search_word);
  },

  onQuery: function (search_word) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters

    const _ = db.command
    db.collection('conj_all_20190722').where(_.or([{
      sw: search_word
    }])).get({
      success: function (res) {
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


    var answer = shitai_je
    app.globalData.shitai_je = shitai_je
    app.globalData.shitai_tu = shitai_tu
    app.globalData.shitai_il = shitai_il
    app.globalData.shitai_nous = shitai_nous
    app.globalData.shitai_vous = shitai_vous
    app.globalData.shitai_ils = shitai_ils

    console.log(shitai_je)
    console.log(shitai_tu)
    console.log(random_shitai_chinois)
    console.log(this.data.idx_shitai)

    this.setData({
      mode_je: mode_je,
      shitai_chinois: random_shitai_chinois[this.data.idx_shitai],
      shitai_je: shitai_je,
      shitai_tu: shitai_tu,
      shitai_il: shitai_il,
      shitai_nous: shitai_nous,
      shitai_vous: shitai_vous,
      shitai_ils: shitai_ils,
      answer: answer,
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