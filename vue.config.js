const path = require("path");
const resolve = function(dir) {
  return path.join(__dirname, dir);
};
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "./",
  outputDir: "dist",
  assetsDir: "static",
  lintOnSave: false, // 是否开启eslint保存检测
  productionSourceMap: false, // 是否在构建生产包时生成sourcdeMap
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@v", resolve("src/views"))
      .set("@c", resolve("src/components"))
      .set("@u", resolve("src/utils"))
      .set("@s", resolve("src/service")); /* 别名配置 */
    config.optimization.runtimeChunk("single");
  },
  devServer: {
    host: "0.0.0.0", //局域网和本地访问
    port: "8088",
    hot: true,
    /* 自动打开浏览器 */
    open: true,
    overlay: {
      warning: false,
      error: false,
    },
    /* 跨域代理 */
    proxy: {
      "/api": {
        /* 目标代理服务器地址 */
        target: "http://m260048y71.zicp.vip", //
        /* 允许跨域 */
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};