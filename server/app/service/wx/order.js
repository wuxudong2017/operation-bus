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
  async create(formData) {
    let { model } = this.app;
    const t = await model.transaction({ autocommit: true });
    let id = await this.ctx.service.tools.setOrderId();
    let createTime = await this.ctx.service.tools.getTime()
    try {
      await model.SysOrder.create({
        id,
        ...formData,
        status: '0',
        createTime
      })
      await model.SysOrderStatus.create({
        orderId: id,
        orderStatus: '0',
        updateTime: createTime
      })
      await model.FaultList.create({ ...formData, createTime }, {
        include: [{
          model: model.SysEquipment,
        }],
        // fields: [[sequelize.col('sysEquipment.name'),'name']]
      });
      if (formData.deviceId) {
        let data1 = await model.SysDevice.findOne({
          where: { deviceId: formData.deviceId },
          raw: true
        })
        await model.SysDevice.update({ deviceStatus: 0, numG: Number(data1.numG) + 1 }, {
          where: { deviceId: formData.deviceId }
        }, { transaction: t });
      }
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
        raw: true

      }, {
        model: model.SysTag,
        attributes: [],
        raw: true
      },{
        model: model.Evaluate,
        attributes: [],
        raw: true
      },{
        model: model.XxJbxx,
       attributes: [],
        raw: true

      }],
      where: {
        id
      },
      raw: true,
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
         
          [
            sequelize.col('evaluate.description'), 'evaluateDesc'
          ],
          [
            sequelize.col('evaluate.require_speed'), 'requireSpeed'
          ],
          [
            sequelize.col('evaluate.total_score'), 'totalScore'
          ],
          [
            sequelize.col('evaluate.service_attr'), 'serviceAttr'
          ],
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
      },
      order:[['updateTime','ASC']]
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
    if (formData.status == 3) {
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
        }, { transaction: t });
        if (formData.deviceId) {
          let data1 = await model.SysDevice.findOne({
            where: { deviceId: formData.deviceId },
            raw: true
          })
          await model.SysDevice.update({ deviceStatus: 0, numG: Number(data1.numG) + 1 }, {
            where: { deviceId: formData.deviceId }
          }, { transaction: t });
        }
        await t.commit()
        return true
      } catch (e) {
        await t.rollback();
        return false
      }
    } else {
      return await model.SysOrder.update(formData, {
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

      await t.rollback()
      return false;
    }
  }
  // 维修人员工单获取
  async workOrder(jobNumber) {
    let { model } = this.app;
  }
  // 评价得分
  async evaluate(orderId, fromData) {
    const { model } = this.app;
    const { ctx } = this;
    let id = await ctx.service.tools.uuid()
    let result = await model.Evaluate.findOrCreate({
      where: { orderId },
      defaults: { id, orderId, ...fromData }
    })
    return result;
  }
  // 查询未评价单子
  async findUnEvaluate() {
    const { model } = this.app;
    let dataList = await model.SysOrder.findAll({
      include: [{
        model: model.Evaluate,
        raw: true,
        attributes: []
      }],
      where: {
        status: 3
      },
      raw: true,
      attributes: ['id', 'workerId', [sequelize.col('evaluate.order_id'), 'evalOrderId']]
    })
    let arr = dataList.filter(item => {
      return item.evalOrderId ? null : item
    });
    return arr

  }


}

module.exports = OrderService;
