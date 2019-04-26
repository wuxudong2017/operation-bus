'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize')
class TeacherService extends Service {
    // 查询用户列表
    async index(limit,offset){
        let {model} =this.app;
       let result = model.SysSchoolUser.findAndCountAll({
        include:{
            model:model.XxJbxx,
            attributes:[],
            raw:true
        },
        attributes:{
            include:[
                [sequelize.col('xxJbxx.xxmc'),'xxmc']
            ]
        },
        raw:true,
        limit: limit,
        offset: (offset - 1) * 10,
       })
       return result
    }
  async create(name,phone,username,password,schoolId) {
    let {model} = this.app;
    let {ctx} = this
    let id = await ctx.service.tools.uuid();
    let result = await model.SysSchoolUser.findOne({
        where:{
            username
        }
    })
    if(!result){
        try{
            await model.SysSchoolUser.create({
                name,phone,username,password,schoolId,id
            })
            return 1
        }catch(e){
            return 0
        } 
    }
    return 2
  }
  async destroy(id){
      let {model} = this.app;
      let result = await model.SysSchoolUser.destroy({
          where:{
              id
          }
      })
      return result;
  }
  async edit(id){
      let {model} = this.app;
      let result = await model.SysSchoolUser.findOne({
          where:{
              id
          }
      })
      return result 
  }
  async update(id,passwordN){
      let {model} = this.app;
      let result = await model.SysSchoolUser.update({
          password:passwordN
      },{
          where:{
              id
          }
      });
      return result
  }

}

module.exports = TeacherService;
