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
  config.middleware = ['jwt', 'errorHeader'];
  config.errorHeader = {
    enable: true,
    match: '/api'
  }
  //ignore: [/(swagger|pub)/,'/public/', '/api/admin/login','/api/admin/upload','/api/admin/uploadFile' ,'/api/wx'], // 哪些请求不需要认证
  config.jwt = {
    enable: true,
    ignore: [/(swagger|public|login|upload)/,'/api/wx'], // 哪些请求不需要认证
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
// jwt 过期时间设置
  config.jwtTime = 1000*60*60*8 // 过期时间,八个小时

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
      },
      msg:{
        host:'127.0.0.1',
        port:'6379',
        db:3,
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
  // 文件上传配置
  config.multipart={
    fileExtensions : [
      // text
     '.ppt','.pptx','.doc','.docx','.pdf',
      // picture
      '.jpg','.jpeg','.png','.gif'
    
    ]
  }




  // swagger 配置
  config.swaggerdoc={
    dirScanner: './app/controller/wx',
    apiInfo: {
      title: '运维助手API文档',
      description: 'swagger-ui for 运维助手',
      version: '1.0.0',
    },
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    securityDefinitions: {
      // apikey: {
      //   type: 'apiKey',
      //   name: 'clientkey',
      //   in: 'header',
      // },
      // oauth2: {
      //   type: 'oauth2',
      //   tokenUrl: 'http://petstore.swagger.io/oauth/dialog',
      //   flow: 'password',
      //   scopes: {
      //     'write:access_token': 'write access_token',
      //     'read:access_token': 'read access_token',
      //   },
      // },
    },
    enableSecurity: false,
    // enableValidate: true,
    routerMap: false,
    enable: true,
  };
  //  session 配置
  config.session = {
    key: 'EGG_SESSION',
    maxAge: 30 * 60 * 1000,
    httpOnly: false,
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
