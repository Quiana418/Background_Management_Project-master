<template>
  <div class="categories_container">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 中间内容区域 -->
    <el-card>
      <!-- 顶部输入框和按钮 -->
      <div class="top">
        <!-- 输入框 -->
        <!-- clearable 可清空操作 带有事件：clear -->
        <!-- @clear="getOrderList" 点击清空 显示全部数据 -->
        <div style="margin-top: 15px">
          <el-input
            clearable
            @clear="getOrderList()"
            placeholder="请输入内容"
            v-model="paramsObj.query"
            class="input-with-select"
          >
            <!-- 点击搜索按钮 获取用户数据列表 重新渲染数据到页面 -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getOrderList()"
            ></el-button>
          </el-input>
        </div>
      </div>
      <!-- 表格 -->
      <template>
        <el-table
          :selection-type="false"
          border
          :data="orderList"
          style="width: 100%"
        >
          <!-- 标题区域 -->
          <!-- 索引栏 -->
          <el-table-column label="#" width="60" type="index"> </el-table-column>
          <template>
            <el-table-column prop="order_number" label="订单编号">
            </el-table-column>
          </template>
          <el-table-column
            prop="order_price"
            label="订单价格"
          ></el-table-column>
          <el-table-column prop="order_pay" label="是否付款">
            <template v-slot="scope">
              <el-tag
                effect="dark"
                :type="scope.row.order_pay === '0' ? 'danger' : 'success'"
                >{{ scope.row.order_pay === "0" ? "未付款" : "已付款" }}</el-tag
              >
            </template>
          </el-table-column>
          <el-table-column prop="is_send" label="是否发货"></el-table-column>
          <el-table-column prop="create_time" label="下单时间">
            <template v-slot="scope">
              {{ scope.row.create_time | formatDate }}</template
            >
          </el-table-column>

          <!-- 编辑用户信息的按钮 -->
          <el-table-column label="操作">
            <!-- 编辑按钮 -->
            <template>
              <el-button
                type="primary"
                icon="el-icon-edit"
                class="edit"
                @click="dialogVisible = true"
              >
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="paramsObj.pagenum.Number"
        :page-sizes="[1, 3, 5, 6, , 10]"
        :page-size="paramsObj.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <!-- 修改收货地址对话框 -->
    <el-dialog
      title="修改收货地址"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <!-- 内容区域 级联选择器-->
      <el-cascader
        v-model="value"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
      ></el-cascader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getOrderList } from '@/api/orders'
export default {
  name: 'Orders',
  created () {
    this.getOrderList()
  },
  data () {
    return {
      // 订单数据
      orderList: [],
      dialogVisible: false,
      // 获取订单数据 传参
      paramsObj: {
        query: '',
        pagesize: 6,
        pagenum: 1
      },
      // 订单数据总条数
      total: 0,
      value: [],
      options: [
        {
          value: 'beijing',
          label: '北京市',
          children: [
            { label: '东城区' }
          ]
        },
        { label: '天津市' },
        { label: '河北市' },
        { label: '山西省' }
      ]
    }
  },
  methods: {
    // 获取订单数据
    async getOrderList () {
      try {
        const res = await getOrderList(this.paramsObj)
        console.log(res)
        this.orderList = res.data.data.goods
        this.total = res.data.data.total
      } catch (e) {
        console.log(e)
      }
    },
    // 分页切换效果
    handleSizeChange (newSize) {
      this.paramsObj.pagesize = newSize
      this.getOrderList()
    },
    handleCurrentChange (newPage) {
      this.paramsObj.pagenum = newPage
      this.getOrderList()
    },
    delCategory () { },
    addCategory1 () { }
  },
  computed: {},
  watch: {},
  filters: {
    // 把毫秒时间戳转换为具体时间
    formatDate (val) {
      return dayjs.unix(val).format('YYYY-MM-DD')
    }
  },
  components: {}
}
</script>

<style scoped lang='less'>
.top {
  margin-bottom: 30px;
  height: 40px;
  display: flex;
  align-items: center;
  .el-input {
    width: 450px;
  }
}
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
