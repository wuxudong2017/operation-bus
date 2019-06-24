'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {
    async index() {
        const { ctx } = this;
        let query = ctx.request.query;
        let offset = Number(query.offset) || 1;
        let limit =Number( query.limit) || 10;
        let result = await ctx.service.admin.file.index(offset,limit)
        ctx.body = result
      }
    async create() {
        const {ctx} = this
        ctx.body = "创建"
      }
      async destroy() {
        const { ctx } = this;
        let id = ctx.params.id
        ctx.body = "删除" + id
      }
      async update() {
        const { ctx } = this;
        let id = ctx.params.id
        ctx.body = "修改" +id
      }
      async show() {
        const { ctx } = this;
        let id = ctx.params.id
        ctx.body ="查询"+id
      }
     
      async new() {
        const { ctx } = this;
        ctx.body = '创建页面';
      }
      async edit() {
        const { ctx } = this;
        let id = ctx.params.id
        ctx.body ="修改页面"+id
      }
}

module.exports = FileController;
