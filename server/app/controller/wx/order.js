'use strict';

const BaseController = require('./base');

class OrderController extends BaseController {
    async index() {
        const { ctx } = this;
        let query = ctx.request.body;
        let limit = query.limit || 10;
        let offset = query.offset ||1
        let result = await ctx.service.wx.order.index(limit,offset);
        ctx.body = result;
      }
    
    async create() {
        const { ctx } = this;
        let formData = ctx.request.body;
        ctx.validate({
          deviceId:{required:false,type:'string',coverType:'int'},
          equipmentId:{required:true,type:'string',coverType:'string'},
          schoolId:{required:true,type:'string',coverType:'string'},
          tagId:{required:true,type:'string',coverType:'string'},
          userId:{required:true,type:'string',coverType:'string'},
        },formData)
        formData.picture = JSON.stringify(formData.picture)||null;
        let result = await ctx.service.wx.order.create(formData)
        ctx.body = result;
      }
      async destroy() {
        const { ctx } = this;
        let id = ctx.params.id;
        let result = await ctx.service.wx.order.delete(id);
        if(result){
          ctx.body = result;
        }else{
          ctx.body = {
            code:0,
            message:'删除失败'
          }
        }
      }
      async update() {
        const { ctx } = this;
        let id = ctx.params.id;
        let formData = ctx.request.body;
        formData.orderId = id
        formData.orderStatus = formData.status;
        formData.picture = JSON.stringify(formData.picture)
        let result = await ctx.service.wx.order.update(id,formData)
        ctx.body = result;
      }
      async show() {
        const { ctx } = this;
        let id = ctx.params.id
        let result = await ctx.service.wx.order.show(id);
        ctx.body = result;
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
      // 维修端工单获取
      async workOrder(){
        let {ctx} = this;
        let query = ctx.request.query;
        let jobNumber = query.workId;
        let result = await ctx.service.wx.order.workOrder(jobNumber)
        ctx.body = jobNumber

      }
      // 评级工单
      async evaluate(){
        const {ctx} = this;
        let orderId = ctx.params.id;
        let formData = ctx.request.body;
        ctx.validate({
          serviceAttr:{required:true,type:'int',coverType:'int'},
          requireSpeed:{required:true,type:'int',coverType:'int'},
          description:{required:false,type:'string',coverType:'string'},
          totalScore:{required:true,type:'int',coverType:'int'},
          workerId:{required:true,type:'int',coverType:'int'},
        },formData)
        let result = await ctx.service.wx.order.evaluate(orderId,formData);
        ctx.body  =result;
      }



    
    
}

module.exports = OrderController;
