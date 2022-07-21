<template>
  <div class="roles-container">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 中间内容区域 -->
    <div class="inner">
      <el-button type="primary" class="addRoleBtn" @click="dialogVisible = true"
        >添加角色</el-button
      >
      <!-- 表格 -->
      <template>
        <el-table
          stripe
          border
          :data="rolesList"
          style="width: 100%"
          type="expand"
        >
          <!-- 折叠展示内容区域 展开列-->
          <el-table-column type="expand">
            <template slot-scope="scope">
              <!-- {{ scope.row }} 所有权限和角色数据-->
              <!-- {{ scope.row.id }} 当前角色id -->
              <el-row
                class="bdBottom vCenter bdTop"
                v-for="item in scope.row.children"
                :key="item.id"
              >
                <!-- 一级权限 -->
                <el-col :span="5">
                  <el-tag>
                    {{ item.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <!-- 二级三级权限 里面继续嵌套-->
                <el-col :span="19">
                  <el-row
                    v-for="item1 in item.children"
                    :key="item1.id"
                    class="vCenter bdTop"
                  >
                    <!-- 二级 -->
                    <el-col :span="6">
                      <el-tag type="success">
                        {{ item1.authName }}
                      </el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>

                    <!-- 三级 -->
                    <!-- closable关闭小图标 -->
                    <el-col :span="18">
                      <el-tag
                        v-for="item2 in item1.children"
                        :key="item2.id"
                        closable
                        type="warning"
                        @close="open(scope.row, item2.id)"
                      >
                        <!-- 当前权限id==item2.id, 角色id==scope.row.id -->
                        {{ item2.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </template>
          </el-table-column>

          <!-- 上面标题部分 -->
          <el-table-column prop="id" label="#" width="60"> </el-table-column>
          <el-table-column prop="roleName" label="角色名称"> </el-table-column>
          <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>

          <!-- 编辑用户信息的按钮 -->
          <el-table-column prop="operation" label="操作">
            <!-- 编辑按钮 -->
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                class="edit"
                @click="OnclickEdit(scope.row.id)"
              >
                编辑
              </el-button>

              <!-- 删除按钮 -->
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="delRole(scope.row)"
              >
                删除
              </el-button>

              <!-- 分配权限按钮 -->
              <el-tooltip
                effect="dark"
                content="分配权限"
                placement="top"
                :enterable="false"
              >
                <el-button
                  size="mini"
                  type="info"
                  icon="el-icon-setting"
                  @click="getRolesTree(scope.row)"
                >
                  分配权限
                </el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 点击编辑按钮 弹出弹窗 -->
    <el-dialog
      title="编辑角色对话框"
      :visible.sync="dialogFormVisible"
      @close="editDialogClose"
    >
      <el-form :model="form" :rules="rules" ref="editFormRef">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="roleName"
        >
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          :label-width="formLabelWidth"
          prop="roleDesc"
        >
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogClose">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 点击编辑按钮 弹出弹窗 -->

    <!-- 点击添加角色 弹出弹窗 -->
    <el-dialog
      title="添加角色对话框"
      :visible.sync="dialogVisible"
      width="50%"
      @close="handleClose"
    >
      <el-form :model="form" :rules="rules" ref="addRoleFormRef">
        <el-form-item
          label="角色名称"
          :label-width="formLabelWidth"
          prop="roleName"
        >
          <el-input v-model="form.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="角色描述"
          :label-width="formLabelWidth"
          prop="roleDesc"
        >
          <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAddRole">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击添加角色 弹出弹窗 -->

    <!-- 点击分配权限 弹出弹窗 -->
    <el-dialog
      title="分配权限"
      :visible.sync="dialogVisible1"
      width="30%"
      @close="rightsDialogClose"
    >
      <!-- 内容区域 -->
      <el-tree
        :data="rolesTree"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="myTree"
        highlight-current
        :props="defaultProps"
        :default-checked-keys="selectedPerm"
      >
      </el-tree>
      <!-- 底部确认 取消 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="confirmGiveRights">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 点击分配权限 弹出弹窗 -->
  </div>
</template>

<script>
import { getRightsList } from '@/api/rights'
import { getRolesList, addRole, delRoleRights, delRole, getRoleInfo, confirmEditRole, giveRightsToRole } from '@/api/roles'
export default {
  name: 'Roles',
  created () {
    // 获取角色列表---list
    this.getRolesList()
  },
  data () {
    return {
      // 编辑对话框 表单校验
      form: {
        roleName: '',
        roleDesc: ''
      },
      // 所有角色权限列表 渲染表单的表单数据 以list形式的数据
      rolesList: [],
      // 所有角色权限列表 渲染表单的表单数据 一tree形式的数据
      rolesTree: [],
      // 控制添加角色 弹窗
      dialogVisible: false,
      // 控制编辑角色 弹窗
      dialogFormVisible: false,
      rules: {
        roleName: [
          { required: true, message: '角色名不能为空', trigger: 'blur' },
          { min: 2, max: 7, message: '角色名长度在2-7个字符', trigger: 'blur' }
        ]
      },
      formLabelWidth: '160px',
      // 获取角色列表--tree的参数
      tree: 'tree',
      // 控制分配权限的弹窗
      dialogVisible1: false,
      // 控制分配权限弹出框 内容的显示
      defaultProps: {
        label: 'authName'
      },
      roleId: '',
      // 默认选中的权限
      selectedPerm: []
    }
  },
  methods: {
    // 获取角色列表--list
    async getRolesList () {
      try {
        const res = await getRolesList()
        this.rolesList = res.data.data
      } catch (err) {
        console.log(err)
      }
    },

    // 获取角色列表--tree
    async getRolesTree (row) {
      this.roleId = row.id
      // 弹窗弹起
      this.dialogVisible1 = true
      try {
        const res = await getRightsList(this.tree)
        this.rolesTree = res.data.data
        // foreach遍历 查找三级节点id
        // 递归查找三级节点id
        this.getCheckedKeys(row, this.selectedPerm)
      } catch (err) {
        console.log(err)
      }
    },

    // 定义递归函数 取三级节点的id 用于显示默认选中的节点
    // node是当前要操作的数组  arr是递归处理后返回的存放三级节点id的数组
    getCheckedKeys (node, arr) {
      // 如果是三级节点 直接追加进数组
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach(item => {
        this.getCheckedKeys(item, arr)
      })
    },

    // 点击分配权限对话框里的确定 请求提交 角色授权
    async confirmGiveRights () {
      const rids1 = this.$refs.myTree.getCheckedKeys()
      const rids2 = this.$refs.myTree.getHalfCheckedKeys()
      const rids = [...rids1, ...rids2].join(',')
      try {
        await giveRightsToRole({
          roleId: this.roleId,
          rids: rids
        })
        this.getRolesList()
        this.dialogVisible1 = false
      } catch (err) {
        console.log(err)
      }
    },

    // 关闭权限对话框时 将默认选中的权限数组置空 防止不同角色设置权限会互相影响
    rightsDialogClose () {
      this.selectedPerm = []
    },

    // 点击编辑角色按钮 根据id获取角色信息
    async OnclickEdit (id) {
      this.dialogFormVisible = true
      // console.log(data)
      // 发起请求 数据回写到表单
      try {
        const res = await getRoleInfo(id)
        // console.log(res)
        this.form = res.data.data
      } catch (err) {
        console.log(err)
      }
    },

    // 编辑角色对话框 关闭时触发 重置表单
    editDialogClose () {
      // 重置表单
      this.$refs.editFormRef.resetFields()
      // 关闭弹窗
      this.dialogFormVisible = false
    },

    // 2. 点击编辑表单内的确定 发起请求 修改用户信息
    async onConfirm () {
      try {
        await confirmEditRole({ id: this.form.roleId, ...this.form })
        console.log(this.form.roleId)
      } catch (err) {
        console.log(err)
      }
      this.dialogFormVisible = false
      this.getRolesList()
    },

    // 点击 添加用户弹窗 确认/关闭
    handleClose () {
      // 点击关闭 重置表单
      this.$refs.addRoleFormRef.resetFields()
    },

    // 添加角色功能---点击确定 退出弹窗 进行二次校验 校验通过 发起请求
    confirmAddRole () {
      this.dialogVisible = false
      this.$refs.addRoleFormRef.validate(async (valid) => {
        // console.log(valid)
        if (!valid) return {}
        // 二次校验成功之后发起请求
        try {
          const res = await addRole(this.form)
          if (res.data.meta.status !== 201) {
            return this.$message.error('添加角色失败')
          } else {
            // 添加角色成功
            this.$message.success('添加角色成功')
            this.dialogVisible = false
            this.getRolesList()
          }
        } catch (err) {
          console.log(err)
        }
      })
    },

    // 点击删除权限下的删除按钮 发起请求 删除角色指定权限
    async open (role, rightId) {
      try {
        await this.$confirm('此操作将永久删除该角色的权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await delRoleRights(
          {
            roleId: role.id,
            rightId
          }
        )
        // 删除之后重新渲染数据 但是不用重新发请求 只需要把当前角色的数据更新即可
        // this.getRolesList()
        role.children = res.data.data
      } catch (err) {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }
    },
    // 根据角色id删除角色
    async delRole (role) {
      try {
        await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        await delRole(role.id)
        // 删除之后重新渲染数据
        this.getRolesList()
      } catch (err) {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
.roles-container {
  width: 100%;
  /deep/.inner {
    border-radius: 3px;
    padding: 30px !important;
    margin: 20px !important;
    width: 100%;
    // height: 450px;
    background-color: #fff;
    .addRoleBtn {
      margin-bottom: 15px;
      background-color: #24aeae;
      border: none;
    }
    .el-button--primary {
      border: none;
      background-color: #24aeae !important;
    }
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .el-row {
    // padding: 20px;
    .el-tag {
      margin: 7px;
    }
  }
  .bdBottom {
    border-bottom: 1px solid #eee;
  }
  .bdTop {
    border-top: 1px solid #eee;
  }
  .vCenter {
    display: flex;
    align-items: center;
  }
}
</style>
