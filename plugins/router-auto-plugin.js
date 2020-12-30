// https://github.com/Qymh/vue-router-invoke-webpack-plugin/blob/dev/docs/zh_CN/README.md
const chokidar = require("chokidar");
const fs = require("fs");
const chalk = require("chalk");
const handlebars = require("handlebars");
const path = require("path");
// 格式化 beautify
const beautify = require("js-beautify").js;

const root = process.cwd();
/**
 *
 * @param {*} meta
 * @param {*} filePath
 * @param {*} templatePath
 */
const changeRouterCompile = (meta, filePath, templatePath, text) => {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString();
    const reslut = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, beautify(reslut));
  }
  console.log(chalk.blue(`${text}`));
};
class nodePlugin {
  constructor() {
    this.watchPath = `${root}/src/pages`;
    this.changeRouterTemplate();
  }
  apply(compiler) {
    compiler.hooks.entryOption.tap("beforeRun", () => {
      this.changeRouterTemplate();
    });
    compiler.hooks.entryOption.tap("invoke", () => {
      // 初始化chokidar
      const watcher = chokidar.watch(this.watchPath, { persistent: true });
      watcher.on("addDir", async (pathname, store) => {
        // 判断文件格式,只要创建文件夹,自动生成里面的文件
        const p = pathname.split(path.sep).pop();
        if (p === "pages") return false;
        // 生成对应的html css 和 js
        this.writeInit(p);
        // 跟新路由
        this.changeRouterTemplate();
      });

      watcher.on("unlinkDir", async () => {
        console.log(chalk.blue(`删除成功!`));
        this.changeRouterTemplate();
      });
    });
  }
  // 根据模板生成路由信息
  changeRouterTemplate() {
    const list = fs.readdirSync(this.watchPath).map((v) => ({
      name: v,
    }));
    changeRouterCompile(
      { list },
      `${root}/config/routerTemplate.js`,
      `${root}/config/template/routerTemplate.js.hbs`,
      `路由生成成功!`
    );
    changeRouterCompile(
      { list },
      `${root}/config/entryTemplate.js`,
      `${root}/config/template/entryTemplate.js.hbs`,
      `entry生成成功!`
    );
  }
  // 初始化
  async writeInit(pathName) {
    const list = await fs.readdirSync(this.watchPath);
    // 判断有没有文件,如果有就不用在生成了

    if (list.includes(pathName)) {
      // 有文件夹但是没有文件,
      const fslen = await fs.readdirSync(`${this.watchPath}/${pathName}`);
      if (fslen.length === 0) {
        this.writeHtml(pathName);
        this.writeJs(pathName);
        this.writeCss(pathName);
      }
      return false;
    }
    this.writeHtml(pathName);
    this.writeJs(pathName);
    this.writeCss(pathName);
  }
  // 判断有没有此目录
  async haveDir(path) {
    const havePath = await fs.existsSync(`${root}/src/pages/${path}`);
    return havePath;
  }
  async writeHtml(path) {
    await fs.writeFileSync(
      `${root}/src/pages/${path}/${path}.html`,
      `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${path}</title>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <%= require('html-loader!../../assets/common/template/meta.html') %>
  </head>
  <body>
    <%= require('html-loader!../../assets/common/template/header.html') %>
    <div id="${path}">我是${path}页面</div>
    <%= require('html-loader!../../assets/common/template/footer.html') %>
  </body>
</html>
      `
    );
  }
  async writeJs(path) {
    await fs.writeFileSync(
      `${root}/src/pages/${path}/${path}.js`,
      `
import "./${path}.less";
import "../../assets/common/js/common.js";
import "../../assets/common/less/common.less";`
    );
  }
  async writeCss(path) {
    await fs.writeFileSync(
      `${root}/src/pages/${path}/${path}.less`,
      `#${path}{}`
    );
  }
}

module.exports = nodePlugin;
