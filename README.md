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
3.yarn add axios element-ui 4.新建 src/styles/reset.less 5.引入 element-ui 和 reset

一：登录页面 1.新建 login 页面---配置路由（写一级路由占位符）----写样式---表单 el-form（表单验证）----按钮 el-button---发送 ajax 2.新建 src/utils/request.js--引入 Ajax 准备基地址 封装请求 3.新建 api/user.js 以及其他发送 Ajax 的文件 统一在 api 文件夹里面发送 Ajax 4.登陆成功--打印出 token---vuex 存储 token 且 localStorage 持久化---做响应拦截器

二：首页 1.新建 src/views/Home/index.vue---配路由---写样式---布局 el-layout 2.面包屑 卡片 栅格布局 table 表格 分页 tag 标签 嵌套路由 树形控件

 <!-- 编辑用户信息的按钮 -->

          <el-table-column prop="operation" label="操作">
            <el-row>
              <!-- 编辑按钮 -->
              <el-button
                type="primary"
                icon="el-icon-edit"
                class="edit"
                @click="OnclickEdit"
              >
              </el-button>

              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="open"
              ></el-button>
              <!-- 信息按钮 -->
              <el-button
                type="info"
                icon="el-icon-message"
                @click="dialogFormVisible1 = true"
              ></el-button>
            </el-row>
          </el-table-column>
