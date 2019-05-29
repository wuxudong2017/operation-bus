'use strict';

const Service = require('egg').Service;

class DeviceService extends Service {
    async index(limit,offset,schoolId,timeRange,deviceStatus)  {
        const {model} = this.app;
        let result =await model.SysDevice.findAndCountAll({
            where:{
               $and:[schoolId?{schoolId}:null,deviceStatus!=null?{deviceStatus}:null,timeRange?{createTime:{
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
    async create(ArrayData) {
        const {model} = this.app;
        return await model.SysDevice.bulkCreate(ArrayData,{
            ignoreDuplicates:false
        });
     
      }
      async deletes(arr){
        const {model} = this.app;
        const t = await model.transaction({autocommit:true})
        try{
          for(let i=0;i<arr.length;i++){
            await model.SysDevice.destroy({
              where:{
                id:arr[i]
              }
            },{transaction:t})
          }
          await t.commit();
          return true
        }catch(e){
          console.log(e)
          await t.rollback();
          return false;
        }

       


      }

      async destroy(id) {
        const { model } = this.app;
        return await model.SysDevice.destroy({
          where:{id}
        })
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
