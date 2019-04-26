'use strict';

const Service = require('egg').Service;
const uuid = require('uuid/v1');
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const sd = require('silly-datetime')
class ToolsService extends Service {
  // uuid
  async uuid() {
    let res = uuid()
    return md5(res)
  }
  // 工单号生成方案
  async setOrderId(){
    let data = (new Date().getTime())*3
    return data
  }
  // 获取现在时间(int 类型)
  async getTime() {
    let date = new Date();
    return date.getTime()
  }
  // jwt 会话验证机制
  /**
  *@filename:generateToken
  *@Description:
  * data:用户id
  * time:保存时间
  * cert:密钥
  */
  async generateToken(id,data, time) {
    let {ctx} = this;
    let cert = "123456" // 加密秘钥
    let token = jwt.sign({data}, cert, {
      expiresIn: time,  // 1小时过期
  });
    // 保存到redis
    await ctx.service.cache.set(id, token,time)
  }
  // 上传文件
  


}

module.exports = ToolsService;
