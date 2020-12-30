const base = require("./webpack.base.config");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const config = require("../config");
const portfinder = require("portfinder"); // 自动获取端口
const { merge } = require("webpack-merge");
const HTMLTEMP = require("../config/htmlWebpack");

const dev = {
  mode: "development",
  devServer: {
    contentBase: false,
    historyApiFallback: false,
    hot: true,
    quiet: true,
    // 出现错误时，在浏览器中显示全屏覆盖层
    overlay: {
      warnings: false,
      errors: true,
    },
    host: config.dev.host,
    port: config.dev.port,
    open: config.dev.autoOpenBrower,
    openPage: config.dev.openPage,
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
  plugins: [...HTMLTEMP],
};
const devWebpackConfig = merge(base, dev);

module.exports = new Promise((reslove, reject) => {
  portfinder.basePort = config.dev.port;
  portfinder.getPort((err, port) => {
    if (err) {
    } else {
      devWebpackConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `您的应用运行成功: http://localhost:${config.dev.port}/${config.dev.openPage}`,
            ],
          },
        })
      );
    }

    reslove(devWebpackConfig);
  });
});
