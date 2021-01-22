## 使用

```js
git clone  https://github.com/lyh0371/simple-vue-router

npm install // 安装依赖

npm run dev  // 开发环境

npm run build  // 生产环境

```

## 文档

- [基于 webpack 打包多页应用,对前端工程化的思考(下)](https://juejin.cn/post/6911945908226080782)
- [基于 webpack 打包多页应用,对前端工程化的思考](https://juejin.cn/post/6907040632045305863)

## 演示

[点击查看 gif](https://juejin.cn/post/6911945908226080782#heading-1)

使用命令行创建

```js

npm install lyhs-cli -g

lyh create xxx
```

## 使用依赖介绍(后续持续更新)

### `@babel/core`,`@babel/preset-env`,`babel-loader`,`babel-plugin-dynamic-import-webpack`

babel 插件集,主要用户 ES6->ES5

### `less`,`less-loader`,`style-loader`,`css-loader`

处理 less 及 css

## `mini-css-extract-plugin`

压缩 css

### `html-loader`,`html-webpack-plugin`

处理 html 中的图片及 html 模板

### `webpack` ,`webpack-cli`

webpack 支持

### `webpack-merge`

用于配置拆分后的组合

### `webpack-dev-server`

开发环境 server

### `url-loader`,`file-loader`

处理图片

### `clean-webpack-plugin`

每次打包前删除 dist 目录

### `copy-webpack-plugin`

复制不需要进行打包文件到打包目录

### `webpackbar`,`chalk`

优化打包进度及更改打包后内容提示颜色

### `handlebars`

模板

### purifycss-webpack purify-css

css tree-shaking

### happypack

开启多进程,优化 webpack 构建速度

## 交个朋友

关注微信公众号码不停息,做前端正规军(可加群交流哦)

![公众号码不停息](https://github.com/lyh0371/lyh-pages/blob/master/mbtx.jpg)
