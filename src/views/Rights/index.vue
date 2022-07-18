<template>
  <div class="rights-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 中间内容区域 -->
    <div class="inner">
      <!-- 表格 -->
      <template>
        <el-table
          border
          stripe
          :data="allRightList"
          style="width: 100%"
          type="expand"
        >
          <el-table-column prop="id" label="#" width="60"> </el-table-column>
          <el-table-column prop="authName" label="权限名称"> </el-table-column>
          <el-table-column prop="path" label="路径"> </el-table-column>
          <el-table-column prop="level" label="权限等级">
            <template slot-scope="scope">
              <el-tag
                :type="
                  scope.row.level === '0'
                    ? 'primary'
                    : scope.row.level === '1'
                    ? 'success'
                    : 'warning'
                "
                plain
                v-model="scope.row.level"
                >{{
                  scope.row.level === "0"
                    ? "等级一"
                    : scope.row.level === "1"
                    ? "等级二"
                    : "等级三"
                }}
              </el-tag>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import { getRightsList } from '@/api/rights'
export default {
  name: 'Rights',
  created () {
    // 获取所有权限列表
    this.getRightsList()
  },
  data () {
    return {
      // 获取所有权限列表的请求参数
      list: 'list',
      // 所有权限列表
      allRightList: []
    }
  },
  methods: {
    // 获取所有权限列表
    async getRightsList () {
      try {
        const res = await getRightsList(this.list)
        // console.log(res)
        this.allRightList = res.data.data
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.rights-container {
  width: 100%;
  /deep/.inner {
    border-radius: 3px;
    padding: 30px !important;
    margin: 20px !important;
    width: 100%;
    // height: 450px;
    background-color: #fff;
  }
}
</style>
