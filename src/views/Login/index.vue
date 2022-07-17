<template>
  <div class="login-container">
    <div class="login-box">
      <div class="title">绍兴华彧后台管理系统</div>
      <div class="form-box">
        <el-form :rules="rules" :model="loginForm" ref="loginFormRef">
          <el-form-item prop="username" prefix-icon="el-icon-minus">
            <el-input
              v-model="loginForm.username"
              prefix-icon="el-icon-user-solid"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              prefix-icon="el-icon-lock"
            ></el-input>
          </el-form-item>
          <el-form-item class="btn-item">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      // 表单验证
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度为3-8之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 3, max: 8, message: '长度为3-8之间', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 实现点击重置
    reset () {
      this.$refs.loginFormRef.resetFields()
    },
    // 点击登录 二次校验 validate返回promise
    async login () {
      try {
        await this.$refs.loginFormRef.validate()
        console.log('校验成功')
        // 校验成功之后 请求登录
        try {
          const res = await login(this.loginForm)
          console.log(res)
          // vuex存token 持久化
          this.$store.commit('setUser', res.data.data.token)
          this.$router.push('/home')
        } catch (err) {
          console.log(err)
        }
      } catch (err) {
        this.$message.error('登陆表单校验失败')
      };
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
// 最外层大盒子
.login-container {
  position: relative;
  height: 100vh;
  background: url("@/assets/images/bg15.jpg") no-repeat;
  background-size: cover;
  background-position: 0 -70px;
  /deep/.title {
    /*  position: absolute;
    top: 110px;
    right: 273px; */
    width: 500px;
    font-weight: 800;
    color: #a5fecb;
    font-size: 25px;
  }
  .form-box {
    display: flex;
    // position: absolute;
    // top: 40%;
    // left: 75%;
    // transform: translate(-50%, -50%);
    width: 400px;
    height: 300px;
    padding: 30px 15px;
    box-sizing: border-box;
    /deep/.el-input__inner {
      width: 500px;
      background-color: transparent;
      border: 1px solid #ddd;
      color: rgb(236, 232, 232);
    }
    .el-button {
      margin-top: 0px;
      margin-bottom: 30px;
      width: 500px;
      height: 40px;
      background: linear-gradient(135deg, #1fa2ff, #12d8fa, #a6ffcb);
    }
  }
  .btn-item {
    text-align: right;
  }

  .el-form-item__content {
    line-height: 30px;
  }
  .el-button--info {
    margin: 0px;
  }

  .el-input--prefix {
    margin-bottom: 15px;
  }
  /deep/.el-form-item__error {
    color: #fff;
  }
  .login-box {
    position: absolute;
    right: 130px;
    bottom: 250px;
    text-align: center;
  }
}
</style>
