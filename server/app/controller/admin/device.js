'use strict';

const Controller = require('egg').Controller;

class DeviceController extends Controller {
    async index() {
        const { ctx } = this;
        let query = ctx.request.query;
        let limit = Number(query.limit)
        let offset= Number(query.offset);
        let schoolId= query.schoolId
        let timeRange= query.timeRange;
        let deviceStatus=  query.deviceStatus!=null?query.deviceStatus:null
        let result= await ctx.service.admin.device.index(limit,offset,schoolId,timeRange,deviceStatus) 
        ctx.body = result
      }
    async create() {
        const { ctx } = this;
        const formData = ctx.request.body;
        console.log(formData)
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
       await ctx.service.admin.device.create(ArrayData)
        ctx.body = "success"
      }
      async destroy() {
        const { ctx } = this;
        let id = ctx.params.id
        try{
          await ctx.service.admin.device.destroy(id);
          ctx.body = {
            code:1,
            message:"删除成功"
          }
        }catch(e){

        }
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
      // 批量删除
      async deletes(){
        const {ctx} =this;
        let formData = ctx.request.body;
        if(formData instanceof Array){
         let result = await ctx.service.admin.device.deletes(formData);
         if(result){
          ctx.body = {
            code:1,
            message:"批量删除成功"
          }
         }else{
          ctx.body={
            code:0,
            message:'批量删除失败'
          }
         }
        }else{
          ctx.body={
            code:0,
            message:'参数错误'
          }
        }
       
      }
    
    
}

module.exports = DeviceController;
