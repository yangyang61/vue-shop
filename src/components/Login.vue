<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <br />
      <!-- 登录表单 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="el-icon-user-solid"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 登录表单
      loginForm: {
        username: '',
        password: ''
      },
      // 登录表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 登录
    login() {
      this.$refs.loginFormRef.validate(valid => {
        if (!valid) return
        this.$http.post('login', { ...this.loginForm }).then(res => {
          if (res.data.meta.status !== 200)
            return this.$message.error('登录失败')
          this.$message.success('登录成功')
          // 登录成功之后的 token，保存到客户端的 sessionStorage 中
          window.sessionStorage.setItem('token', res.data.data.token)
          // 跳转到首页
          this.$router.push('/home')
        })
      })
    },
    // 重置登录表单
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 350px;
  background-color: #fff;

  .avatar_box {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    margin-top: -60px;
    padding: 10px;
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #eee;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.login_form {
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  padding: 20px;
  width: 100%;
}
</style>
