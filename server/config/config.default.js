/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
const path = require('path')
const sequelize = require('./db')
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {}
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1550481095395_9496';

  // add your middleware config here
  config.middleware = ['authWechat' ,'jwt', 'errorHeader'];
  config.errorHeader = {
    enable: true,
    match: '/api'
  }
  config.authWechat={
    enable: true,
    match: '/api/wx'
  }
  config.jwt = {
    enable: true,
    ignore: ['/public/', '/api/admin/login','/api/admin/upload' ,'/api/wx'], // 哪些请求不需要认证
}
  // egg security
  config.security = {
    csrf: {
      ignore: function (ctx) {
        if (ctx.url.indexOf('/api') > -1) {
          return true
        } else {
          return false
        }
      }
    }
  }
  // 上传文件地址
  config.uploadDir = 'app/public'
  config.host ='http://apiwxd.club:7001'
  // mysql config
  config.sequelize = sequelize
  //redis config
  config.redis = {
    clients:{
      foo:{
        host:'127.0.0.1',
        port:'6379',
        db:1,
        password: ''
      },
      geo:{
        host:'127.0.0.1',
        port:'6379',
        db:2,
        password: ''
      }
    }
  }
  // 会话过期时间
  config.timeRedis = 20
  // 跨域请求
  config.cors = {
    origin: "*"
  }
  
  // socket

   // websocket

   config.io = {
    init: {},
    namespace: {
      '/': {
        connectionMiddleware: ['auth'],
        packetMiddleware: ['filter'],
      },
    },
  }

  // swagger 配置
  // config.swagger = {
  //   enable: false, // disable swagger , default true
  //   base: {
  //     /* default config,support cover  
  //     schemes: [
  //         'http',
  //     ],
  //     host: '127.0.0.1:7001',
  //     basePath: '/',
  //     consumes: [
  //     'application/json',
  //     ],
  //     produces: [
  //     'application/json',
  //     ],
  //     */
  //     info: {
  //       description: 'This is a test swagger-ui html',
  //       version: '1.0.0',
  //       title: 'TEST',
  //       contact: {
  //         email: 'caandoll@aliyun.com',
  //       },
  //       license: {
  //         name: 'Apache 2.0',
  //         url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
  //       },
  //     },
  //     tags: [
  //       {
  //         name: 'admin',
  //         description: 'Admin desc',
  //       },
  //       {
  //         name: 'role',
  //         description: 'Role desc',
  //       },
  //     ],
  //     definitions: {
  //       // model definitions
  //     },
  //     securityDefinitions: {
  //       // security definitions
  //     }
  //   },
  // }
  //  session 配置
  config.session = {
    key: 'EGG_SESSION',
    maxAge: 30 * 60 * 1000,
    httpOnly: true,
    renew: true,
    entrypt: true
  }


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
