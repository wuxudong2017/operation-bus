'use strict';

const Controller = require('egg').Controller;

class TeacherController extends Controller {
    async index() {
        const { ctx } = this;
        let limit = Number(ctx.request.query.limit)
        let offset= Number(ctx.request.query.offset)
        let xxJbxxId = ctx.request.query.xxJbxxId;
        let name =  ctx.request.query.name;
        let result = await ctx.service.admin.teacher.index(limit,offset,xxJbxxId,name);
        this.ctx.body = result;
      }
    async create() {
        const { ctx } = this;
       let formData = ctx.request.body;
       let name = formData.name,
       phone = formData.phone,
       username = formData.username,
       password = formData.password,
       schoolId = formData.school_id;
       let result = await ctx.service.admin.teacher.create(name,phone,username,password,schoolId);
       await ctx.service.wx.register.teacherId()
        if(result==1){
            ctx.body = {
                code:1,
                message:'新加用户成功'
            }
        }else if(result==2){
            ctx.body = {
                code:0,
                message:'用户名重复'
            }
        }else{
            ctx.body = {
                code:0,
                message:'注册失败'
            }
        }  
      }
      async destroy() {
        const { ctx } = this;
        let id = ctx.params.id;
        let result =await ctx.service.admin.teacher.destroy(id);
        await ctx.service.wx.register.teacherId()
        this.ctx.body = {
          code:result,
          message:result==1?"刪除成功":"刪除失敗"
        };
      }
      async update() {
        const { ctx } = this;
        let id = ctx.params.id;
        let formData = ctx.request.body;
        if(formData.passwordN){
          formData.password = formData.passwordN
        }else{
          formData.password = formData.password
        }
        let result = await ctx.service.admin.teacher.update(id,formData)
        await ctx.service.wx.register.teacherId()
        this.ctx.body =result
      }
      async show() {
        const { ctx } = this;
        let id = ctx.params.id;
        this.ctx.body = '查询'+id;
      }
    
      async new() {
        const { ctx } = this;
        this.ctx.body = '创建页面';
      }
      async edit() {
        const { ctx } = this;
        let id = this.ctx.params.id;
        let result = await ctx.service.admin.teacher.edit(id)
        this.ctx.body = result;
      }
}

module.exports = TeacherController;
