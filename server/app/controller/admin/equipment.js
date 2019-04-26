'use strict';

const Controller = require('egg').Controller;

class EquipmentController extends Controller {
 
async index() {
    const { ctx } = this;
    let limit = Number(ctx.request.query.limit)
    let offset= Number(ctx.request.query.offset);
    let result= await ctx.service.admin.equipment.index(limit,offset) 
    ctx.body = result
  }

async create() {
    const { ctx } = this;
    let formData = ctx.request.body;
    let id = await ctx.service.tools.uuid();
    let createTime = await ctx.service.tools.getTime();
    formData.id = id;
    formData.createTime=createTime
    let result = await ctx.service.admin.equipment.create(formData);
    if(result){
      ctx.body = {
        code:1,
        message:'添加设备类型成功'
      }
    }else{
      ctx.body = {
        code:0,
        message:'添加设备类型失败'
      }
    }
   
  }
  async destroy() {
    const { ctx } = this;
    let id = ctx.params.id
    try{
     let result =  await ctx.service.admin.equipment.delete(id);
      ctx.body = result;
    }catch(e){

    }
   
  }
  async update() {
    const { ctx } = this;
    let id = ctx.params.id;
    let formData = ctx.request.body;
    let result = await ctx.service.admin.equipment.update(id,formData);
    ctx.body = result
    
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
    let id = ctx.params.id;
    let result = await ctx.service.admin.equipment.find(id);
    ctx.body = result
  }


}

module.exports = EquipmentController;
