const { defineConfig } = require("@vue/cli-service")
module.exports = defineConfig({
  productionSourceMap: true,
  transpileDependencies: ["vuetify"],
  // publicPath: "/dist",
  // pluginOptions: {
  //   webpackBundleAnalyzer: {
  //     openAnalyzer: false,
  //   },
  // },
})
