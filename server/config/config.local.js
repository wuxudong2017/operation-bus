'use strict'
// 本地开发环境配置
const sequelize = require('./db.local')
module.exports = appInfo => {
  const config = {};
  config.host ='http://192.168.17.146:7001'
  config.sequelize = sequelize
  return config;
};