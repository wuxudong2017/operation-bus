'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize')
class DeviceService extends Service {
    async index(schoolId,equipmentId) {
        const { model } = this.app;
        let result = await model.SysDevice.findAll({
            where:{$and:[{schoolId},equipmentId?{equipmentId}:null]},
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
    async update(deviceId,formData) {
        const { model } = this.app;
        let result = await model.SysDevice.update(formData,{
          where:{deviceId}
        })
        return result
    }
    async show(deviceId,status) {
        let { model } = this.app;
    let result = await model.SysOrder.findOne({
      include: [{
        model: model.SysEquipment,
        attributes: [],
        raw:true

      },{
        model: model.SysTag,
        attributes: [],
        raw:true
      },{
        model: model.XxJbxx,
        attributes: [],
        raw:true
      }],
      where: {
        $and:[{deviceId},status==3?{status}:{status:{$lt:3}}]
      },
      raw:true,
      attributes: {
        include: [
          [
            sequelize.col('sysEquipment.type'), 'typeName'
          ],
          [
            sequelize.col('sysEquipment.name'), 'name1'
          ],
          [
            sequelize.col('sysTag.name'), 'tagName'
          ],
          [
            sequelize.col('xxJbxx.xxmc'), 'xxmc'
          ],
        ]
      }
    })
    let orderId = result.id
    let t = await model.SysOrderStatus.findAll({
      include: [{
        model: model.SysUserInfo,
        raw: true,
        attributes: []
      }],
      where: {
        orderId
      },
      raw: true,
      attributes: {
        include: [
          [sequelize.col('sysUserInfo.name'), 'name'],
          [sequelize.col('sysUserInfo.phone'), 'phone'],
          [sequelize.col('sysUserInfo.avatar'), 'avatar'],

        ]
      }
    })
    result.remark = t
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
