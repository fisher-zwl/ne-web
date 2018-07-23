<template>
  <div class="loading-parent">
    <div class="loading-icon" v-if="loading==true">
      <i class="el-icon-loading" style="color: #20a0ff;font-size: 30px"></i>
    </div>
    <div  v-if="loading==true" class="loading-over"></div>
    <slot>
    </slot>
  </div>

</template>
</div>
</template>
<script>
  export default{
    props:['loading']
  }
</script>
<style lang="less" scoped>
  .loading-parent {
    z-index: 9999;
    width: 100%;
    position: relative;
  }

  .loading-icon {
    z-index: 999999;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .loading-over {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    background: rgba(255, 255, 255, 0.7);
    z-index: 99999
  }
</style>
