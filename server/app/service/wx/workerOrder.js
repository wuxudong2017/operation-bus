'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize')
class WorkerOrderService extends Service {
 async index(limit,offset,workerId,status) {
    const { model } = this.app;
    let result = await model.SysOrder.findAndCountAll({
      include:[{
        model:model.SysEquipment,
        attributes:[]
      },{
        model:model.XxJbxx,
        attributes:[]
      }],
      where:{
        workerId,
        status:status?status:1
      },
      attributes:{
        include:[[
          sequelize.col('sysEquipment.type'),'type',
        ],[
          sequelize.col('xxJbxx.xxmc'),'xxmc'
        ],[
          sequelize.col('sysEquipment.awatar'),'awatar'
        ]],
        exclude:['picture','updateTime']
      },
      limit:limit,
      offset:(offset-1)*limit,
      order:[['createTime','DESC']],
      raw:true
    })
    return result;
  }

async create() {
    const { model } = this.app;
    return '创建';
  }
  async destroy() {
    const { model } = this.app;
  
    return '删除';
  }
  async  update(id,status,workerId) {
    const { model } = this.app;
    let has = await model.SysOrder.findOne({
      where:{
        id,
        status
      }
    })
    if(has==null){
      const t = await model.transaction({autocommit:true});
      try{
        let updateTime = await this.ctx.service.tools.getTime();
        await model.SysOrder.update({
          status,updateTime
        },{
          where:{
            id
          }
        },{transaction:t});
        await model.SysOrderStatus.create({
          orderId:id,orderStatus:status,workerId,updateTime,
        },{transaction:t})
        await t.commit();
        return true
      }catch(e){
        console.log(e);
        await t.rollback()
        return false
      }
    }else{
      return false
    }
  }
  async  update1(id,status,workerId,filelist,remark) {

    const { model } = this.app;
    let has = await model.SysOrder.findOne({
      where:{
        id,
        status
      }
    })
    if(has==null){
      const t = await model.transaction({autocommit:true});
      try{
        let updateTime = await this.ctx.service.tools.getTime();
        await model.SysOrder.update({
          status,updateTime
        },{
          where:{
            id
          }
        },{transaction:t});
        await model.SysOrderStatus.create({
          orderId:id,orderStatus:status,workerId,updateTime,filelist,remark
        },{transaction:t})
        await t.commit();
        return true
      }catch(e){
        console.log(e);
        await t.rollback()
        return false
      }
    }else{
      return false
    }
  }
  async show(workerId,status) {
    const { model } = this.app;
    let result = await model.SysOrder.count({
      where:{
        workerId,status
      }
    })
    return result
  }

  async new() {
    const { model } = this.app;
    return '创建页面';
  }
  async edit(id) {
    const { model } = this.app;
    let result = await model.SysOrder.findOne({
      include:[{
        model:model.SysEquipment,
        attributes:[]
      },{
        model:model.XxJbxx,
        attributes:[]
      },{
        model:model.SysSchoolUser,
        attributes:[]
      }],
      attributes:{
        include:[
          [sequelize.col('sysEquipment.awatar'),'awatar'],
         [sequelize.col('sysEquipment.name'),'name'],
         [sequelize.col('sysEquipment.type'),'type'],
         [sequelize.col('xxJbxx.xxmc'),'xxmc'],
         [sequelize.col('xxJbxx.xxdz'),'xxdz'],
         [sequelize.col('sysSchoolUser.name'),'userName'],
         [sequelize.col('sysSchoolUser.phone'),'phone'],
        ]
      },
      raw:false,
      where:{
        id
      }
    })
    let orderList = await model.SysOrderStatus.findAll({
      include:[{
        model:model.SysUserInfo,
        attributes:[]

      }],
      where:{
        orderId:id
      },
      attributes:{
        include:[
          [sequelize.col('sysUserInfo.name'),'name']
        ]
      },
      order:[['updateTime','ASC']],
      raw:true
    })
    result.remark = orderList
    return result;
  }
}

module.exports = WorkerOrderService;
