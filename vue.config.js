module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true
    },
    electronBuilder: {
      externals: ['serialport'], 
      builderOptions: {
        win: {
          icon: '.public/icon.ico'
        }
      }
    }
  },
  transpileDependencies: [
    /[\\/]node_modules[\\/]quasar[\\/]/
  ]
}
