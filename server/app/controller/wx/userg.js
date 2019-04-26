'use strict';

'use strict';

const BaseController = require('./base');

class UsergController extends BaseController {
  async login() {
    let { ctx } = this;
    let formData = ctx.request.body;
    let username = formData.username;
    let password = formData.password;
    let result = await ctx.service.wx.userg.find(username, password);
    ctx.body = result
  }
  async index() {
    const { ctx } = this;
    let query = ctx.request.query;
    let userId = query.userId;
    let limit = query.limit?Number(query.limit):10;
    let offset = query.offset?Number(query.offset):1;
    let status = query.status?query.status:1
    let result = await ctx.service.wx.userg.index(userId,limit,offset,status)
    ctx.body = result;
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
    let id = ctx.params.id
    ctx.body = '修改'+id;
  }
  async show() {
    const { ctx } = this;
    let id = ctx.params.id;
    let result = await ctx.service.wx.userg.getUserInfo(id);
    ctx.body =result
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

module.exports = UsergController;
