const path = require("path")
module.exports = {
    entry: {
        index: path.join(__dirname, "../src/pages/index/index.js"),
        user: path.join(__dirname, "../src/pages/user/user.js"),
    },
};