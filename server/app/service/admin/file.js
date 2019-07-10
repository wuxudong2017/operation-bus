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
    async create(formData) {
        const { model } = this.app
        let result =await model.SysFile.create(formData)
        return result
    }
    async destroy(id) {
        const { model } = this.app;
        let result = await model.SysFile.destroy({
            where:{id}
        })
        return result
    }
    async update(id,formData) {
        const { model } = this.app;
        let result = await model.SysFile.update(formData,{
            where:{id}
        })
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
        let result = await model.SysFile.findOne({
            where:{id},
            raw:true
        })
        return result
    }
}

module.exports = FileService;
