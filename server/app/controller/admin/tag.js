'use strict';

const baseController = require('./base');

class TagController extends baseController {
    async index() {
        const { ctx } = this;
        let limit = Number(ctx.request.query.limit)
        let offset = Number(ctx.request.query.offset)
        let result = await ctx.service.admin.tag.index(limit,offset)
        ctx.body = result;
      }
    
    async create() {
        const { ctx } = this;
        let formData = ctx.request.body;
        let name  = formData.name;
        let result = await ctx.service.admin.tag.create(name);
        if(result){
          ctx.body = {
            code:1,
            message:'创建成功'
          }
        }else{
          ctx.body = {
            code:0,
            message:'名字重复'
          }
        }
      }
      async destroy() {
        const { ctx } = this;
        let id = ctx.params.id
        let result = await ctx.service.admin.tag.destroy(id);
        if(result == 1){
          ctx.body = {
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
        let id = ctx.params.id;
        let formData =  ctx.request.body;
        let name = formData.name;
        let result = await ctx.service.admin.tag.update(id,name);
        if(result == 1){
          ctx.body = {
            code:1,
            message:"编辑成功"
          }
        }else{
          ctx.body = {
            code:0,
            message:"编辑失败"
          }
        }
      }
      async show() {
        const { ctx } = this;
        let id = ctx.params.id
        ctx.body = '查询'+id;
      }
    
      async new() {
        const { ctx } = this;
        ctx.body = '创建页面';
      }
      async edit() {
        const { ctx } = this;
        let id = ctx.params.id;
        let result = await ctx.service.admin.tag.edit(id)
        ctx.body = result;
      }
    
    
}

module.exports = TagController;
