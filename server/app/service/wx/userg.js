'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize')
class UsergService extends Service {
  async find(username, password) {
    let { model } = this.app;
    let result = await model.SysUser.findOne({
      include: {
        model: model.SysUserInfo,
        raw: true,
        attributes: [],
      },
      where: {
        $or: [{ username }, { jobNumber: username }],
        password
      },
      attributes: ['roleId', 'id', 'username', 'status', [
        sequelize.col('sysUserInfo.name'), 'name'
      ], [
          sequelize.col('sysUserInfo.age'), 'age'
        ], [
          sequelize.col('sysUserInfo.sex'), 'sex'
        ], [
          sequelize.col('sysUserInfo.avatar'), 'avatar'
        ], [
          sequelize.col('sysUserInfo.address'), 'address'
        ], [
          sequelize.col('sysUserInfo.phone'), 'phone'
        ], [
          sequelize.col('sysUserInfo.entry_time'), 'entryTime'
        ]],
      raw: true
    })
    return result
  }
  async  index(userId, limit, offset, status) {
    let { model } = this.app;
    let result = await model.SysOrder.findAndCountAll({
      include: [{
        model: model.SysEquipment,
        raw: true,
        attributes: []
      }, {
        model: model.SysTag,
        raw: true,
        attributes: []
      }],
      where: {
        userId,
        $and: {
          status: status == 3 ? status : {
            $lt: '3'
          }
        }
      },
      attributes: {
        include: [
          [
            sequelize.col('sysEquipment.type'), 'type'
          ],
          [
            sequelize.col('sysTag.name'), 'tagName'
          ]
        ]
      },
      limit: limit,
      offset: (offset - 1) * 10,
      raw: true,
      order: [['createTime', 'DESC']]
    })
    return result;
  }
  async getUserInfo(jobNumber) {
    const {model} = this.app;
    let result = await model.SysUser.findOne({
      include: {
        model: model.SysUserInfo,
        raw: true,
        attributes: [],
      },
      where: {
        jobNumber
      },
      attributes: ['roleId', 'id', 'username', 'status', [
        sequelize.col('sysUserInfo.name'), 'name'
      ], [
          sequelize.col('sysUserInfo.age'), 'age'
        ], [
          sequelize.col('sysUserInfo.sex'), 'sex'
        ], [
          sequelize.col('sysUserInfo.avatar'), 'avatar'
        ], [
          sequelize.col('sysUserInfo.address'), 'address'
        ], [
          sequelize.col('sysUserInfo.phone'), 'phone'
        ], [
          sequelize.col('sysUserInfo.entry_time'), 'entryTime'
        ]],
      raw: true
    })
    return result
  }

}

module.exports = UsergService;
