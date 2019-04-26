'use strict'
// 本地开发环境配置
const sequelize = require('./db.local')
module.exports = appInfo => {
  const config = {};
  config.host ='http://127.0.0.1:7001'
  config.sequelize = sequelize
  return config;
};