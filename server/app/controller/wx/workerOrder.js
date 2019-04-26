'use strict';

const Controller = require('egg').Controller;

class WorkerOrderController extends Controller {
    async index() {
        const { ctx } = this;
        let query = ctx.request.query;
        let limit = query.limit?Number(query.limit):5;
        let offset = query.offset?Number(query.offset):1;
        let status = query.status
        ctx.validate({
          workerId:{required:true,type:'string',convertType:'string'}
        },ctx.query)
        let workerId = query.workerId;
        let result  = await  ctx.service.wx.workerOrder.index(limit,offset,workerId,status);
        ctx.body = result
      }
    
    async create() {
        const { ctx } = this;
        ctx.body = '创建';
      }
      async destroy() {
        const { ctx } = this;
        let id = ctx.params.id
        ctx.body = '删除'+id;
      }
      async update() {
        const { ctx } = this;
        let id = ctx.params.id;
        let formData = ctx.request.body;
        let status = formData.status;
        let workerId = formData.workerId;
        ctx.validate({
          status:{required:true,type:'string'},
          workerId:{required:true,type:'string'},
        },formData);
        let result
        if(formData.status!='3'){
          result = await ctx.service.wx.workerOrder.update(id,status,workerId)
        }else{
          let filelist=formData.filelist
          let remark=formData.remark
          result = await ctx.service.wx.workerOrder.update1(id,status,workerId,filelist,remark)
        }
      
        if(result){
          ctx.body=""
        }else{
          ctx.body={
            code:0,
            message:'接单失败'
          }
        }
      }
      async show() {
        const { ctx } = this;
        let id = ctx.params.id;
        let result1 = await ctx.service.wx.workerOrder.show(id,1);
        let result2 = await ctx.service.wx.workerOrder.show(id,2);
        let result3 = await ctx.service.wx.workerOrder.show(id,3);
        ctx.body={
          sure:result1,
          start:result2,
          end:result3
        }
      }
    
      async new() {
        const { ctx } = this;
        ctx.body = '创建页面';
      }
      async edit() {
        const { ctx } = this;
        let id = ctx.params.id
        let result = await ctx.service.wx.workerOrder.edit(id);
        if(result==null){
            ctx.body={
              code:0,
              message:'没数据'
            }
        }else{
          ctx.body = result
        }
          
      }
      
    
    
}

module.exports = WorkerOrderController;
