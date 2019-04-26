'use strict';

const Service = require('egg').Service;

class EquipmentService extends Service {
  async index(limit,offset) {
    let {model} = this.app;
    let result =await model.SysEquipment.findAndCountAll({
      where:{
        status:1
      },
      raw:true,
        limit: limit,
        offset: (offset - 1) * 10,
        order:[['createTime','DESC']]
    });
    return result
  }
  async create(formData){
    let {model} = this.app;
    return await model.SysEquipment.create(formData)
  }
  // 删除元素
  async delete(id){
    let {model} = this.app;
    return await model.SysEquipment.update({status:0},{
      where:{
        id
      }
    })
  }
  // 查询元素
  async find(id){
    let {model} = this.app;
    let result = await model.SysEquipment.findOne({
      where:{
        id
      }
    })
    return result
  }
  // 跟新元素
  async update(id,data){
    let {model} = this.app;
    return await model.SysEquipment.update(data,{
      where:{
        id
      }
    })
  }
}

module.exports = EquipmentService;
