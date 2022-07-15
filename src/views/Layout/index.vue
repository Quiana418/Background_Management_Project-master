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
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <el-button
          :collapse="isCollapse"
          :class="isCollapse ? 'smallMenu' : 'spendMenu'"
          @click="isCollapse = !isCollapse"
          :cursor-pointer="true"
        >
          | | |
        </el-button>

        <!-- default-active="" 让当前显示的页面的侧边栏高亮 点击时把当前点击的路径存储起来  -->
        <el-menu
          background-color="#373d41"
          text-color="#fff"
          unique-opened
          :default-active="activePath"
          :collapse="isCollapse"
          @click="isCollapse = !isCollapse"
          :collapse-transition="false"
          router
        >
          <!-- 一级菜单 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in asideMenu"
            :key="item.id"
          >
            <template #title>
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->

            <el-menu-item
              @click="saveActivePath('/' + subItem.path)"
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
            >
              <i class="iconfont icon-dasuolvetuliebiao"></i>
              <span>{{ subItem.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 侧边 -->

      <!-- 内容区域 -->
      <el-main>
        <!-- 二级路由切换点 子页面就在这里显示-->
        <router-view />
      </el-main>
      <!-- 内容区域 -->
    </el-container>
  </el-container>
</template>

<script>
import { getAsideMenu } from '@/api/asideMenu'
export default {
  name: 'Layout',
  async created () {
    // 取出当前点击的侧边栏路径
    this.activePath = window.localStorage.getItem('activePath')
    // 请求左侧侧边栏菜单
    try {
      const res = await getAsideMenu()
      console.log(res)
      this.asideMenu = res.data.data
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      // 控制左侧菜单栏是否折叠
      isCollapse: false,
      // 左侧菜单栏
      asideMenu: [],
      // 左侧菜单栏图标对象
      iconsObj: {
        125: 'iconfont icon-haoyou',
        103: 'iconfont icon-ego-boxfull',
        101: 'iconfont icon-shangpin-xianxing',
        102: 'iconfont icon-dingdan',
        145: 'iconfont icon-shujukanban'
      },
      // 存储当前被点击激活的侧边栏路径
      activePath: ''
    }
  },
  methods: {
    // 点击存储当前点击的路径
    saveActivePath (activePath) {
      window.localStorage.setItem('activePath', activePath)
      // 点击之后 重新赋值
      this.activePath = activePath
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
/deep/.el-menu--vertical {
  height: 50px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.small {
  width: 64px;
}
.big {
  width: 200px;
}
.smallMenu {
  color: #fff;
  width: 64px;
  border: none !important;
  border-radius: unset;
  background-color: #34e7e4 !important;
}
.spendMenu {
  width: 200px;
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
      font-size: 12px;
    }
  }
  /deep/.el-submenu__title {
    background-color: #0d2737 !important;
  }
  /deep/.el-aside {
    background-color: #0d2737;
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
  /deep/.spendMenu {
    border-radius: unset;
    border: none;
    background-color: #34e7e4 !important;
    span {
      font-size: 20px;
      color: #fff;
    }
  }
}
</style>
