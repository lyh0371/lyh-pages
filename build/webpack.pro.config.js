const base = require("./webpack.base.config");
const { merge } = require("webpack-merge");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 压缩 css
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin"); // 抽离css
const WebpackBar = require("webpackbar");
const HTMLTEMP = require("../config/routerTemplate");
const glob = require("glob-all");
const PurifyCss = require("purifycss-webpack");
const HappyPack = require("happypack"); // 开启多线程
const os = require("os");
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

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
        test: /\.js$/,
        exclude: "/node_modules/",
        loader: "HappyPack/loader?id=js",
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../../",
            },
          },
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
              plugins: [require("autoprefixer")],
            },
          },
          "css-loader",
        ],
      },
      {
        test: /\.ext$/,
        use: ["cache-loader", "babel-loader"],
        include: path.resolve("src"),
      },
    ],
  },

  optimization: {
    // 优化: 如果有3个文件同时应用同一个js文件,就吧这个js文件抽离出来
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
    ...HTMLTEMP,
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
    // css tree-shaking
    new PurifyCss({
      paths: glob.sync([
        path.resolve(__dirname, "./src*.html"),
        path.resolve(__dirname, "./src/*.js"),
      ]),
    }),
    // 开启多线程打包
    new HappyPack({
      id: "js",
      loaders: [
        {
          loader: "babel-loader",
          options: {
            plugins: ["dynamic-import-webpack"],
            cacheDirectory: true,
          },
        },
      ],
      threadPool: happyThreadPool,
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
