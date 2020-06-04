// 云函数入口文件
const cloud = require('wx-server-sdk')

// 云函数入口函数
exports.main = async (event, context) => {
  cloud.init()
  const db = cloud.database();

  //这一块不动，生成日期，现在的时间
  var today_date = Date.parse(new Date())
  console.log(today_date)

  try {
    const _ = db.command
    const messages = await db.collection("subscribeMessages").where({
      repeat_date: _.lt(today_date),
      done: false
    }).get();
    console.log(messages)
    const sendPromises = messages.data.map(async message => {
      try {
        await cloud.openapi.subscribeMessage.send({
          touser: message.touser,
          page: message.touser,
          data: message.data,
          templateId: message.templateId,
        });

        return db.collection("subscribeMessages").doc(message._id).update({
          data: {
            done: true
          }
        })
      } catch (e) {
        return e;
      }
    })

    return Promise.all(sendPromises)
  } catch (err) {
    console.log(err)
    return err;
  }
}