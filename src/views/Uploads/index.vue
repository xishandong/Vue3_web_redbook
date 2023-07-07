<script setup>
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import {computed, onBeforeMount, ref} from "vue";
import {Back, Plus} from '@element-plus/icons-vue'
import {ElMessage} from "element-plus";
import CardDetail from "@/components/cardDetail.vue";

const router = useRouter()
const userStore = useUserStore()
const checkLogin = () => {
  if (!userStore.userInfo.id) {
    router.replace('/login')
  }
}

onBeforeMount(() => checkLogin())

const fileList = ref([])
const fileListUrl = computed(() => fileList.value.map(item => item.url))
const title = ref('')
const content = ref('')
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url
  dialogVisible.value = true
}
const handleRemove = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}
const upload = ref(null)
const doUploads = () => {
  upload.value.submit()
}
const handleExceed = () => {
  ElMessage.warning(
      '最多可以添加9张图片哦!'
  )
}

const show = ref(false)
const detail = ref({})
const close = () => {
  show.value = false
}

const MakePrev = () => {
  if (fileListUrl.value.length === 0) {
    ElMessage.warning(
        '请至少上传一张图片!'
    )
    return
  }
  if (title.value === '') {
    ElMessage.warning(
        '请输入标题'
    )
    return
  }
  detail.value = {
    title: title.value,
    content: content.value,
    user: userStore.userInfo,
    comment: [],
    imgs: fileListUrl.value,
    createdTime: '2023-07-07'
  }
  show.value = true
}
</script>

<template>
  <el-row :gutter="50">
    <el-col :span="500">
      <div class="leftArea">
        <h1 style="text-align: center">上传图片</h1>
        <div class="img-container">
          <el-upload
              v-model:file-list="fileList"
              class="preview"
              ref="upload"
              action="http://127.0.0.1:8000/upload/"
              list-type="picture-card"
              :limit="9"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :auto-upload="false"
              :on-exceed="handleExceed"
          >
            <el-icon>
              <Plus/>
            </el-icon>
          </el-upload>
        </div>
      </div>
    </el-col>
    <el-col :span="500">
      <div class="rightArea">
        <h1 style="text-align: center">内容区</h1>
        <div class="content-container">
          <el-input
              v-model="title"
              maxlength="20"
              placeholder="请输入标题"
              show-word-limit
              type="text"
              style="margin-top: 20px;width: 80%;margin-left: 50px;"
          />
          <div style="margin: 50px 0"/>
          <el-input
              v-model="content"
              maxlength="3000"
              placeholder="请输入内容"
              show-word-limit
              type="textarea"
              style="width: 80%;margin-left: 50px;"
              autosize
          />
        </div>
      </div>
    </el-col>
    <el-col :span="50">
      <el-button style="margin-top: 150px;color:white;" round color="#fd5656" size="large">发布推文</el-button>
      <br>
      <el-button style="margin-top: 200px;" round type="primary" size="large" @click="MakePrev">生成预览</el-button>
    </el-col>
  </el-row>


  <el-dialog v-model="dialogVisible">
    <img :src="dialogImageUrl" alt="Preview Image"/>
  </el-dialog>

  <div class="overlay" v-if="show">
    <button class="backPage" @click="close">
      <el-icon>
        <Back/>
      </el-icon>
    </button>
    <card-detail :detail="detail"/>
  </div>
</template>

<style scoped>
.leftArea {
  margin-left: 50px;
  width: 515px;
}

.rightArea {
  margin-left: 50px;
  width: 515px;
}

.img-container {
  border-radius: 20px;
  border: #2c3e50 1px solid;
  width: 515px;
  height: 500px;
  overflow: scroll;
}

.content-container {
  border-radius: 20px;
  border: #2c3e50 1px solid;
  width: 515px;
  height: 500px;
  overflow: scroll;
}

.preview {
  margin: 22px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white; /* 设置透明度的背景色 */
  z-index: 9999; /* 设置一个较大的z-index值，确保图层位于其他内容之上 */
}

.backPage {
  position: fixed;
  top: 5%;
  left: 3%;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 40px;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all .3s;
}
</style>