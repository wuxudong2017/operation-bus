'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize')
class OrderService extends Service {
  async index(limit, offset) {
    let { model } = this.app;
  
    let result = await model.SysOrder.findAndCountAll({
      include: [{
        model: model.SysEquipment,
        attributes: [],
      }],
      attributes: {
        include: [[
          sequelize.col('sysEquipment.type'), 'type'
        ]]
      },
      limit: limit,
      offset: (offset - 1) * 10,
      raw: true,
      order: [['createTime', 'DESC']]
    })
    return result;
  }
  async create(equipmentId, schoolId, faultDesc, tagId, userId, picture) {
    let { model } = this.app;
    const t = await model.transaction({ autocommit: true });
    let id = await this.ctx.service.tools.setOrderId();
    let createTime = await this.ctx.service.tools.getTime()
    try {
      await model.SysOrder.create({
        id, equipmentId, schoolId, faultDesc, tagId, userId, picture, createTime, updateTime: createTime,
        status: '0'
      })
      await model.SysOrderStatus.create({
        orderId: id,
        orderStatus: '0',
        updateTime: createTime
      })

      await t.commit()
      return true
    } catch (e) {
      console.log(e)
      await t.rollback();
      return false


    }
  }
  async show(id) {
    let { model } = this.app;
    let result = await model.SysOrder.findOne({
      include: [{
        model: model.SysEquipment,
        attributes: [],

      }, {
        model: model.SysTag,
        attributes: []
      }],
      where: {
        id
      },
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
          ]
        ]
      }
    })
    let t = await model.SysOrderStatus.findAll({
      include: [{
        model: model.SysUserInfo,
        raw: true,
        attributes: []
      }],
      where: {
        orderId: id
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
  // 工单编辑
  async update(id, formData) {
    let { model } = this.app;
    let result;
    let t = await model.transaction({ autocommit: true });
    let updateTime = await this.ctx.service.tools.getTime();
    formData.updateTime = updateTime
    if (formData.status ==3) {
      try {
        await model.SysOrder.update(formData, {
          where: {
            id
          }
        }, { transaction: t })
        await model.SysOrderStatus.create(formData, {
            where: {
              orderId: id
            }
          }, { transaction: t })
        await t.commit()
        return true
      } catch (e) {
        console.log(e)
        await t.rollback();
        return false
      }

    }else{
     return  await model.SysOrder.update(formData, {
        where: {
          id
        }
      })
    }

    return result
  }
  // 删除工单
  async delete(id) {
    let { model } = this.app;
    const t = await model.transaction({ autocommit: true });
    try {
      await model.SysOrder.destroy({
        where: {
          id
        }
      }, { transaction: t })
      await model.SysOrderStatus.destroy({
        where: {
          orderId: id
        }
      }, { transaction: t })
      await t.commit()
      return true;
    } catch (e) {
      console.log(e)
      await t.rollback()
      return false;
    }
  }
  // 维修人员工单获取
  async workOrder(jobNumber){
    let {model} = this.app;
  
  }
}

module.exports = OrderService;
