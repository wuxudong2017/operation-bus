'use strict';

const BaseController = require('./base');
/**
 * @Controller order 工单
 */
class OrderController extends BaseController {
  /**
   * @summary 工单列表
   * @description 工单列表分页
   * @router get /api/wx/order
   * @request query integer limit 每页限制 默认10
   * @request query integer offset 第几页 默认1
   */
  async index() {
    const { ctx } = this;
    let query = ctx.request.body;
    let limit = query.limit || 10;
    let offset = query.offset || 1
    let result = await ctx.service.wx.order.index(limit, offset);
    ctx.body = result;
  }
  /**
  * @summary 创建工单
  * @description 创建工单
  * @router post /api/wx/order
  * @request body wxOrderCreate *body
  */
  async create() {
    const { ctx } = this;
    let formData = ctx.request.body;
    ctx.validate({
      deviceId: { type: 'string', required: false, description: '设备id'},
      equipmentId: { type: 'string', required: true, description: '设备类型id' },
      schoolId: { type: 'string', required: true, description: '学校id' },
      tagId: { type: 'string', required: true, description: '故障类型id' },
      userId: { type: 'string', required: true, description: '学校用户id' },
    },formData)
    formData.picture = JSON.stringify(formData.picture) || null;
    let result = await ctx.service.wx.order.create(formData)
    ctx.body = result;
  }
    /**
  * @summary 删除工单
  * @description 删除工单
  * @router delete /api/wx/order/{orderId}
  * @request path  integer *orderId 工单id
  * @request query  integer deviceId 设备id
   */
  async destroy() {
    const { ctx } = this;
    const { model } = this.app;
    let id = ctx.params.id;
    let query = ctx.request.query;
    let deviceId = query.deviceId || null;
    let result = await ctx.service.wx.order.delete(id);
    if (deviceId) {
      let data = await ctx.service.wx.device.edit(deviceId);
      let formData = { deviceStatus: 1, numG: data.numG - 1 < 0 ? 0 : Number(data.numG) - 1 }
      try {
        await ctx.service.wx.device.update(deviceId, formData);
        await model.FaultList.destroy({
          where: { deviceId }
        })
      } catch (e) {
        ctx.throw('error', 500, 'Internal Server Error')
      }
    }
    if (result) {
      ctx.body = result;
    } else {
      ctx.body = {
        code: 0,
        message: '删除失败'
      }
    }
  }
      /**
  * @summary 更新工单
  * @description 根据工单id更新工单
  * @router put /api/wx/order/{orderId}
  * @request path  integer *orderId 工单id
  * @request query  integer deviceId 设备id
   */
  async update() {
    const { ctx } = this;
    let id = ctx.params.id;
    let formData = ctx.request.body;
    formData.orderId = id
    formData.orderStatus = formData.status;
    formData.picture = JSON.stringify(formData.picture)
    let result = await ctx.service.wx.order.update(id, formData)
    ctx.body = result;
  }
  async show() {
    const { ctx } = this;
    let id = ctx.params.id
    let result = await ctx.service.wx.order.show(id);
    ctx.body = result;
  }

  async new() {
    const { ctx } = this;
    ctx.body = '创建页面';
  }
  async edit() {
    const { ctx } = this;
    let id = ctx.params.id
    ctx.body = '修改页面' + id;
  }
  // 维修端工单获取
  async workOrder() {
    let { ctx } = this;
    let query = ctx.request.query;
    let jobNumber = query.workId;
    let result = await ctx.service.wx.order.workOrder(jobNumber)
    ctx.body = jobNumber

  }
  // 评级工单
  async evaluate() {
    const { ctx } = this;
    let orderId = ctx.params.id;
    let formData = ctx.request.body;
    ctx.validate({
      serviceAttr: { required: true, type: 'number', coverType: 'number' },
      requireSpeed: { required: true, type: 'number', coverType: 'number' },
      description: { required: false, type: 'string', coverType: 'string' },
      totalScore: { required: true, type: 'number', coverType: 'number' },
      workerId: { required: true, type: 'int', coverType: 'int' },
    }, formData)
    let result = await ctx.service.wx.order.evaluate(orderId, formData);
    if (result[1]) {
      ctx.body = result;
    } else {
      ctx.body = {
        code: 0,
        message: "不能重复评价"
      }
    }
  }
  async scheduleEvaluate() {

  }





}

module.exports = OrderController;
