'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
    async index() {
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
        console.log(res)
        ctx.socket.emit('message', res);
    }
    async online() {
        // modelMessage.sendOfflineMessage(socket, data.userId);
    }
}

module.exports = ChatController;
