// https://github.com/Qymh/vue-router-invoke-webpack-plugin/blob/dev/docs/zh_CN/README.md
const watch = require("watch");
// const fs = require("fs");
const path = require("path");

let page = [];
watch.watchTree("./src/pages", async (f, curr, prev) => {
  let page;
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
