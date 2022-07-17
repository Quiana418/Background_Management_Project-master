<template>
  <div>
    <!-- 表格 -->
    <template>
      <el-table
        border
        :data="data"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        type="expand"
      >
        <el-table-column type="index" label="#" width="60"> </el-table-column>
        <el-table-column prop="role_name" label="角色名称"> </el-table-column>
        <el-table-column prop="role_describe" label="角色描述">
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
  </div>
</template>

<script>
export default {
  name: 'Roles',
  created () { },
  data () {
    return {
      data: []
    }
  },
  methods: {},
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
</style>
