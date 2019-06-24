'use strict';

const Service = require('egg').Service;
const seuqelize = require('sequelize')
class OrderService extends Service {
    async index(limit, offset, status,keywords) {
        let { model } = this.app;
        return await model.SysOrder.findAndCountAll({
            include: [{
                model: model.XxJbxx,
                attributes: [],
                raw: true
            }, {
                model: model.SysSchoolUser,
                attributes: [],
                raw: true
            }, {
                model: model.SysTag,
                attributes: [],
                raw: true
            }, {
                model: model.SysEquipment,
                attributes: [],
                raw: true
            }],
            attributes: {
                include: [
                    [seuqelize.col('xxJbxx.xxmc'), 'xxmc'],
                    [seuqelize.col('xxJbxx.xxdz'), 'xxdz'],
                    [seuqelize.col('sysSchoolUser.name'), 'name'],
                    [seuqelize.col('sysSchoolUser.phone'), 'phone'],
                    [seuqelize.col('sysSchoolUser.email'), 'email'],
                    [seuqelize.col('sysTag.name'), 'tagName'],
                    [seuqelize.col('sysEquipment.type'), 'equipmentType'], 
                ]
            },
            where:{
                $and:[{status},keywords?{id:{$like:'%'+keywords+'%'}}:null]
            },
          
            raw: true,
            limit: limit,
            offset: (offset - 1) * 10,
            order: [['createTime', 'DESC']]
        })
    }
    // 更新派单表的状态
    async update(id, workerId) {
        let { model } = this.app;
        let { ctx } = this
        let updateTime = await ctx.service.tools.getTime();
        let data = await model.SysUserInfo.findOne({
            where:{
                id:workerId
            },
            raw:true
        });
        let workername = data.name;
        const t = await model.transaction({ autocommit: true })
        try {
            await model.SysOrderStatus.create({
                orderId: id,
                orderStatus: '1',
                workerId,
                updateTime,
                 
            }, { transaction: t })
            await model.SysOrder.update({
                status: "1",
                updateTime,
                workerId,
                workername
            }, {
                    where: {
                        id
                    }
                }, { transaction: t })

            await t.commit();
            return true
        } catch (e) {
          
            await t.rollback()
        }

    }
    async destroy(id) {
        let { model } = this.app;
        const t = await model.transaction();
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
            await t.commit();
            return true
        } catch (e) {
            await t.rollback();
            return false
        }
    }
    // 查询工单详情
    async show(id){
        const {model} = this.app;
        let result = await model.SysOrder.findOne({
            include:[{
                model:model.XxJbxx,
                attributes:[],
            },{
                model:model.SysTag,
                attributes:[],
            },{
                model:model.SysEquipment,
                attributes:[],
            },{
                model:model.SysSchoolUser,
                attributes:[]
            }],
            where:{
                id
            },
            raw:true,
            attributes:{
                include:[
                    [seuqelize.col('xxJbxx.xxmc'),'xxmc'],
                    [seuqelize.col('xxJbxx.xxdz'),'xxdz'],
                    [seuqelize.col('sysTag.name'),'tagName'],
                    [seuqelize.col('sysEquipment.awatar'),'awatar'],
                    [seuqelize.col('sysEquipment.type'),'equipmentType'],
                    [seuqelize.col('sysSchoolUser.name'),'name'],
                    [seuqelize.col('sysSchoolUser.phone'),'phone'],
                        
                ]
            }
            
        })
        let remark = await model.SysOrderStatus.findAll({
            where:{orderId:id},
            include:[{
                model:model.SysUserInfo,
                attributes:[]
            }],
            attributes:{
                include:[[seuqelize.col('sysUserInfo.name'),'workerName']]
            },
            raw:true,
            order:[['updateTime','ASC']]
        })
        result.remark =remark


        return result
    }


}
module.exports = OrderService;
