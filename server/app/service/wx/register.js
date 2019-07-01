'use strict';

const Service = require('egg').Service;
const sequelzie = require('sequelize')
class RegisterService extends Service {
    async create(name, phone, username, password, schoolId) {
        let { model } = this.app;
        let { ctx } = this
        let id = await ctx.service.tools.uuid();
        let createTime = await ctx.service.tools.getTime()
        let result = await model.SysSchoolUser.findOrCreate({
            where: {
                $or: [{ phone }, { schoolId }]
            },
            defaults: {
                name, phone, username, password, schoolId, id, createTime
            },
            raw: true
        })
        let content = result[0];
        if (result[1]) {
            return 0
        } else {
            if(content['phone'] == phone){
                return 1
            }else{
                return 2
            }
        }

    }

  // 工人登录
    async loginWorker(username, password) {
        let { model } = this.app;
        return await model.SysUser.findOne({
            include: {
                model: model.SysUserInfo,
                attributes: []
            },
            where: {
                jobNumber: username ,
                password
            },
            attributes: ['id', 'jobNumber', [
                sequelzie.col('sysUserInfo.avatar'), 'avatar'
            ], [
                    sequelzie.col('sysUserInfo.address'), 'address'
                ], [
                    sequelzie.col('sysUserInfo.name'), 'name'
                ]],
            raw: true
        })
    }
    // 根据工号获取工人积分
    async getWorkerIntegral(workerId){
        const {model} = this.app;
        let result = await model.Evaluate.findAll({
            where:{workerId},
             attributes:[[sequelzie.fn('sum',sequelzie.col('total_score')),'totalScore'],
            [sequelzie.fn('sum',sequelzie.col('require_speed')),'requireSpeed'],
            [sequelzie.fn('sum',sequelzie.col('service_attr')),'serviceAttr']
            ],
            raw:true
        })
        return result[0]
    }


    async login(phone, password) {
        let { model } = this.app;
        return await model.SysSchoolUser.findOne({
            where: {
                phone,
                password,
            },
            include: {
                model: model.XxJbxx,
                attributes: []
            },
            attributes: {
                include: [
                    [sequelzie.col('xxJbxx.xxmc'), 'xxmc']
                ],
                exclude: ['password', 'createTime']
            },
            raw:true,
        })
    }
    // 获取学校工单
    async teacherOrder(id) {
        let { model } = this.app;
        let result1 = await model.SysOrder.count({
            where: {
                userId: id,
                $or: [{ status: '0' }, { status: '1' }]
            }
        })
        let result2 = await model.SysOrder.count({
            where: {
                userId: id,
                status: '2'
            }
        })
        let result3 = await model.SysOrder.count({
            where: {
                userId: id,
                status: '3'
            }
        })
        let result = { wait: result1, start: result2, end: result3 };

        return result;
    }
    // async teacherOrder(id) {
    //     const {model} = this.app;
    //     let result = await model.SysOrder.count({
    //         where:{userId:id},
    //         group:'status',
    //     })
    //     return result;
    // }
    async teacherId(){
        const {app} = this;
        const {model} = this.app;
        let result = await model.SysSchoolUser.findAll({
            where:{status:1},
            attributes:['id'],
            raw:true,
        })
        let arr = result.map(item=>{
            return item.id
        })
        await app.redis.get('foo').set('userarr',arr.join(','))
        return arr;

    }
    // 更新教师信息
    async updateTeacher(id, formData) {
        const { model } = this.app;
        let result;
        if (!formData.password) {
             await model.SysSchoolUser.update(formData, {
                where: { id },
                raw:true,
            })
            return [1]
        } else {
            let has = await model.SysSchoolUser.findOne({
                where: {
                    id,
                    password: formData.password
                },
                raw:true,
                
            })
            if (!has) {
                return  result = [0]
            } else {
                formData.password = formData.newPassword
                 await model.SysSchoolUser.update(formData, {
                    where: { id },
                    raw:true,
                })
                return result = [1]

            }
        }
    }
}

module.exports = RegisterService;
