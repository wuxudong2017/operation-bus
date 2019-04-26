'use strict';

const Service = require('egg').Service;
const Sequelize=require('sequelize')
class BaseService extends Service {
  async typeEquipment() {
      let {model} = this.app
     return model.SysEquipment.findAll({
       where:{
         status:1
       },
       order:[['createTime','ASC']]

     })
  }
  async tagType(){
    let {model} = this.app
      return await model.SysTag.findAll({
          
      })
  }
  async getOrderStatus(orderId){
    const {model} = this.app;
    let result = await model.SysOrderStatus.findAll({
      include:[{
        model:model.SysUserInfo,
        attributes:[]
      }],
      where:{
        orderId
      },
      attributes:{
        include:[
          [Sequelize.col('sysUserInfo.name'),'name']
        ],
        exclude:['id','orderContent']
      },
      raw:true,
      order:[['updateTime','ASC']]
    })
    return result
  }
}
module.exports = BaseService;
