// 这是项目发布节点需要用到的 babel 插件
const prodPlugins = ['transform-remove-console']

if(process.env.NODE_ENV === 'production') {
  prodPlugins.push('')
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  'plugins': [
    // 发布产品时候的插件数组
    // ...prodPlugins
    '@babel/plugin-syntax-dynamic-import'
  ]
}
