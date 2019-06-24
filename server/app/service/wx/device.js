'use strict';

const Service = require('egg').Service;

class DeviceService extends Service {
    async index(offset,limit,schoolId) {
        const { model } = this.app;
        let result = await model.SysDevice.findAndCountAll({
            where:{schoolId},
            limit,
            offset:(offset-1)*limit,
            order:[['deviceId','DESC']],
            raw:true
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
    async edit(id) {
        const { model } = this.app;
        let result = await model.SysDevice.findOne({
            where:{deviceId:id},
            raw:true,
        })
        return result
    }
}

module.exports = DeviceService;
