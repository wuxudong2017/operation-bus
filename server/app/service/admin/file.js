'use strict';

const Service = require('egg').Service;

class FileService extends Service {
    async index(offset,limit) {
        const { model } = this.app;
        let result = await model.SysFile.findAndCountAll({
            limit,
            offset:(offset-1)*limit,
            raw:true,
            order:[['id','DESC']]
        })
        return result
    }
    async create() {
        const { model } = this.app
        let result = "创建"
        return result
    }
    async destroy() {
        const { model } = this.app;
        let result = "删除"
        return result
    }
    async update() {
        const { model } = this.app;
        let result = "修改"
        return result
    }
    async show() {
        const { model } = this.app;
        let result = "查询"
        return result
    }
  
    async new() {
        const { model } = this.app;
        let result = '创建页面';
        return result
    }
    async edit() {
        const { model } = this.app;
        let result = "修改页面"
        return result
    }
}

module.exports = FileService;
