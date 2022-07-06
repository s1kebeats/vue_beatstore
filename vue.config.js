const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: config => {
    config.plugins.delete("prefetch")
  },
})
module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/Vue-Beatstore/'
    : '/'
}
