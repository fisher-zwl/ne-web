<template>
  <div>
    <div>
      <el-menu
        router
        :default-active="activeRouter"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="/">订单中心</el-menu-item>
        <el-menu-item index="/cc">兑换码管理</el-menu-item>
        <el-menu-item index="/admin">用户管理</el-menu-item>
        <el-menu-item index="/product">奖品管理</el-menu-item>
        <el-button style="float: right;margin-top: 10px;margin-right: 40px" type="danger" @click="layout">退出登录</el-button>
      </el-menu>
      <div style="height: calc(100vh - 61px);overflow: scroll">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        activeRouter: '/',
        activeIndex2: '1'
      }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      async layout(){
        let r=await axios.get('/layout')
        if(r.code==0){
          window.location.href='#/login'
        }else {
          this.$message('退出失败');
        }
      }
    },
    async mounted() {
      this.activeRouter=this.$route.path
    }
  }
</script>

<style lang="less">
</style>
