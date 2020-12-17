const base = require("./webpack.base.config");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const WebpackBar = require("webpackbar");
const { resoveDev } = require("./unit");
// 这个是写死的路由配置,后续会变成自动化
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

const pro = {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: assetsPath("js/[name]_[hash:7].js"),
    publicPath: "./",
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../",
            },
          },
          "css-loader",
          "less-loader",
        ],
      },

      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../",
            },
          },
          "css-loader",
        ],
      },
    ],
  },
  // 优化: 如果有3个文件同时应用同一个js文件,就吧这个js文件抽离出来
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          chunks: "initial",
          name: "common",
          //入口文件引入同一个js三次以上
          minChunks: 3,
          minSize: 1,
          filename: assetsPath("js/[name].[chunkhash].js"),
        },
      },
    },
  },
  plugins: [
    ...hwp,
    // dist 目录清理
    new CleanWebpackPlugin(),
    // css 抽离
    new MiniCssExtractPlugin({
      filename: assetsPath("css/[name].[chunkhash].css"),
    }),
    // 优化,压缩css资源
    new OptimizeCSSPlugin({
      cssProcessorOptions: { safe: true },
    }),
    // 打包加载动画
    new WebpackBar(),
  ],
};

// 路径
function assetsPath(dir) {
  return path.posix.join("static", dir);
}
module.exports = merge(base, pro);
