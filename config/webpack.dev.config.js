const path = require("path");
const base = require("./webpack.base.config");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require("./config");
const portfinder = require("portfinder"); // 自动获取端口
const { merge } = require("webpack-merge");
const { resoveDev } = require("./unit");
const hwp = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: resoveDev("/index/index.html"),
    title: "首页",
    chunks: ["index", "common"],
    minify: {
      removeComments: false,
      collapseWhitespace: false,
      removeAttributeQuotes: false,
      //压缩html中的js
      minifyJS: false,
      //压缩html中的css
      minifyCSS: false,
    },
  }),
  //  template: path.join(__dirname, "../src/pages/user/user.html"),
  new HtmlWebpackPlugin({
    filename: "user.html",
    template: resoveDev("/user/user.html"),
    title: "我的",
    chunks: ["user", "common"],
    minify: {
      removeComments: false,
      collapseWhitespace: false,
      removeAttributeQuotes: false,
      //压缩html中的js
      minifyJS: false,
      //压缩html中的css
      minifyCSS: false,
    },
  }),
];
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
  plugins: [...hwp],
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
