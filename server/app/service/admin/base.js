'use strict';

const Service = require('egg').Service;
const Sequelize = require('sequelize')
class BaseService extends Service {
    async getFaultList(offset, limit,timeRange,schoolId,equipmentId) {
        const { model } = this.app;
        let result = await model.FaultList.findAndCountAll({
            include: [{
                model: model.SysEquipment,
                raw:true,
                attributes:[]
            },{
                model:model.XxJbxx,
                raw:true,
                attributes:[],
            },{
                model:model.SysTag,
                raw:true,
                attributes:[],
            }],
            attributes:{
                include:[
                    [Sequelize.col('sysEquipment.type'),'type'],
                    [Sequelize.col('xxJbxx.xxmc'),'xxmc'],
                    [Sequelize.col('sysTag.name'),'tagName'], 
                    [Sequelize.col('sysEquipment.provider'),'provider'],
                    [Sequelize.fn('FROM_UNIXTIME',Sequelize.literal('faultList.create_time DIV 1000'),'%Y-%m-%d'),'createTime']
                ]
            },
            where:{
                $and:[
                    timeRange?{createTime:{
                        $between:timeRange.split(',')
                    }}:null,
                    schoolId?{schoolId}:null,
                    equipmentId?{equipmentId}:null,
                ]
            },
            limit,
            offset:(offset-1)*limit,
            raw: true,
            order:[['createTime','DESC']]
        })
        return result
    }
    async getFaultAll(){
        const {model} = this.app;
        let result = await model.FaultList.findAll({
            include: [{
                model: model.SysEquipment,
                raw:true,
                attributes:[]
            },{
                model:model.XxJbxx,
                raw:true,
                attributes:[],
            },{
                model:model.SysTag,
                raw:true,
                attributes:[],
            }],
            attributes:{
                include:[
                    [Sequelize.col('sysEquipment.type'),'type'],
                    [Sequelize.col('xxJbxx.xxmc'),'xxmc'],
                    [Sequelize.col('sysTag.name'),'tagName'], 
                    [Sequelize.col('sysEquipment.provider'),'provider'],
                    [Sequelize.fn('FROM_UNIXTIME',Sequelize.literal('faultList.create_time DIV 1000'),'%Y-%m-%d'),'createTime']
                ]
            },
            raw: true,
            order:[['createTime','DESC']]
        })
        return result
    }
    // 故障统计表
    async getdeviceTable(month){
        const {model} = this.app;
        // 设备数量和设备故障总数
        let result =await model.SysDevice.count({
          group:'type',
          attributes:['type','equipmentId',[Sequelize.fn('SUM',Sequelize.col('num_g')),'breakdownNum']]
        });
           // 设备设备本月故障总数
        let resultM =await  model.FaultList.count({
          group:'equipment_id',
          where:{
            createTime:{
              $between:month
            }
          },  
          attributes:['equipmentId']
        });
          // 设备设备修复数
        let resultH = await model.SysOrder.count({
          group:'equipment_id',
          where:{
            createTime:{
              $between:month
            },
            status:3
          }, 
          attributes:['equipmentId'] 
        })
        // 设备未修复数
        let resultL = await model.SysOrder.count({
          group:'equipment_id',
          attributes:['equipmentId'],
          where:{
            status:{
              $lt:3
            }
          } 
        })
        return {resultH,resultL,result,resultM,};
    }
    // 维修人员考核
    async assessment(month){
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
module.exports = BaseService