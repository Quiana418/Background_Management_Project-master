<template>
  <div class="users-container">
    <!-- 用户列表 -->
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 中间内容区域 -->
    <div class="inner">
      <!-- 顶部输入框和按钮 -->
      <div class="top">
        <!-- 输入框 -->
        <!-- clearable 可清空操作 带有事件：clear -->
        <!-- @clear="getUserList" 点击清空 显示全部数据 -->
        <div style="margin-top: 15px">
          <el-input
            clearable
            @clear="getUserList"
            placeholder="请输入内容"
            v-model="user.query"
            class="input-with-select"
          >
            <!-- 点击搜索按钮 获取用户数据列表 重新渲染数据到页面 -->
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </div>
        <el-button type="primary" class="addUser" @click="dialogVisible = true"
          >添加用户</el-button
        >
      </div>
      <!-- 表格 -->
      <template>
        <el-table
          border
          :data="userList.users"
          style="width: 100%"
          :row-class-name="tableRowClassName"
        >
          <el-table-column type="index" label="#" width="60"> </el-table-column>
          <el-table-column prop="username" label="姓名"> </el-table-column>
          <el-table-column prop="mobile" label="电话"> </el-table-column>
          <el-table-column prop="role_name" label="角色"> </el-table-column>
          <el-table-column prop="mg_state" label="状态">
            <!-- Switch开关 -->
            <template v-slot="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#00d2d3"
                inactive-color="#dfe6e9"
                @change="onChangeState(scope.row)"
              >
              </el-switch>
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

              <!-- 分配角色按钮 -->
              <el-tooltip
                effect="dark"
                content="分配角色"
                placement="top"
                :enterable="false"
              >
                <el-button
                  type="info"
                  icon="el-icon-setting"
                  @click="distributeRole(scope.row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="user.pagenum"
        :page-sizes="[1, 3, 5, 10]"
        :page-size="user.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="userList.total"
      >
      </el-pagination>
    </div>
    <!-- 点击编辑按钮 弹出弹窗 -->
    <el-dialog
      title="编辑用户"
      :visible.sync="dialogFormVisible"
      @close="editDialogClose"
    >
      <el-form :model="userInfos" :rules="editFormRules" ref="editFormRef">
        <el-form-item label="用户名称" :label-width="formLabelWidth">
          <el-input
            v-model="userInfos.username"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="userInfos.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="userInfos.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击编辑按钮 弹出弹窗 -->

    <!-- 点击分配角色按钮 弹窗 -->
    <el-dialog
      title="分配角色"
      :visible.sync="dialogFormVisible1"
      class="messageDialog"
    >
      <div class="user">
        当前的用户 <span>{{ userInfo.username }}</span>
      </div>
      <div class="roles">
        当前的角色 <span>{{ userInfo.role_name }}</span>
      </div>
      <el-form>
        <el-form-item label="分配新角色" :label-width="formLabelWidth">
          <el-select v-model="selectedRole" placeholder="请选择">
            <el-option
              :label="item.role_name"
              :value="item.id"
              v-for="item in rolesList"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="distributeUserRole">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击分配角色按钮 弹窗 -->

    <!-- 点击添加用户 弹出弹窗 -->
    <el-dialog
      title="添加用户对话框"
      :visible.sync="dialogVisible"
      width="50%"
      @close="handleClose"
    >
      <el-form
        :model="form"
        :rules="rules"
        class="addUser"
        ref="addUserFormRef"
      >
        <el-form-item
          label="用户名"
          :label-width="formLabelWidth"
          prop="username1"
        >
          <el-input v-model="form.username1" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth"
          prop="mobile"
        >
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击添加用户 弹出弹窗 -->
  </div>
</template>

