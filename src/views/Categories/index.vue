<template>
  <div class="categories_container">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 中间内容区域 -->
    <el-card>
      <el-button type="primary" @click="addCategory">添加分类</el-button>
      <!-- 表格 -->
      <template>
        <el-table
          :selection-type="false"
          border
          :data="categories"
          style="width: 100%"
          row-key="cat_id"
          :tree-props="{ children: 'children' }"
        >
          <!-- 标题区域 -->
          <!-- 索引栏 -->
          <el-table-column
            label="#"
            width="60"
            type=""
            prop="indexId"
            cell-class-name="tableCellClassName"
            raw-class-name="tableCellClassName"
          >
          </el-table-column>
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
              <el-button type="primary" icon="el-icon-edit" class="edit">
              </el-button>

              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delCategory(scope.row)"
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

    <!-- 添加分类的弹框 -->
    <el-dialog title="添加商品分类" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="分类名称" label-width="80px" prop="cat_name">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类" label-width="80px">
          <el-cascader
            v-model="selectList"
            :options="categories1"
            :props="{
              checkStrictly: true,
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
            }"
            placeholder="请选择"
          >
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCategory1">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getCategoryLevel2, addCategory, getGoodsCategories, delCategory } from '@/api/catogories'
export default {
  name: 'Categories',
  created () {
    this.getGoodsCategories()
  },
  data () {
    return {
      // 全部商品分类列表
      categories: [],
      // 获取商品分类列表的传参
      paramsObj: {
        pagenum: 1,
        pagesize: 6
      },
      // 数据总条数
      total: 0,
      // 获取商品分类 回写添加分类表单里的数据 的传参
      type: 2,
      // 添加分类的表单弹窗
      dialogFormVisible: false,
      // 一级二级分类列表
      categories1: [],
      // 添加分类表单数据
      form: {
        cat_name: ''
      },
      // 添加分类中 级联选择器选中的数组
      selectList: [],
      // 添加分类表单校验规则
      rules: {
        cat_name: [
          { required: true, message: '分类名称不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '名称在2-8个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 获取商品分类列表
    async getGoodsCategories () {
      try {
        const res = await getGoodsCategories(this.paramsObj)
        const arr = res.data.data.result
        for (let i = 0; i < arr.length; i++) {
          arr[i].indexId = i + 1
        }
        this.categories = arr
        this.total = res.data.data.total
      } catch (err) {
        console.log(err)
      }
    },
    // 设置索引号 暂未生效
    tableCellClassName (row, rowIndex, column, columnIndex) {
      column.index = columnIndex
      row.index = rowIndex
    },
    // 点击添加分类按钮 回写表单数据
    async addCategory () {
      try {
        this.dialogFormVisible = true
        const res = await getCategoryLevel2({ type: this.type })
        // console.log(res)
        this.categories1 = res.data.data
      } catch (err) {
        console.log(err)
      }
    },
    // 点击添加分类里的确定按钮 提交添加角色
    async addCategory1 () {
      // eslint-disable-next-line camelcase
      const cat_level = this.selectList.length
      // eslint-disable-next-line camelcase
      const cat_pid = this.selectList[this.selectList.length - 1]
      // eslint-disable-next-line camelcase
      const cat_name = this.form.cat_name
      try {
        await addCategory({ cat_level, cat_name, cat_pid })
        this.$message.success('添加分类成功')
        // console.log(res)
        this.getGoodsCategories()
        this.dialogFormVisible = false
      } catch (err) {
        console.log(err)
        this.$message.error('添加分类失败')
      }
    },

    // 点击删除 删除分类
    async delCategory (row) {
      try {
        if (this.categories.length === 1) {
          this.paramsObj.pagenum--
        }
        await delCategory(row.cat_id)
        this.$message.success('删除成功')
        this.getGoodsCategories()
      } catch (err) {
        console.log(err)
      }
    },

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
