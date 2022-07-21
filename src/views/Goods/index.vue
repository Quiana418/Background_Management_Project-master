<template>
  <div class="goods_container">
    <!-- 商品列表 -->
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 中间内容区域 -->
    <el-card>
      <!-- 顶部输入框和按钮 -->
      <div class="top">
        <!-- 输入框 -->
        <!-- clearable 可清空操作 带有事件：clear -->
        <!-- @clear="getGoodsList" 点击清空 显示全部数据 -->
        <div style="margin-top: 15px">
          <el-input
            clearable
            @clear="getGoodsList()"
            placeholder="请输入内容"
            v-model="paramsObj.query"
            class="input-with-select"
          >
            <!-- 点击搜索按钮 获取用户数据列表 重新渲染数据到页面 -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getGoodsList()"
            ></el-button>
          </el-input>
        </div>
        <el-button type="primary" class="addUser" @click="dialogVisible = true"
          >添加商品</el-button
        >
      </div>

      <!-- 表格 -->
      <template>
        <el-table border :data="goodsList" style="width: 100%">
          <el-table-column type="index" label="#" width="60"> </el-table-column>
          <el-table-column prop="goods_name" label="商品名称">
          </el-table-column>
          <el-table-column prop="goods_price" label="商品价格（元）">
          </el-table-column>
          <el-table-column prop="goods_weight" label="商品重量">
          </el-table-column>
          <el-table-column prop="add_time" label="创建时间"> </el-table-column>

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
        :page-sizes="[1, 3, 5, 10]"
        :page-size="paramsObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// import dayjs from 'dayjs'
import { getGoodsList } from '@/api/goods'
export default {
  name: 'Goods',
  created () {
    // 获取商品列表数据
    this.getGoodsList()
  },
  data () {
    return {
      // 获取商品列表数据 传参
      paramsObj: {
        // 搜索框输入的内容
        query: '',
        pagenum: 1,
        pagesize: 6
      },
      // 商品列表数据
      goodsList: [],
      // 商品数据总条数
      total: '',
      getUserList: [],
      user: {},
      dialogVisible: false,
      userList: []
    }
  },
  methods: {
    // 获取商品列表数据
    async getGoodsList () {
      try {
        const res = await getGoodsList(this.paramsObj)
        // console.log(res)
        this.goodsList = res.data.data.goods
        this.paramsObj.pagenum = res.data.data.pagenum
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
    handleSizeChange () { },
    handleCurrentChange () { }
  },
  computed: {},
  watch: {},
  filters: {
    // 把毫秒时间戳转换为具体时间
    /*  formatDate: {
      dayjs.unix(this.goodsList.add_time).format('YYYY-MM-DD')
    } */
  },
  components: {}
}
</script>

<style scoped lang='less'>
.el-card {
  border-radius: 3px;
  margin: 20px;
  width: 100%;
  // height: 450px;
  background-color: #fff;
  .top {
    margin-bottom: 30px;
    height: 40px;
    display: flex;
    align-items: center;
    .addUser {
      margin-left: 20px;
      margin-top: 14px;
      border: none;
    }
    .el-button--primary {
      background-color: rgb(36, 174, 174);
    }
    .el-input {
      width: 450px;
    }
  }
  .el-pagination {
    margin-top: 20px;
  }
}
</style>
