'use strict';

const BaseController = require('./base');

class RegisterController extends BaseController {
    async index() {
        const { ctx } = this;
        this.ctx.body = '列表';
      }
    // 注册
    async doLogin() {
        const { ctx } = this;
        let formData = ctx.request.body;
        let name = formData.name,
        phone = formData.phone,
        username = formData.username,
        password = formData.password,
        schoolId = formData.schoolId;
        let result = await ctx.service.wx.register.create(name,phone,username,password,schoolId);
         if(result==1){
             ctx.body = {
                 code:1,
                 message:'新加用户成功'
             }
         }else if(result==2){
             ctx.body = {
                 code:0,
                 message:'用户名重复'
             }
         }else{
             ctx.body = {
                 code:0,
                 message:'注册失败'
             }
         } 
      }
      // 维修工人登录
      async loginWorker(){
        let {ctx} = this;
        let formData = ctx.request.body;
        let username = formData.username;
        let password = formData.password;
        let result = await ctx.service.wx.register.loginWorker(username,password);
        if(result){
          let token =  await ctx.service.tools.uuid();
            ctx.body = {
              token,
              result
            }
            ctx.locals = token
        }else{
            ctx.body ={
                code:0,
                message:"用户名密码错误"
            }
        }
      }


      // 学校用户登录
      async login(){
        let {ctx} =this;
        let formData =  ctx.request.body;
        let username = formData.username;
        let password = formData.password;
        let result = await ctx.service.wx.register.login(username,password);
        if(result){
          let token =  await ctx.service.tools.uuid();
            ctx.body = {
              token,
              result
            }
            ctx.locals = token
        }else{
            ctx.body ={
                code:0,
                message:"用户名密码错误"
            }
        }
      
      }
      // 教师获取工单
      async teacherOrder(){
        let {ctx} = this;
        let query =ctx.request.query;
        let userId = query.userId;
        ctx.validate({
          userId:{type:'string',required:true}
        },{userId});
        let result = await ctx.service.wx.register.teacherOrder(userId);
        ctx.body = result
      }
      // 教师个人信息修改
      async updateTeacher(){
        let {ctx}= this;
        let id = ctx.params.id
        let formData = ctx.request.body;
        ctx.body = id;
        let result = await ctx.service.wx.register.updateTeacher(id,formData);
        if(result[0]==0){
          ctx.body ={
            code:0,
            message:'更新失败'
          }
        }else{
          ctx.body ={
            code:1,
            message:'更新成功'
          }
        }
        
      }


     
}

module.exports = RegisterController;
