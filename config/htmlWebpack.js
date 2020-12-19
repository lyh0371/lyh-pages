const HtmlWebpackPlugin = require("html-webpack-plugin");
const { resoveDev } = require("./unit");

const HTMLTEMP = [
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

module.exports = HTMLTEMP;
