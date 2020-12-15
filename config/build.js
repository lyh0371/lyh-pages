const webpack = require("webpack");
const webpackConfig = require("./webpack.pro.config");
const chalk = require("chalk");
webpack(webpackConfig, (err, stats) => {
  if (err) throw err;
  process.stdout.write(
    stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false,
    }) + "\n\n"
  );
  console.log(stats.hasErrors());
  if (stats.hasErrors()) {
    console.log(chalk.red("  Build failed with errors.\n"));
    process.exit(1);
  }

  console.log(chalk.cyan("  Build complete(打包成功).\n"));
  console.log(chalk.yellow("输出目录dist"));
});
