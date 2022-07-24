<template>
  <div class="addGoods-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 中间内容区域 -->
    <el-card>
      <el-alert
        title="添加商品信息"
        type="info"
        center
        show-icon
        :closable="false"
      >
      </el-alert>

      <el-steps :space="200" :active="0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>

      <el-radio-group v-model="tabPosition"> </el-radio-group>
      <el-form>
        <el-tabs :tab-position="tabPosition" style="height: 200px">
          <el-tab-pane label="基本信息">
            <BaseInfo></BaseInfo>
          </el-tab-pane>
          <el-tab-pane label="商品参数">
            <GoodsParams></GoodsParams>
          </el-tab-pane>
          <el-tab-pane label="商品属性">
            <GoodsProperty></GoodsProperty
          ></el-tab-pane>
          <el-tab-pane label="商品图片">
            <GoodsImage></GoodsImage>
          </el-tab-pane>
          <el-tab-pane label="商品内容"
            ><GoodsContent></GoodsContent>
            <!-- 添加商品按钮 -->
            <el-button type="primary">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import BaseInfo from './components/BaseInfo.vue'
import GoodsParams from './components/GoodsParams.vue'
import GoodsProperty from './components/GoodsProperty.vue'
import GoodsImage from './components/GoodsImage.vue'
import GoodsContent from './components/GoodsContent.vue'
export default {
  name: 'Add',
  created () { },
  data () {
    return {
      // 控制左侧tab栏位置
      tabPosition: 'left'
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {
    BaseInfo,
    GoodsParams,
    GoodsProperty,
    GoodsImage,
    GoodsContent
  }
}
</script>

<style scoped lang='less'>
.el-card {
  border-radius: 3px;
  margin: 20px;
  .el-steps--horizontal {
    margin-top: 15px;
  }
  .el-tabs {
    height: unset !important;
  }
  .el-button--primary {
    border: none;
    background-color: rgb(36, 174, 174);
  }
}
</style>
