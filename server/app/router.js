'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, swagger } = app;
  router.get('/', controller.home.index);

  router.post('/api/admin/login', controller.admin.login.doLogin)
  // 获取用户信息
  router.post('/api/admin/userInfo', controller.admin.login.userInfo);
  router.post('/api/admin/upload', controller.admin.base.upload)
  router.post('/api/admin/uploadFile', controller.admin.base.uploadFile)
  router.get('/api/admin/schoolList', controller.admin.base.schoolList)
  /**
   * 微信小程序端
   * 
   */

  // 用户头像上传
  router.post('/api/wx/uploadHeader', controller.wx.base.uploadOne)

  // 教师端注册
  router.post('/api/wx/register', controller.wx.register.doLogin);
  // 教师信息修改
  router.post('/api/wx/updateTeacher/:id', controller.wx.register.updateTeacher);
  // 教师端登录
  router.post('/api/wx/login', controller.wx.register.login);
  // 教师工单数量获取
  router.get('/api/wx/teacherOrder', controller.wx.register.teacherOrder);
  //图片上传接口
  router.post('/api/wx/upload', controller.wx.base.upload);
  // 获取设备类型
  router.get('/api/wx/typeEquipment', controller.wx.base.typeEquipment)
  // 获取故障标签
  router.get('/api/wx/tagType', controller.wx.base.tagType)
  // 获取学校信息
  router.get('/api/wx/schoolList', controller.admin.base.schoolList)
  // 维修端工单获取
  router.get('/api/wx/workOrder', controller.wx.order.workOrder);
  // 获取工单状态详情
  router.get('/api/wx/getOrderStatus/:id', controller.wx.base.getOrderStatus)

  // 工单 接口
  router.resources('order', '/api/wx/order', controller.wx.order);
  
  // 工单评价接口
  router.post( '/api/wx/evaluate/:id', controller.wx.order.evaluate)

  // 维修人员部分操作
  router.resources('userg', '/api/wx/userg', controller.wx.userg)
  router.post('/api/wx/loging', controller.wx.register.loginWorker);
  // 维修人员工单操作
  router.resources('workerOrder', '/api/wx/workerOrder', controller.wx.workerOrder)
  // 设备管理接口
  router.resources('device', '/api/wx/device', controller.wx.device)
  // 获取当前学校下的设备id
  router.get('/api/wx/getSchoolEqu',controller.wx.base.getSchoolEqu)

  router.get('/api/wx/test',controller.wx.base.test)

  // 地理位置

  // router.post('/api/wx/putGeo', controller.wx.base.putGeo)


  // socket server api

  // app.io.route('chat', app.io.controller.chat.index);
  // app.io.route('message', app.io.controller.chat.message);
  // app.io.route('user:online', app.io.controller.chat.online);


  /**
   * VUE 后台接口
   *
   */


  // 用户退出
  router.post('/api/admin/layout', controller.admin.login.layout)
  // 首页用户信息数据
  router.get('/api/admin/index', controller.admin.base.index)
  // 故障饼状图
  router.get('/api/admin/getfault', controller.admin.base.getfault)
  // 每天工单数量
  router.get('/api/admin/getDay', controller.admin.base.getDayList)

  // 用户管理
  router.resources('user', '/api/admin/user', controller.admin.user)

  // 角色管理
  router.resources('role', '/api/admin/role', controller.admin.role)
  // 权限管理
  router.resources('permission', '/api/admin/permission', controller.admin.permission)
  // 工单管理
  router.resources('order', '/api/admin/order', controller.admin.order)
  // 学校用户管理
  router.resources('teacher', '/api/admin/teacher', controller.admin.teacher)
  // 设备类型管理
  router.resources('equipment', '/api/admin/equipment', controller.admin.equipment)
  // 故障标签管理
  router.resources('tag', '/api/admin/tag', controller.admin.tag)
  // 设备管理
  router.resources('device','/api/admin/device/',controller.admin.device)
  router.post('/api/admin/device/deletes',controller.admin.device.deletes)
  // 获取所有设备
  router.get('/api/admin/getAllType',controller.admin.base.getAllType)
  // 文档管理
  router.resources('file', '/api/admin/file', controller.admin.file)
  // require('./router/swagger')(app)
};
