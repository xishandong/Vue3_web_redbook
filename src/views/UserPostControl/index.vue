<script setup>
import {computed, onMounted, ref} from 'vue'
import {queryUserPostControl, postDelete} from "@/apis/main";
import { ElMessage } from 'element-plus'

const search = ref('')
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.name.toLowerCase().includes(search.value.toLowerCase())
    )
)
const handleDelete = async (index, row) => {
  const id = row.id
  const res = await postDelete({id})
  tableData.value.splice(index, 1)
  ElMessage({type: 'success', message: res.success})
}

const tableData = ref([])
const getData = async () => {
  const res = await queryUserPostControl()
  tableData.value = res.info
}

onMounted(() => getData())
</script>

<template>
  <el-table :data="filterTableData" style="width: 100%" >
    <el-table-column label="日期" prop="date"/>
    <el-table-column label="标题" prop="title"/>
    <el-table-column label="内容" prop="content"/>
    <el-table-column label="评论量" prop="commentCount"/>
    <el-table-column label="点赞量" prop="likeCount"/>
    <el-table-column label="收藏量" prop="collectCount"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索帖子..."/>
      </template>
      <template #default="scope">
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<style scoped>

</style>