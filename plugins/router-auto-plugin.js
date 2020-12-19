// https://github.com/Qymh/vue-router-invoke-webpack-plugin/blob/dev/docs/zh_CN/README.md
const watch = require("watch");
const fs = require("fs");
const chalk = require("chalk");
const handlebars = require("handlebars");

/**
 *
 * @param {*} meta
 * @param {*} filePath
 * @param {*} templatePath
 */
const changeRouterCompile = (meta, filePath, templatePath) => {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString();
    const reslut = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, reslut);
  }
  console.log(chalk.green(`创建成功!`));
};
// let page = [];
watch.watchTree("../src/pages", async (f, curr, prev) => {
  const list = fs
    .readdirSync("../src/pages")
    .filter((v) => v != "common")
    .map((v) => ({
      name: v,
      file: v,
    }));

  changeRouterCompile(
    { list },
    "../config/htmlWebpack.js",
    "../config/routerTemplate.js.hbs"
  );
});

// class nodePlugin {
//   apply() {
//     watch.watchTree("./src", async (f, curr) => {
//       const res = fs.readdirSync("./src");

//       console.log(res);
//     });
//   }
// }

// module.exports = nodePlugin;
/**
 * 
 * 
 *  let page;
  if (typeof f == "object" && prev === null && curr === null) {
    console.log("完成遍历");
  } else if (prev === null) {
    page = f.split(path.sep).pop();
    console.log(`${page}文件被创建`);
  } else if (curr.nlink === 0) {
    // f was removed
    page = f.split(path.sep).pop();
    console.log(`${page}文件被移除`);
  } else {
    // f was changed
  }
 */
