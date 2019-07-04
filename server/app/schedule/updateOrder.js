'use strict'
const Subscription = require('egg').Subscription
class UpdateOrder extends Subscription {
    static get schedule() {
        return {
            // cron: '* * * */3 * *',
            interval: '3d',
            type: 'all'
        }
    }
    async subscribe() {
        const { ctx } = this;
        console.log(`----------------------计时器-----------------------------------`)
        let arr = await ctx.service.wx.order.findUnEvaluate();
        if (arr.length > 0) {
            arr.map(async (item) => {
                item.orderId = item.id
                item.id = await ctx.service.tools.uuid()
                item.serviceAttr = 5
                item.requireSpeed = 5
                item.description = ""
                item.totalScore = 5
            });
            try {
                arr.forEach(async (item) => {
                    await ctx.service.wx.order.evaluate(item.orderId, item)
                })
                ctx.body = 'true'
            } catch (e) {
                ctx.throw('error', 500, '计时器更新失败')
            }
        }

    }
}
module.exports = UpdateOrder