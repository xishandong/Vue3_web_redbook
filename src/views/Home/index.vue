<script setup>

</script>

<template>
  <el-container>
    <el-header>
      <head-nav/>
    </el-header>
    <el-container>
      <el-aside width="80px">
        <aside-nav/>
      </el-aside>
      <el-main class="maxSize">
        <RouterView :key="$route.fullPath"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
.maxSize {
  height: 650px;
  overflow-y: scroll;
}
</style>