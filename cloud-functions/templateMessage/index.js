// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext();
  try {
    const result = await cloud.openapi.subscribeMessage.send({
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
      formId: 'FORMID',
      emphasisKeyword: 'thing1.DATA'
    })
    console.log(result)
    return result
  } catch (err) {
    console.log(err)
    return err
  }
}