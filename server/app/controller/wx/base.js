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
const sequelize = require('sequelize')
/**
 * @Controller base 公共方法
 * 
 */
class BaseController extends Controller {
    /**
   * @summary 上传图片
   * @description 上传图片
   * @router post /api/wx/upload
   * @request formData file *file
   */
    async upload() {
        let { ctx, app } = this;
        // 文件上传 操作文件流
        const stream = await ctx.getFileStream();
        // 新建一个文件名 ,使用md5 加密
        const filename1 = md5(stream.filename + new Date().getTime());
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

    /**
   * @summary 设备类型接口
   * @description 获取设备类型
   * @router get /api/wx/typeEquipment
   */
    async typeEquipment() {
        let { ctx } = this
        let result = await ctx.service.wx.base.typeEquipment();
        ctx.body = result
    }
    /**
  * @summary 故障类型接口
  * @description 获取故障类型
  * @router get /api/wx/tagType
  */
    async tagType() {
        let { ctx } = this
        let result = await ctx.service.wx.base.tagType();
        ctx.body = result
    }
    async putGeo() {
        const { ctx, app } = this;
        let formData = ctx.request.body;
        let userId = formData.userId
        await app.redis.get('geo').set(userId, JSON.stringify(formData), 'ex', 20)
        ctx.body = 'success'
    }
    /**
  * @summary 根据工单id 获取工单流水
  * @description 根据工单id 获取工单流水
  * @router get /api/wx/getOrderStatus/{orderId}
  * @request path string *orderId
  */
    async getOrderStatus() {
        const { ctx } = this;
        let id = ctx.params.id
        let result = await ctx.service.wx.base.getOrderStatus(id);
        ctx.body = result
    }
    /**
* @summary 用户头像上传
* @description 用户头像上传
* @router post /api/wx/uploadOne
* @request formData file *file
*/
    async uploadOne() {
        const { ctx, app } = this;
        // 获取文本流
        let stream = await ctx.getFileStream();
        // 获取文件名
        let fileName = stream.filename;
        // 根据日期时间格式创建文件夹
        let day = 'user'
        let dir = path.join(this.app.config.uploadDir, day)
        await mkDirp(dir)
        // 文件流加密生成文件名
        let md5S = md5(fileName);
        let uploadDir = path.join(dir, md5S + path.extname(fileName));
        // 建立写入流
        let writStream = fs.createWriteStream(uploadDir);
        // 流写入到文件夹中
        await pump(stream, writStream);
        ctx.body = {
            url: app.config.host + uploadDir.slice(3).replace(/\\/g, '/')
        }
    }
    /**
* @summary 获取当前学校下的设备类型
* @description 获取当前学校下的设备类型和数量
* @router get /api/wx/getSchoolEqu
*/
    async getSchoolEqu() {
        const { ctx } = this;
        let query = ctx.request.query;
        ctx.validate({
            schoolId: { required: true, type: 'string' }
        }, query);
        let schoolId = query.schoolId;
        let reuslt = await ctx.service.wx.base.getSchoolEqu(schoolId);
        ctx.body = reuslt
    }
        /**
    * @summary 获取文档
    * @description 获取文档
    * @router get /api/wx/getFile
    */
    async  getFile() {
        const { ctx } = this;
        let result1 = await ctx.service.wx.base.getFile(1);
        let result2 = await ctx.service.wx.base.getFile(2);
        ctx.body = { result1, result2 };
    }



    async test() {
        const { ctx } = this;
        let id = ctx.request.query.id
        ctx.body = await ctx.service.wx.register.getWorkerIntegral(id)

    }
}
module.exports = BaseController;
