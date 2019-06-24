'use strict';

const Service = require('egg').Service;

class TagService extends Service {
  async index(limit, offset) {
    const { model } = this.app;
    let result = await model.SysTag.findAndCountAll({
      raw: true,
      limit: limit,
      offset: (offset - 1) * 10,
      order: [['createTime', 'DESC']]
    })
    return result;
  }

  async create(name) {
    const { model } = this.app;
    let createTime = await this.ctx.service.tools.getTime();
    let result = await model.SysTag.findOne({
      where: {
        name
      },
      raw:true,
    });
    if (result) {
      return false
    } else {
      await model.SysTag.create({
        createTime,
        name
      })
      return true
    }

  }
  async destroy(id) {
    const { model } = this.app;
    return model.SysTag.destroy({
      where: {
        id
      }
    })

  }
  async update(id, name) {
    const { model } = this.app;
    let result = await model.SysTag.update({ name }, {
      where: {
        id
      }
    })

    return result;
  }
  async show() {
    const { model } = this.app;

    return '查询';
  }

  async new() {
    const { model } = this.app;
    return '创建页面';
  }
  async edit(id) {
    const { model } = this.app;
    let result = await model.SysTag.findOne({
      where: {
        id
      },
      raw:true,
    })

    return result;
  }

}

module.exports = TagService;
