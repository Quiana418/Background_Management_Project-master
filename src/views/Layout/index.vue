<template>
  <el-container class="container">
    <!-- 头部 -->
    <el-header>
      <div class="right">
        <div class="logo">
          <img
            src="http://liufusong.top/hm-admin/img/heima.b5a855ee.png"
            alt=""
          />
        </div>
        <div class="title">绍兴华彧进出口有限公司</div>
      </div>
      <el-button @click="$router.push('/login')">退出</el-button>
    </el-header>
    <!-- 头部 -->

    <el-container>
      <!-- 侧边 -->
      <el-aside width="200px">
        <el-button
          :collapse="isCollapse"
          class="toggleMenu"
          @click="isCollapse = !isCollapse"
        >
          | | |
        </el-button>
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-submenu index="1">
            <template #title>
              <i class="iconfont icon-haoyou"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="iconfont icon-dasuolvetuliebiao"></i>
              <span @click="$router.push({ name: 'users' })">用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template #title>
              <i class="iconfont icon-ego-boxfull"></i>
              权限管理
            </template>
            <el-menu-item index="2-1">
              <i class="iconfont icon-dasuolvetuliebiao"></i>
              <span @click="$router.push({ name: 'roles' })">角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-2">
              <i class="iconfont icon-dasuolvetuliebiao"></i>
              <span @click="$router.push({ name: 'rights' })">权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template #title>
              <i class="iconfont icon-shangpin-xianxing"></i>
              商品管理
            </template>
            <el-menu-item index="3-1">
              <i class="iconfont icon-dasuolvetuliebiao"></i>
              <span @click="$router.push({ name: 'goods' })">商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="iconfont icon-dasuolvetuliebiao"></i>

              <span @click="$router.push({ name: 'params' })">分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="iconfont icon-dasuolvetuliebiao"></i>
              <span @click="$router.push({ name: 'categories' })"
                >商品分类</span
              >
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template #title>
              <i class="iconfont icon-dingdan"></i>
              订单管理
            </template>
            <el-menu-item index="4-1">
              <i class="iconfont icon-dasuolvetuliebiao"></i>
              <span @click="$router.push({ name: 'orders' })">订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template #title>
              <i class="iconfont icon-shujukanban"></i>
              数据统计
            </template>
            <el-menu-item index="5-1">
              <i class="iconfont icon-dasuolvetuliebiao"></i>
              <span @click="$router.push({ name: 'reports' })">数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 侧边 -->

      <!-- 内容区域 -->
      <el-main>
        <!-- 二级路由切换点 -->
        <router-view />
      </el-main>
      <!-- 内容区域 -->
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'Layout',
  created () { },
  data () {
    return {
      // 控制左侧菜单栏是否折叠
      isCollapse: false
    }
  },
  methods: {
    // 控制左侧菜单栏折叠 展开
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-width: 64px;
  min-height: 400px;
}
.container {
  height: 100vh;
  .el-menu-item.is-active {
    color: #19d1ff;
  }

  .iconfont {
    margin-left: 6px;
    margin-right: 8px;
  }
  .el-header {
    .right {
      display: flex;
      align-items: center;
      .logo {
        img {
          width: 61px;
          height: 56px;
        }
      }
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #142b39;
    .title {
      margin-left: 15px;
      font-size: 22px;
      color: #fff;
      font-weight: normal;
    }
    .el-button {
      color: #606266;
      font-size: 14px;
    }
  }
  /deep/.el-submenu__title {
    background-color: #0d2737 !important;
  }
  .el-aside {
    background-color: #0d2737;
    .toggleMenu {
      border: 0;
      border-radius: unset;
      text-align: center;
      font-size: 20px;
      color: #fff;
      width: 200px;
      height: 40px;
      line-height: 10px;
      background-color: #34e7e4;
    }
  }
  .el-main {
    padding: 20px;
    background-color: #eaedf1;
  }
  .el-menu {
    border-right: none;
  }
  /deep/.el-menu-vertical-demo {
    background: #0d2737 !important;
  }
  /deep/.el-menu-item {
    // background-color: #d2cdda !important;
    background-color: #1b3f55 !important;
  }
}
</style>