<script>
// distributeUserRole
import { getRolesList } from '@/api/roles'
import { editUserState, addUser, delUser, distributeUserRole } from '@/api/user'
import { validMobile, validEmail } from '@/utils/validate'
import { mapGetters } from 'vuex'
export default {
  name: 'Users',
  created () {
    // 获取用户数据列表
    this.getUserList()
  },
  data () {
    // 手机号验证
    const validateMobile = (rule, value, callback) => {
      validMobile(value) ? callback() : callback(new Error('手机号格式不正确'))
    }
    // 邮箱验证
    const validateEmail = (rule, value, callback) => {
      validEmail(value) ? callback() : callback(new Error('邮箱格式不正确'))
    }
    return {
      // 获取用户数据列表的参数
      user: {
        // 输入框的搜索关键字
        query: '',
        // 当前页数
        pagenum: 1,
        // 每页显示的条数
        pagesize: 5
      },
      tableRowClassName: '',
      // 控制编辑 弹窗
      dialogFormVisible: false,
      // 控制分配角色 弹窗
      dialogFormVisible1: false,
      // 控制添加用户 弹窗
      dialogVisible: false,
      // 编辑按钮弹窗 添加用户弹窗里 的表单数据
      form: {
        // 添加用户里的表单验证
        username1: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 分配角色 回写的数据
      userInfo: {},
      // 分配角色按钮中 选中的角色
      selectedRole: '',
      formLabelWidth: '160px',
      // 角色列表
      rolesList: [],
      // 添加用户弹窗的表单验证
      rules: {
        username1: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '用户名长度在2-7个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '密码长度在2-7个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }]
      },
      // 编辑用户弹窗的校验规则
      editFormRules: {
        email: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '手机号不能为空', trigger: 'blur' },
          { validator: validateMobile, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 获取用户数据列表
    getUserList () {
      this.$store.dispatch('user/getUserList', this.user)
    },
    // 点击Switch切换时 提示消息  发起请求 改变用户状态
    async onChangeState (userInfo) {
      // console.log(userInfo)
      try {
        const res = await editUserState({ uId: userInfo.id, type: userInfo.mg_state })
        // console.log(res)
        if (res.data.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state
          return this.$message.error('更新用户状态失败')
        } else {
          this.$message.success('更新用户状态成功')
        }
      } catch (err) {
        console.log(err)
      }
    },

    // 分页效果
    // 用户切换每条条数 数据改变时触发
    handleSizeChange (newSize) {
      // 将用户切换的每条条数 赋值给每条需要显示的数据
      this.user.pagesize = newSize
      // 切换之后 重新获取数据列表渲染页面
      this.getUserList()
    },

    // 页码值改变时触发
    handleCurrentChange (newPage) {
      this.user.pagenum = newPage
      this.getUserList()
    },

    // 点击实现 弹出删除弹窗 删除用户
    async open (id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示',
          {
            confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
          })
        await delUser(id)
        this.getUserList()
      } catch (err) {
        console.log(err)
        this.$message({
          type: 'info', message: '已取消删除'
        }
        )
      }
    },

    // 编辑用户对话框 关闭时触发 重置表单
    editDialogClose () {
      // 重置表单
      this.$refs.editFormRef.resetFields()
      // 关闭弹窗
      this.dialogFormVisible = false
    },

    // 点击编辑按钮 1.二次校验  2.触发请求--（1）根据id获取用户数据--（2）修改用户信息
    OnclickEdit (id) {
      // 弹出弹窗
      this.dialogFormVisible = true
      // 1. 触发 根据id获取用户数据的请求
      this.$store.dispatch('user/getUserInfoById', id)
    },

    // 2. 触发 修改用户信息的请求
    onConfirm () {
      this.$store.dispatch('user/editUserInfo', this.userInfos)
      this.dialogFormVisible = false
      this.getUserList()
    },

    // 点击 添加用户弹窗 确认/关闭
    handleClose () {
      // 点击关闭 重置表单
      this.$refs.addUserFormRef.resetFields()
    },

    // 添加用户功能---点击确定 退出弹窗 进行二次校验 校验通过 发起请求
    confirmAddUser () {
      this.dialogVisible = false
      this.$refs.addUserFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return {}
        // 二次校验成功之后发起请求
        try {
          const res = await addUser(
            {
              username: this.form.username1,
              password: this.form.password,
              email: this.form.email,
              mobile: this.form.mobile
            })
          // console.log(res)
          if (res.data.meta.status !== 201) {
            return this.$message.error('添加用户失败')
          } else {
            // 添加用户成功
            this.$message.success('添加用户成功')
            this.dialogVisible = false
            this.getUserList()
          }
        } catch (err) {
          console.log(err)
        }
      })
    },

    // 点击分配角色按钮 发起请求 回写数据
    async distributeRole (userInfo) {
      this.userInfo = userInfo
      this.dialogFormVisible1 = true

      // 获取角色列表
      const res = await getRolesList()
      // console.log(res)
      this.rolesList = res.data.data
    },

    // 点击分配角色弹出框里的确认按钮 发起请求 分配角色
    async distributeUserRole () {
      try {
        if (!this.selectedRole) {
          return this.$message.error('请选择要分配的角色')
        }
        const res = await distributeUserRole({ id: this.userInfos.id, rid: this.selectedRole })
        console.log(res)
        this.dialogFormVisible1 = false
      } catch (err) {
        console.log(err)
      }
    }
  },

  computed: {
    //  获取到的数据---用户数据列表
    ...mapGetters(['userList']),
    // 点击编辑按钮 获取到的用户邮箱 电话 渲染到表单中
    ...mapGetters(['editForm']),
    ...mapGetters(['userInfos'])
  },
  watch: {},
  filters: {},
  components: {}

}

</script>

<style scoped lang='less'>
.messageDialog {
  /deep/.el-input__inner {
    margin-left: -81px;
  }
  /deep/.el-icon-arrow-up {
    margin-left: -100px;
  }
}
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
  // height: 450px;
  background-color: #fff;
}
/deep/.data-v-acfe1f7e {
  width: 418px;
}
.top {
  margin-bottom: 30px;
  height: 40px;
  display: flex;
  align-items: center;
}
.el-input {
  // width: 450px;
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
.el-pagination {
  margin-top: 8px;
}
/deep/ .el-dialog {
  .el-dialog__title {
    font-size: 18px;
    line-height: 24px;
  }
  .el-form-item__label {
    margin-right: 75px;
    font-size: 13px;
    width: 80px !important;
    text-align: left;
  }
  .el-form-item__content {
    margin: 0 !important;
  }
  .el-input__inner {
    width: 100%;
  }
}
/deep/.addUser {
  .el-input__inner {
    margin-left: -12px;
  }
}
.input-with-select {
  width: 500px;
}
</style>
