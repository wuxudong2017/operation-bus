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



    // async create(name, phone, username, password, schoolId) {
    //     let { model } = this.app;
    //     let { ctx } = this
    //     let id = await ctx.service.tools.uuid();
    //     let createTime = await ctx.service.tools.getTime()
    //     let result = await model.SysSchoolUser.findOne({
    //         where: {
    //             username
    //         }
    //     })
    //     if (!result) {
    //         try {
    //             await model.SysSchoolUser.create({
    //                 name, phone, username, password, schoolId, id, createTime
    //             })
    //             return 1
    //         } catch (e) {
    //             console.log(e)
    //             return 0
    //         }
    //     }
    //     return 2
    // }
    // 工人登录
    async loginWorker(phone, password) {
        let { model } = this.app;
        return await model.SysUser.findOne({
            include: {
                model: model.SysUserInfo,
                attributes: []
            },
            where: {
                phone,
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
    async login(username, password) {
        let { model } = this.app;
        return await model.SysSchoolUser.findOne({
            where: {
                username,
                password
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
            }
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
    // 更新教师信息
    async updateTeacher(id, formData) {
        const { model } = this.app;
        let result;
        console.log(`result--->${JSON.stringify(formData)}`)
        if (!formData.password) {
            result = await model.SysSchoolUser.update(formData, {
                where: { id }
            })
        } else {

            let has = await model.SysSchoolUser.findOne({
                where: {
                    id,
                    password: formData.password
                }
            })
            if (!has) {
                result = [0]
            } else {
                formData.password = formData.newPassword
                result = await model.SysSchoolUser.update(formData, {
                    where: { id }
                })

            }

        }
        return result


    }


}

module.exports = RegisterService;
