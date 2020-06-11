// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const {
      OPENID
    } = cloud.getWXContext();

    //这一块不动，生成日期，将要提醒的时间
    var repeat_date = Date.parse(new Date()) + 86400000 * 2 //毫秒
    console.log(repeat_date)

    const result = await db.collection('subscribeMessages').add({
      data: {
        touser: OPENID,
        page: 'pages/welcome/welcome',
        data: {
          thing1: {
            value: '是时候背单词、动词变位啦！'
          },
          thing2: {
            value: '点击这里立即开始学习。'
          },
          thing4: {
            value: '本消息仅出现一次，再次提醒需要重新设置。'
          },
        },
        templateId: 'rAL1dIT5XEigQKmW14Ulxw24couywZ6su6jNUhdVNn4',
        repeat_date: repeat_date,
        done: false,
      }
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}