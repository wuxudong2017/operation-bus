'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
    async index(){
        const {ctx,app} = this;
        let workerId =  ctx.packet[1].workerId;
        setInterval(async ()=>{
            let message = await app.redis.get('msg').lrange(workerId,0,-1);
            await ctx.socket.emit(workerId, message);
            await ctx.app.redis.get('msg').del(workerId)
        },1000*30)
    }
}
/**
 * // 地图定位
 *   async index() {
        const {ctx}= this
        ctx.socket.emit('res', 'test');
    }
    async message() {
        const {ctx,app}= this;
        let arr = ctx.packet[1];
        let res =[]
        for(let i=0;i<arr.length;i++){
           let result =  await app.redis.get('geo').get(arr[i]);
           if(result!=null){
            res.push(JSON.parse(result));
           }
        }
        ctx.socket.emit('news', res);
    }
    async online() {
        modelMessage.sendOfflineMessage(socket, data.userId);
    }
 */
module.exports = ChatController;
