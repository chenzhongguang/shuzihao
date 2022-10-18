const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:81",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          //重写匹配的字段，如果不需要在请求路径上，重写为""
          "^/api": "",
        }
      }
    },
    // ,
    // overlay:{
    //   warnings:false,
    //   errors:false
    // }
  },
  lintOnSave: false
})
