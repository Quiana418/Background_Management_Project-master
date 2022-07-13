const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '绍兴华彧后台管理系统'
        return args
      })
  }
  // 代理服务器
  // devServer: {
  //   proxy: {
  //     // 当本地的请求地址有/api时 代理服务器就会代理我们的请求地址向另一个服务器发出请求
  //     // 跨域的本质：浏览器的同源策略，这个Ajax请求不由浏览器发送，由脚手架发送了
  //     // 以/api开头的就往'http://ihrm.itheima.net/'这个地址去  可以配置多个
  //     '/huayu': {
  //       // 跨域请求的地址
  //       target: 'http://liufusong.top:8899/api/private/v1/',
  //       // 只有这个值为true 才表示开启跨域
  //       changeOrigin: true,
  //       // 路径重写 把jiangnan替换为''
  //       pathRewrite: { '^/huayu': '' }
  //     }
  //   }
  // }
})
