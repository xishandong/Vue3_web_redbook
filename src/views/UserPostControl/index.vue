<script setup>
import {computed, onMounted, ref} from 'vue'
import {queryUserPostControl, postDelete} from "@/apis/main";
import {ElMessage} from 'element-plus'

const search = ref('')
const filterTableData = computed(() =>
    tableData.value.filter(
        (data) =>
            !search.value ||
            data.title.toLowerCase().includes(search.value.toLowerCase())
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
  const offset = 0
  const res = await queryUserPostControl({offset})
  tableData.value = res.info
  total.value = res.total
}
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

onMounted(() => getData())

const tableRef = ref(null)
const pageSize = ref(10)
const currentPage = ref(1)
const total = ref(0)
const handleCurrentChange = async (val) => {
  const offset = (val - 1) * pageSize.value
  const res = await queryUserPostControl({offset})
  tableData.value = res.info
  total.value = res.total
}

</script>

<template>
  <div style="display:flex;align-items: center;flex-direction: column">
    <el-table
        :data="filterTableData"
        style="width: 100%"
        ref="tableRef"
        :default-sort="{ prop: 'date', order: 'descending' }"
        @selection-change="handleSelectionChange"
        border
        stripe
    >
      <el-table-column type="selection" width="55"/>
      <el-table-column label="日期" sortable prop="date"/>
      <el-table-column label="标题" prop="title"/>
      <el-table-column label="内容" prop="content" :show-overflow-tooltip='true'/>
      <el-table-column label="评论量" sortable prop="commentCount"/>
      <el-table-column label="点赞量" sortable prop="likeCount"/>
      <el-table-column label="收藏量" sortable prop="collectCount"/>
      <el-table-column align="center">
        <template #header>
          <el-input v-model="search" size="small" placeholder="搜索标题..."/>
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
    <div style="margin-top: 20px" v-show="multipleSelection.length !== 0">
      <el-button @click="toggleSelection()">选中删除</el-button>
      <el-button @click="tableRef.clearSelection()">清空全选</el-button>
    </div>
    <div class="pageArea">
      <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :background="true"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped>
.pageArea {
  margin-top: 20px;

}
</style>