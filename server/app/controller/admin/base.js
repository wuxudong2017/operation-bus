'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const pump = require('mz-modules/pump');
const sd = require('silly-datetime');
const mkDirp = require('mz-modules/mkdirp');
const Jimp = require('jimp')
const sequelize = require('sequelize')
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
class BaseController extends Controller {
  // 首页数据显示,获取工人学校用户数据
  async index(){
    const {ctx,app} = this;
    const {model} = this.app;

    let schoolUser = await model.SysSchoolUser.count();
    let worker = await model.SysUser.count();
    let list = await model.SysOrder.count();
    ctx.body = {
      schoolUser,
      worker,
      list
    }
  }
  // 故障饼状图
  async getfault(){
    const {ctx ,app} = this;
    const {model} = this.app;
    let result = await model.SysOrder.count({
        group:['tag_id'],
        include:[{
          model:model.SysTag,
          attributes:[]
        }],
        raw:true,
        attributes:[[sequelize.col('sysTag.name'), 'name']]
      })
    ctx.body = result;
  }
  // 首页工单每天状态
  async getDayList(){
    const {ctx ,app} = this;
    const {model} = this.app;
    let result = await model.SysOrder.count({
        group:['tag_id'],
        include:[{
          model:model.SysTag,
          attributes:[]
        }],
        raw:true,
        attributes:[[sequelize.col('sysTag.name'), 'name']]
      })
    ctx.body = result;
  }



  // 获取学校列表
  async schoolList() {
      let {model} = this.app;
      let {ctx} = this;
      let keyword = ctx.request.query.keyword;
      let result;
      if(keyword){
        result = await model.XxJbxx.findAll({
          where:{
            xxmc:{ // 模糊查询
              $like:'%' +keyword + '%'
            }
          },
           attributes:['xxJbxxId','xxmc']
         })
      }else{
        result = await model.XxJbxx.findAll({
           attributes:['xxJbxxId','xxmc']
         })
      }
      
    ctx.body = result
  } 
  // 后台图片上传
  async upload(){
    let { ctx ,app} = this;
    // 文件上传 操作文件流
    const stream = await ctx.getFileStream();
    console.log('1111')
    // 新建一个文件名 ,使用md5 加密
    const filename1 = md5(stream.filename + stream.length)
    const filename2 = path.extname(stream.filename).toLocaleLowerCase();
    const filename = filename1 + filename2
    // 生成绝对文件路径,存储
    let day = 'admin'
    await mkDirp(path.join(this.app.config.uploadDir, day))
    const target = path.join(this.app.config.uploadDir, day, filename);
    console.log(`target---->${target}`)
    // 生成一个文件,写入文件流
    const writeStream = fs.createWriteStream(target);
    try {
        await awaitWriteStream(stream.pipe(writeStream));

    } catch (error) {
        await sendToWormhole(stream);
        throw error;
    }
    Jimp.read(target, (err, lenna) => {
        if (err) throw err;
        lenna
            .resize(200, 200) // resize
            .quality(60) // set JPEG quality
            .write(path.join(this.app.config.uploadDir, day) + '/' + filename + '200x200' + filename2); // save
    });
    let imgUrl = target.slice(3).replace(/\\/g, '/');
    let imgUrlT = app.config.host + imgUrl + '200x200' + filename2;
    //文件响应
    ctx.response.type = "application/json"
    ctx.body =  imgUrlT
  }
}

module.exports = BaseController;