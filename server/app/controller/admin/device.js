'use strict';

const Controller = require('egg').Controller;

class DeviceController extends Controller {
    async index() {
        const { ctx } = this;
        let query = ctx.request.query;
        let limit = Number(query.limit)
        let offset= Number(query.offset);
        let schoolId= query.schoolId
        let timeRange= query.timeRange
        let deviceStatus=  query.deviceStatus!=null||query.deviceStatus!=''?query.deviceStatus:null
        let result= await ctx.service.admin.device.index(limit,offset,schoolId,timeRange,deviceStatus) 
        ctx.body = result
      }
    
    
    async create() {
        const { ctx } = this;
        const formData = ctx.request.body;
        let postion = formData.postion;
        let ArrayData = [];
        for(let i =0;i<formData.length;i++){
            let num =Number( formData[i].number);
            formData[i].equipmentId = formData[i].id;
            formData[i].id=null;
            formData[i].postion = postion
            for(let j=0;j<num;j++){
                ArrayData.push(formData[i])
            }
        };
        console.log(JSON.stringify(ArrayData))
        const {model} = this.app;
        await model.SysDevice.bulkCreate(ArrayData,{
            ignoreDuplicates:false
        });
     
        ctx.body = ArrayData
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
        let id = ctx.params.id
        ctx.body = '查询'+id;
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

module.exports = DeviceController;
