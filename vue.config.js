const { defineConfig } = require('@vue/cli-service')
const ImageminPlugin = require('imagemin-webpack-plugin').default

module.exports = defineConfig({
  transpileDependencies: true,

  chainWebpack: config => {
    config.plugins.delete("prefetch")
  },
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue_beatstore/'
    : '/'
}

module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new ImageminPlugin({
        pngquant: {
          quality: '90-95'
        }
      })
    ]
  }
}