<template>
  <div class="categories_container">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 中间内容区域 -->
    <el-card>
      <el-button type="primary">添加分类</el-button>
      <!-- 表格 -->
      <template>
        <el-table
          :selection-type="false"
          border
          :data="categories"
          style="width: 100%"
        >
          <!-- 折叠展示区域 -->
          <el-table-column type="expand">
            <template v-slot="scope">
              <el-row
                v-for="item in scope.row.children"
                :key="item.id"
              ></el-row>
            </template>
          </el-table-column>

          <!-- 标题区域 -->
          <el-table-column type="index" label="#" width="60"> </el-table-column>
          <template>
            <i class="el-icon-circle-plus"></i>
            <el-table-column prop="cat_name" label="分类名称">
            </el-table-column>
          </template>
          <el-table-column prop="cat_deleted" label="是否有效">
            <i class="el-icon-success" style="color: green"></i>
          </el-table-column>
          <el-table-column prop="cat_level" label="排序">
            <template v-slot="scope">
              <el-tag
                :type="
                  scope.row.cat_level === 0
                    ? 'primary'
                    : scope.row.cat_level === 1
                    ? 'success'
                    : 'warning'
                "
                >{{
                  scope.row.cat_level === 0
                    ? "等级一"
                    : scope.row.cat_level === 1
                    ? "等级二"
                    : "等级三"
                }}</el-tag
              >
            </template>
          </el-table-column>

          <!-- 编辑用户信息的按钮 -->
          <el-table-column prop="operation" label="操作">
            <!-- 编辑按钮 -->
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                class="edit"
                @click="OnclickEdit(scope.row.id)"
              >
              </el-button>

              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="open(scope.row.id)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paramsObj.pagenum"
        :page-sizes="[1, 3, 5, 6, 10]"
        :page-size="paramsObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getGoodsCategories } from '@/api/catogories'
export default {
  name: 'Categories',
  created () {
    this.getGoodsCategories()
  },
  data () {
    return {
      // 商品分类列表
      categories: [],
      // 获取商品分类列表的传参
      paramsObj: {
        pagenum: 1,
        pagesize: 6
      },
      // 数据总条数
      total: 0
    }
  },
  methods: {
    // 获取商品分类列表
    async getGoodsCategories () {
      try {
        const res = await getGoodsCategories(this.paramsObj)
        this.categories = res.data.data.result
        this.total = res.data.data.total
      } catch (err) {
        console.log(err)
      }
    },
    onChangeState () {

    },
    OnclickEdit () { },
    open () { },
    distributeRole () { },

    // 分页切换效果
    handleSizeChange (newSize) {
      this.paramsObj.pagesize = newSize
      this.getGoodsCategories()
    },
    handleCurrentChange (newPage) {
      this.paramsObj.pagenum = newPage
      this.getGoodsCategories()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.el-card {
  margin: 20px;
  .el-button--primary {
    margin-bottom: 20px;
    background-color: #24aeae;
    border: none;
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
