const { resove } = require("./unit");
const webpack = require("webpack");
module.exports = {
  resolve: {
    alias: {
      "@": resove("src"),
    },
  },

  ...require("../config/entryTemplate"),
  module: {
    rules: [
      {
        test: require.resolve("jquery"),
        use: "expose-loader?$",
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
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
  ],
};
