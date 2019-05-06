'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');
const md5 = require('md5');
const pump = require('mz-modules/pump');
const sd = require('silly-datetime');
const mkDirp = require('mz-modules/mkdirp');
const Jimp = require('jimp')
//故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');

class BaseController extends Controller {
    async upload() {
        let { ctx, app } = this;
        // 文件上传 操作文件流
        const stream = await ctx.getFileStream();
      
        // 新建一个文件名 ,使用md5 加密
        const filename1 = md5(stream);
        const filename2 = path.extname(stream.filename).toLocaleLowerCase();
        const filename = filename1 + filename2
        // 生成绝对文件路径,存储
        let day = sd.format(new Date(), 'YYYYMMDD')
        await mkDirp(path.join(this.app.config.uploadDir, day))
        const target = path.join(this.app.config.uploadDir, day, filename);
       
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
        ctx.body = {
            link: imgUrlT
        }
    }
    async typeEquipment() {
        let { ctx } = this
        let result = await ctx.service.wx.base.typeEquipment();
        ctx.body = result
    }
    async tagType() {
        let { ctx } = this
        let result = await ctx.service.wx.base.tagType();
        ctx.body = result
    }
    async putGeo(){
        const {ctx,app} = this;
        let formData = ctx.request.body;
        //console.log(`fromData----->${JSON.stringify(formData)}`);
        let userId = formData.userId
        await app.redis.get('geo').set(userId,JSON.stringify(formData),'ex',20)
        ctx.body = 'success'
    }
    // 获取工单状态
    async getOrderStatus(){
        const {ctx} = this;
        let id = ctx.params.id
        let result = await ctx.service.wx.base.getOrderStatus(id);
        ctx.body = result
    }
    // 用户头像上传
  async uploadOne() {
      const {ctx,app} = this;
    // 获取文本流
    let stream = await ctx.getFileStream();
    // 获取文件名
    let fileName = stream.filename;
    // 根据日期时间格式创建文件夹
    let day = 'user'
    let dir =path.join(this.app.config.uploadDir,day)
    await mkDirp(dir)
    // 文件流加密生成文件名
    let md5S = md5(fileName);
    console.log(stream)
    console.log(md5S)
    let uploadDir = path.join(dir,md5S+path.extname(fileName));
    // 建立写入流
    let writStream = fs.createWriteStream(uploadDir);
    // 流写入到文件夹中
    await pump(stream, writStream);
    ctx.body = {
      url: app.config.host+uploadDir.slice(3).replace(/\\/g,'/')
    }
  }
 
}
module.exports = BaseController;
