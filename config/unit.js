const path = require("path");
const assetsPath = (dir) => {
  return path.posix.join("static", dir);
};
const resove = (dir) => {
  return path.join(__dirname, "..", dir);
};
const resoveDev = (dir) => {
  return path.join(__dirname, "..", "./src/pages", dir);
};
module.exports = {
  assetsPath,
  resove,
  resoveDev,
};
