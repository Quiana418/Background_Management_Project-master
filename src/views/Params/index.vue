<template>
  <div class="params-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 中间内容区域 -->
    <el-card>
      <el-alert
        title="注意：只允许为第三级分类设置相关参数！"
        type="warning"
        show-icon
        :closable="false"
      >
      </el-alert>

      <div class="chooseCategory">
        <span>选择商品分类：</span>
        <el-cascader
          v-model="selectList"
          :options="categories"
          :props="{
            expandTrigger: 'hover',
            value: 'cat_id',
            label: 'cat_name',
            children: 'children',
          }"
          @change="onChange"
        ></el-cascader>
      </div>

      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="primary"
            :disabled="this.selectList.length < 3"
            @click="dialogFormVisible = true"
            >添加参数</el-button
          >
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only"
          ><el-button
            type="primary"
            :disabled="this.selectList.length < 3"
            @click="dialogFormVisible = true"
            >添加属性</el-button
          ></el-tab-pane
        >
      </el-tabs>

      <!-- 动态参数表格 -->
      <template v-if="this.activeName === 'many'">
        <el-table
          border
          stripe
          :data="dynamicCategoriesList"
          style="width: 100%"
          :tree-props="{ children: 'children' }"
        >
          <!-- 标题区域 -->
          <!-- 索引栏 -->
          <el-table-column label="#" width="60" type="index"> </el-table-column>
          <template>
            <el-table-column prop="attr_name" label="分类名称">
            </el-table-column>
          </template>

          <!-- 编辑动态参数的按钮 -->
          <el-table-column label="操作">
            <!-- 编辑按钮 -->
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                class="edit"
                @click="editParamsFormMethod(scope.row)"
                >编辑
              </el-button>

              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delParams(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 静态属性表格 -->
      <template v-else>
        <el-table
          border
          stripe
          :data="staticCategoriesList"
          style="width: 100%"
          :tree-props="{ children: 'children' }"
        >
          <!-- 标题区域 -->
          <!-- 索引栏 -->
          <el-table-column label="#" width="60" type="index"> </el-table-column>
          <template>
            <el-table-column prop="attr_name" label="分类名称">
            </el-table-column>
          </template>

          <!-- 编辑静态属性的按钮 -->
          <el-table-column label="操作">
            <!-- 编辑按钮 -->
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                class="edit"
                @click="editParamsFormMethod(scope.row)"
                >编辑
              </el-button>

              <!-- 删除按钮 -->
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="delParams(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </template>
    </el-card>

    <!-- 添加参数或者 添加属性 的对话框 -->
    <el-dialog
      :title="this.activeName === 'many' ? '添加动态参数' : '添加静态属性'"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="dynamicParamsForm" :rules="rules" ref="myForm">
        <el-form-item
          :label="this.activeName === 'many' ? '动态参数' : '静态属性'"
          prop="attr_name"
          label-width="80px"
        >
          <el-input
            v-model="dynamicParamsForm.attr_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑动态参数 的对话框 -->
    <el-dialog title="修改动态参数" :visible.sync="dialogFormVisible1">
      <el-form :model="editParamsForm" :rules="rules" ref="myForm">
        <el-form-item label="动态参数" prop="attr_name" label-width="80px">
          <el-input
            v-model="editParamsForm.attr_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="editSubmitParams(editParamsForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- 编辑静态属性 的对话框 -->
    <el-dialog title="修改静态属性" :visible.sync="dialogFormVisible2">
      <el-form :model="editParamsForm" :rules="rules" ref="myForm">
        <el-form-item label="静态属性" prop="attr_name" label-width="80px">
          <el-input
            v-model="editParamsForm.attr_name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editSubmitParams(editParamsForm)"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getGoodsCategories } from '@/api/catogories'
import { getCategoryParams, addDynamicParams, editParams, delParams } from '@/api/categoryParams'
export default {
  name: 'Params',
  async created () {
    try {
      // 获取商品分类 渲染到级联选择器
      const res = await getGoodsCategories(this.paramsObj)
      this.categories = res.data.data
    } catch (err) {
      console.log(err)
    }
  },
  data () {
    return {
      // 所有商品分类列表
      categories: [],
      // 商品分类级联选择器 选中的分类数组
      selectList: [],
      paramsObj: {
        type: 3
      },
      activeName: 'many',
      // 动态参数列表
      dynamicCategoriesList: [],
      // 静态参数列表
      staticCategoriesList: [],
      // 控制添加动态参数的对话框
      dialogFormVisible: false,
      // 控制静态编辑参数对话框
      dialogFormVisible1: false,
      // 控制动态编辑参数对话框
      dialogFormVisible2: false,
      // 添加动态参数表格 数据
      dynamicParamsForm: {
        attr_name: ''
      },
      // 编辑动态参数表格
      editParamsForm: {
        attr_name: ''
      },
      rules: {
        attr_name: [
          { required: true, message: '参数名不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '长度在2-7个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 级联选择器选项发生改变时触发
    onChange () {
      this.getParamsData()
    },
    // tab标签被选中时触发
    handleClick () {
      this.getParamsData()
    },
    // 获取参数的函数 封装起来 在级联选择器和tab标签切换时均要触发
    async getParamsData () {
      // 请求获取分类参数
      if (this.selectList.length < 3) {
        this.selectList = []
        return this.$message.error('必须选中三级分类参数')
      }
      // 动态参数
      try {
        const res = await getCategoryParams(
          this.selectList[this.selectList.length - 1] - 0,
          this.activeName
        )
        // 如果点击动态参数 那么获取到的数据就是动态参数
        if (this.activeName === 'many') {
          this.dynamicCategoriesList = res.data.data
        } else {
          this.staticCategoriesList = res.data.data
        }
      } catch (err) {
        console.log(err)
      }
    },
    // 点击添加参数按钮 添加参数
    addParams () {
      this.dialogFormVisible = false
      // const catId = this.selectList[this.selectList.length - 1] - 0
      this.$refs.myForm.validate(async valid => {
        if (!valid) return this.$message.error('表单校验失败，请重新填写')
        try {
          await addDynamicParams(
            {
              id: this.selectList[this.selectList.length - 1] - 0,
              attr_name: this.dynamicParamsForm.attr_name,
              attr_sel: this.activeName
            }
          )
          this.getParamsData()
          this.$refs.myForm.resetFields()
        } catch (err) {
          console.log(err)
        }
      })
    },
    // 点击动态参数 编辑按钮  回显编辑框数据
    editParamsFormMethod (data) {
      this.editParamsForm = { ...data }
      this.dialogFormVisible1 = true
    },
    // 点击编辑对话框里的确定按钮 提交修改
    async editSubmitParams (form) {
      try {
        await editParams({
          id: form.cat_id,
          attrId: form.attr_id,
          attr_name: form.attr_name,
          attr_sel: form.attr_sel
        })
        this.dialogFormVisible1 = false
        this.dialogFormVisible2 = false
        this.getParamsData()
      } catch (err) {
        console.log(err)
      }
    },
    // 删除分类
    async delParams (row) {
      console.log(row)
      try {
        const res = await delParams({
          id: row.cat_id - 0,
          attrid: row.attr_id - 0
        })
        console.log(res)
        this.getParamsData()
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
.el-card {
  margin: 20px;
}
.chooseCategory {
  margin-top: 15px;
}
.el-button--primary {
  margin-bottom: 20px;
  background-color: #24aeae;
  border: none;
}
</style>
