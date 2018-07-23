<template>
  <div class="login-warp">
    <div class="title-text"><span><b>奈儿后台管理系统</b></span></div>
    <div class="login-auto">
      <el-input placeholder="请输入用户名" v-model="username">
        <template slot="prepend">用户</template>
      </el-input>
      <el-input style="margin-top: 10px" placeholder="请输入密码" type="password" v-model="password">
        <template slot="prepend">密码</template>
      </el-input>
      <div style="width: 100%;margin-top: 20px">
        <el-button style="float: right" type="primary" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>

</template>
<script>
  import axios from 'axios'

  export default{
    data(){
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async handleLogin() {
        if (this.username.length <= 0) {
          this.$message('用户名不能为空');
          return;
        }

        if (this.password.length <= 0) {
          this.$message('密码不能为空');
          return;
        }

        let params = {
          username: this.username,
          password: this.password
        };
        let result = await axios.post('/login', params)
        if (result.code == 0) {
          window.location.href = '#/'
        } else {
          this.$message.error('账号名或密码错误！');
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .login-warp {
    width: 100%;
    height: 20px;
    margin-top: 220px
  }

  .login-auto {
    padding: 20px;
    width: 300px;
    height: 140px;
    margin: 0 auto;
  }

  .title-text {
    width: 450px;
    margin: 0 auto;
    text-align: center;
    font-weight: 700;
    color: #444;
    font-size: 35px;
  }
</style>
