const HtmlWebpackPlugin = require("html-webpack-plugin");
const {
    resoveDev
} = require("../build/unit");

const HTMLTEMP = [
    new HtmlWebpackPlugin({
        filename: "index.html",
        template: resoveDev("/index/index.html"),
        title: "index",
        chunks: ["index", "common"],
        minify: {
            removeComments: true,
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
        title: "user",
        chunks: ["user", "common"],
        minify: {
            removeComments: true,
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