'use strict';

const Controller = require('egg').Controller;

class FileController extends Controller {
  async index() {
    const { ctx } = this;
    let query = ctx.request.query;
    let offset = Number(query.offset) || 1;
    let limit = Number(query.limit) || 10;
    let result = await ctx.service.admin.file.index(offset, limit)
    ctx.body = result
  }
  async create() {
    const { ctx } = this;
    let formData = ctx.request.body;
    ctx.validate({
      name: { required: true, type: 'string' },
      status: { required: true, type: 'int' },
      type: { required: true, type: 'int' },
      url: { required: true, type: 'string' },
    },formData);
    let url = formData.url;
    let t=  url.substring(url.length,url.lastIndexOf('.')+1);
    if(t.indexOf('doc')>-1){
      formData.suffix ="doc"
    }else if(t.indexOf('ppt')>-1){
      formData.suffix ="ppt"
    }else{
      formData.suffix ="pdf"
    }
    let result = await ctx.service.admin.file.create(formData)
    ctx.body = "创建"
  }
  async destroy() {
    const { ctx } = this;
    let id = ctx.params.id;
    let result  = await ctx.service.admin.file.destroy(id)
    ctx.body = result
  }
  async update() {
    const { ctx } = this;
    let id = ctx.params.id;
    let formData = ctx.request.body
    let result = await ctx.service.admin.file.update(id,formData)
    ctx.body = result
  }
  async show() {
    const { ctx } = this;
    let id = ctx.params.id
    ctx.body = "查询" + id
  }

  async new() {
    const { ctx } = this;
    ctx.body = '创建页面';
  }
  async edit() {
    const { ctx } = this;
    let id = ctx.params.id;
    let result = await ctx.service.admin.file.edit(id)
    ctx.body =result
  }
}

module.exports = FileController;
