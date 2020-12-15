const path = require("path");

module.exports = {
  dev: {
    port: 3000,
    autoOpenBrower: false,
    host: "127.0.0.1",
    overlay: { warnings: false, errors: true },
    openPage: "index.html",
  },
  build: {
    path: path.resolve(__dirname, "../../", "./dist"),
    //如果是目录大于二级,必须设置'/'
    publicPath: "./",
  },
};
