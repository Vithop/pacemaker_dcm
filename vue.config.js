module.exports = {
  pluginOptions: {
    quasar: {
      treeShake: true
    },
    electronBuilder: {
      externals: ['serialport']
    }
  },
  transpileDependencies: [
    /[\\/]node_modules[\\/]quasar[\\/]/
  ]
}
