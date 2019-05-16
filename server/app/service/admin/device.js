'use strict';

const Service = require('egg').Service;

class DeviceService extends Service {
    async index(limit,offset,schoolId,timeRange,deviceStatus)  {
        const {model} = this.app;
        let result =await model.SysDevice.findAndCountAll({
            where:{
               $and:[schoolId?{schoolId}:null,deviceStatus?{deviceStatus}:null,timeRange?{createTime:{
                $between:timeRange.split(',')
               }}:null] 
            },
            raw:true,
            limit: limit,
            offset: (offset - 1) * 10,
            order:[['createTime','DESC']]
        });
        return result
      }
    async create() {
        const { model } = this.app;
        return '创建';
      }
      async destroy() {
        const { model } = this.app;
      
        return '删除';
      }
      async update() {
        const { model } = this.app;
      
        return '修改';
      }
      async show() {
        const { model } = this.app;
      
        return '查询';
      }
    
      async new() {
        const { model } = this.app;
        return '创建页面';
      }
      async edit() {
        const { model } = this.app;
      
        return '修改页面';
      }



}

module.exports = DeviceService;
