'use strict';

const baseController = require('./base');

class OrderController extends baseController {
    async index() {
        const { ctx } = this;
        let limit = Number(ctx.request.query.limit)
        let offset = Number(ctx.request.query.offset)
        let status = ctx.request.query.status
        let keywords= Number(ctx.request.query.keywords);
      
        let result = await ctx.service.admin.order.index(limit,offset,status,keywords)
        ctx.body = result;
      }
    async create() {
        const { ctx } = this;
        ctx.body = '创建';
      }
      async destroy() {
        const { ctx } = this;
        let id = ctx.params.id;
        let result = await ctx.service.admin.order.destroy(id)
        if(result){
          ctx.body={
            code:1,
            message:"删除成功"
          }
        }else{
          ctx.body = {
            code:0,
            message:"删除失败"
          }
        }
      }
      async update() {
        const { ctx } = this;
        let id = ctx.params.id
        let formData = ctx.request.body;
        let workerId = formData.workerId;
        await ctx.service.admin.order.update(id,workerId)
        ctx.body = '修改';
      }
      async show() {
        const { ctx } = this;
        let id = ctx.params.id
        let result = await ctx.service.admin.order.show(id)
        ctx.body = result
       
      }
    
      async new() {
        const { ctx } = this;
        ctx.body = '创建页面';
      }
      async edit() {
        const { ctx } = this;
        let id = ctx.params.id
        ctx.body = '修改页面'+id;
      }
    
    
}

module.exports = OrderController;
