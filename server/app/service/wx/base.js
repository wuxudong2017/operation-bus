'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize')
class BaseService extends Service {
  async typeEquipment() {
    let { model } = this.app
    return model.SysEquipment.findAll({
      where: {
        status: 1
      },
      raw: true,
      order: [['createTime', 'ASC']]

    })
  }
  async tagType() {
    let { model } = this.app
    return await model.SysTag.findAll({
      raw: true,
    })
  }
  async getOrderStatus(orderId) {
    const { model } = this.app;
    let result = await model.SysOrderStatus.findAll({
      include: [{
        model: model.SysUserInfo,
        attributes: []
      }],
      where: {
        orderId
      },
      attributes: {
        include: [
          [Sequelize.col('sysUserInfo.name'), 'name']
        ],
        exclude: ['id', 'orderContent']
      },
      raw: true,
      order: [['updateTime', 'ASC']]
    })
    return result
  }
  async getSchoolEqu(schoolId) {
    const { model } = this.app;
    let result = await model.SysDevice.findAll({
      where: { schoolId },
      group: 'equipmentId',
      attributes: ['equipmentId', 'type', 'awatar',[Sequelize.fn('count', '*'), 'count']],
      raw: true
    })
    return result
  }
  // 获取文档
  async getFile(type){
    const {model} = this.app;
    let result = await model.SysFile.findAll({
      where:{type},
      raw:true,
    })
    return result;
  }
  // test 
  async test(month){
    const {model} = this.app;
    // 设备数量和设备故障总数
    let result = await model.Evaluate.count({
      group:'worker_id',
      attributes:['workerId',[Sequelize.fn('sum',Sequelize.col('service_attr')),'serviceAttr'],
      [Sequelize.fn('sum',Sequelize.col('require_speed')),'requireSpeed'],
      [Sequelize.fn('sum',Sequelize.col('total_score')),'totalScore'],
      [Sequelize.col('sysUserInfo.name'),'name']],
      where:{
        createTime:{
          $between:month
        }
      },
      include:[{
        model:model.SysUserInfo,
        raw:true,
        attributes:[]
      }]  
    })
    return result
  }


}
module.exports = BaseService;
