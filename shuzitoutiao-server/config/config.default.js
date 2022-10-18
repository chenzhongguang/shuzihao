/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1660177576583_3610';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 数据库配置
  userConfig.mysql = {
    client: {
      host: 'localhost',
      port: '3306',
      user: 'root',
      password: 'root',
      database: 'toutiao',
    },
    app: true,
    agent: false,
  };

  // 配置服务器基本信息
  userConfig.cluster = {
    listen: {
      path: '',
      port: 81,
      // hostname: '127.0.0.1',//默认localhost和ip地址,上线时用0.0.0.0
    },
  };
  // 配置安全验证
  userConfig.security = {
    csrf: {
      enable: false,
      ignoreJSON: true,
    },
  };
  // 文件上传配置
  userConfig.multipart = {
    mode: 'file',
  };
  // token配置
  userConfig.jwt = {
    secret: 'jwt1234',
  };

  return {
    ...config,
    ...userConfig,
  };
};
