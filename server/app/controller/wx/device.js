'use strict';

const Controller = require('egg').Controller;
/**
 * @Controller device 设备管理
 * 
 */
class DeviceController extends Controller {
    /**
     * @summary 设备列表
     * @description 通过schoolId,equipmentId获取设备列表
     * @router get /api/wx/device
     * @request query string *schoolId  学校编码
     * @request query string *equipmentId  设备类型编码
     */
    async index() {
        const { ctx } = this;
        let query = ctx.request.query;     
        ctx.validate({
            schoolId: { required: true, type: 'string' }
        }, query)
        let schoolId = query.schoolId;
        let equipmentId = query.equipmentId
        let result = await ctx.service.wx.device.index(schoolId,equipmentId)
        ctx.body = result;
    }
    async create() {
        const { ctx } = this
        ctx.body = "创建"
    }
    async destroy() {
        const { ctx } = this;
        let id = ctx.params.id
        ctx.body = "删除" + id
    }
    async update() {
        const { ctx } = this;
        let id = ctx.params.id;  
        ctx.body = "修改" + id
    }
       /**
     * @summary 设备详情
     * @description 通过schoolId,equipmentId获取设备列表
     * @router get /api/wx/device/{deviceId}
     * @request path integer *deviceId 设备id
     * @request query integer *status  工单状态 默认0
     */
    async show() {
        const { ctx } = this;
        let deviceId = ctx.params.id;
        let query = ctx.request.query;
        let status = query.status?query.status:0;
        let result = await ctx.service.wx.device.show(deviceId,status)
        ctx.body = result
    }

    async new() {
        const { ctx } = this;
        ctx.body = '创建页面';
    }
     /**
     * @summary 设备详情
     * @description 通过deviceId获取设备详情
     * @router get /api/wx/device/{deviceId}/edit
     * @request path integer *deviceId 设备id
     */
    async edit() {
        const { ctx } = this;
        let id = ctx.params.id;
        let result = await ctx.service.wx.device.edit(id);
        if(result){
            ctx.body = result
        }else{
            ctx.body = {
                code:0,
                message:"该设备不存在"
            }
        }
       
    }
}

module.exports = DeviceController;
