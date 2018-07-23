<template>
  <div id="app">
      <router-view/>
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      }
    },
    methods:{
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    async mounted() {
    }
  }
</script>

<style lang="less">
  @import 'assets/common.less';

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
