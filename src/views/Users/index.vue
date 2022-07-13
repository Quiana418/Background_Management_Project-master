<template>
  <div class="users-container">
    <!-- 用户列表 -->
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 中间内容区域 -->
    <div class="inner">
      <!-- 顶部输入框和按钮 -->
      <div class="top">
        <!-- 输入框 -->
        <div style="margin-top: 15px">
          <el-input
            placeholder="请输入内容"
            v-model="input3"
            class="input-with-select"
          >
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
        <el-button type="primary" class="addUser">添加用户</el-button>
      </div>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="userList"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column prop="id" label="#" width="60"> </el-table-column>
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#00d2d3"
                inactive-color="#dfe6e9"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="operation" label="操作">
            <el-row>
              <el-button
                type="primary"
                icon="el-icon-edit"
                class="edit"
              ></el-button>
              <el-button type="danger" icon="el-icon-delete"></el-button>
              <el-button type="info" icon="el-icon-message"></el-button>
            </el-row>
          </el-table-column>
        </el-table>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Users',
  created () {
    // this.$store.dispatch('user/getUserList', this.user)
    // 获取用户数据列表
    this.getUserList()
  },
  data () {
    return {
      // 获取用户数据列表的参数
      user: {
        query: null,
        pagenum: 1,
        pagesize: 5
      },
      input3: '',
      tableRowClassName: ''
    }
  },
  methods: {
    // 获取用户数据列表
    getUserList () {
      this.$store.dispatch('user/getUserList', this.user)
    }
  },
  computed: {
    ...mapGetters(['userList'])
  },
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.users-container {
  width: 100%;
}
.addUser {
  margin-left: 20px;
  margin-top: 14px;
}
.inner {
  border-radius: 3px;
  padding: 20px;
  margin: 20px;
  width: 100%;
  height: 424px;
  background-color: #fff;
}
:deep(.data-v-acfe1f7e) {
  width: 418px;
}
.top {
  margin-bottom: 30px;
  height: 40px;
  display: flex;
  align-items: center;
}
.el-input {
  width: 418px;
  height: 40px;
}
.el-button {
  height: 40px;
}
.el-button--primary {
  border: none;
  background-color: rgb(36, 174, 174);
}
.el-table {
  font-size: 12px;
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
  /deep/ .el-row {
    display: flex;
    .el-button {
      padding: 0;
      width: 44px;
      height: 28px;
      i {
        font-size: 12px;
      }
    }
  }
}
</style>
