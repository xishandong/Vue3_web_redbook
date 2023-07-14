<script setup>

</script>

<template>
  <div class="not-found">
    <h1 style="color:red;">404 - 页面不存在</h1>
    <p>你输入了一个错误的网址哦.</p>
    <router-link to="/">返回主页</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 20px;
}
</style>