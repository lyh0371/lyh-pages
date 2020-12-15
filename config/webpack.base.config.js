const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
function resove(dir) {
  return path.join(__dirname, "..", dir);
}
module.exports = {
  resolve: {
    alias: {
      "@": resove("src"),
    },
  },
  entry: {
    index: path.join(__dirname, "../src/pages/index/index.js"),
    user: path.join(__dirname, "../src/pages/user/user.js"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: "/node_modules/",
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false, // 不采用.babelrc的配置
            plugins: ["dynamic-import-webpack"],
            presets: ["@babel/preset-env"],
          },
        },
      },
      // 处理图片
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "[name]_[hash:7].[ext]",
          outputPath: "./static/images",
          //   publicPath: "./static/images",
          esModule: false,
        },
      },
    ],
  },
  plugins: [],
};
