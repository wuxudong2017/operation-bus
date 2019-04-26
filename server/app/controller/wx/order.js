'use strict';

const BaseController = require('./base');

class OrderController extends BaseController {
    async index() {
        const { ctx } = this;
        let query = ctx.request.body;
        let limit = query.limit || 10;
        let offset = query.offset ||1
        let result = await ctx.service.wx.order.index(limit,offset);
        this.ctx.body = result;
      }
    
    async create() {
        const { ctx } = this;
        let formData = ctx.request.body;
        let equipmentId = formData.equipmentId,
        schoolId = formData.schoolId,
        faultDesc = formData.faultDesc,
        tagId = formData.tagId,
        userId = formData.userId,
        picture = JSON.stringify(formData.picture)||null;
        let result = await ctx.service.wx.order.create(equipmentId,schoolId,faultDesc,tagId,userId,picture)
        this.ctx.body = '创建';
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
        this.ctx.body = result;
      }
      async show() {
        const { ctx } = this;
        let id = ctx.params.id
        let result = await ctx.service.wx.order.show(id);
        this.ctx.body = result;
      }
    
      async new() {
        const { ctx } = this;
        this.ctx.body = '创建页面';
      }
      async edit() {
        const { ctx } = this;
        let id = this.ctx.params.id
        this.ctx.body = '修改页面'+id;
      }
      // 维修端工单获取
      async workOrder(){
        let {ctx} = this;
        let query = ctx.request.query;
        let jobNumber = query.workId;
        let result = await ctx.service.wx.order.workOrder(jobNumber)
        ctx.body = jobNumber

      }



    
    
}

module.exports = OrderController;
