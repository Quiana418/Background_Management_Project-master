# hm-admin

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目备注

基础操作
1.views 下面放当前页面所用的组件
2.components 下面放公共组件
3.yarn add axios element-ui 
4.新建 src/styles/reset.less 
5.引入 element-ui 和 reset

一：登录页面
1.新建 login 页面---配置路由（写一级路由占位符）----写样式---表单 el-form（表单验证）----按钮 el-button---发送ajax
2.新建src/utils/request.js--引入Ajax 准备基地址 封装请求 
3.新建api/user.js 以及其他发送Ajax的文件 统一在api文件夹里面发送Ajax
4.登陆成功--打印出token---vuex存储token且localStorage持久化---做响应拦截器

二：首页
1.新建src/views/Home/index.vue---配路由---写样式---布局el-layout
2.面包屑 卡片 栅格布局 table表格 分页  tag标签  嵌套路由  树形控件
