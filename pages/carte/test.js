const app = getApp()
const db = wx.cloud.database() //初始化数据库
const verb = db.collection('conj_all')

Page({
  data: {
    test_line: null,
    input_word_conj: null
  },

  onLoad: function() {
    var test_line = verb;
    console.log(test_line)
    this.setData({
      test_line: test_line
    })
  },

  input_word_conj: function(e) {
    var input_word_conj = e.detail.value.toLowerCase();
    console.log(e);
    this.setData({
      input_word_conj: input_word_conj
    })
    console.log(input_word_conj);
  },

  search: function() {
    var search_word = this.data.input_word_conj;
    this.onQuery(search_word);
    console.log(search_word)
  },

  onQuery: function(search_word) {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters

    const _ = db.command
    db.collection('conj_all').where(_.or([{
        sw: search_word
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
      }
    ])).get({
      success: function(res) {
        console.log(res.data)

        wx.setStorageSync('cw', res.data[0].cw);


        if (getCurrentPages().length != 0) {
          //刷新当前页面的数据
          getCurrentPages()[getCurrentPages().length - 1].onLoad()
        }

      }
    })
  },
})