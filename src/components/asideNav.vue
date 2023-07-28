<script setup>
import {ref} from "vue";
import {Promotion, Expand, Close, Tools, HelpFilled} from "@element-plus/icons-vue";
import {useUserStore} from "@/stores/user";
import Login from '@/views/Login/index.vue'
import {ElMessage} from "element-plus";
import {genFileId} from 'element-plus'
import {updateUserInfo} from "@/apis/main";
import router from "@/router";

const userStore = useUserStore()
// 控制菜单样式
const isMenuOpen = ref(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}
// 登出
const confirm = async () => {
  const res = await userStore.userLogout()
  ElMessage({type: 'success', message: res.info})
}
// 显示登录界面
const show = ref(false)
const changeShow = () => {
  show.value = !show.value;
}
// 用户信息更新栏
////////////////////////////////////////////////////////////////
// 控制文件表单
const dialogFormVisible = ref(false)
// 文件上传对象
const upload = ref(null)
// 上传头像成功后修改pinia数据
const avatar = ref('')
const fileList = ref([])
const handleExceed = (files) => {
  upload.value.clearFiles()
  const file = files[0]
  file.uid = genFileId()
  upload.value.handleStart(file)
}
const handleChange = (uploadFile, uploadFiles) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // 可接受的图片类型
  const maxSize = 2; // 最大文件大小，单位：MB

  if (!allowedTypes.includes(uploadFile.raw.type)) {
    ElMessage.error('请上传正确的图片文件!');
    upload.value.handleRemove(uploadFile);
    return false;
  } else if (uploadFile.raw.size / 1024 / 1024 > maxSize) {
    ElMessage.error(`文件大小最多${maxSize}MB!`);
    upload.value.handleRemove(uploadFile);
    return false;
  }
  return true;
};
const onSuccess = async (response) => {
  avatar.value = response.info.filepath
}
const onError = async (error) => {
  ElMessage({
    type: 'warning',
    message: '头像上传失败'
  })
  const userStore = useUserStore();
  await userStore.userLogout()
  await router.replace('/')
}
// 控制表单信息
const form = ref({
  username: '',
  signature: ''
})
const openDialog = () => {
  dialogFormVisible.value = true
  form.value.username = userStore.userInfo.username
  form.value.signature = userStore.userInfo.signature
}
// 表单验证规则
const rules = {
  username: [
    {required: true, message: '用户名不能为空！', trigger: 'blur'}
  ],
  signature: [
    {required: true, message: '个性签名不能为空!', trigger: 'blur'}
  ]
}
// 表单对象
const formRef = ref(null)
const doUpdate = async () => {
  const {username, signature} = form.value;
  const isModified = username !== userStore.userInfo.username || signature !== userStore.userInfo.signature;
  const isAvatarUploaded = fileList.value.length === 1;

  if (!isModified && !isAvatarUploaded) {
    ElMessage({type: 'warning', message: '未作任何修改！'});
    return;
  }

  if (isModified && !isAvatarUploaded) {
    await updateUserInfo({username, signature});
    avatar.value = userStore.userInfo.avatar;
    userStore.changeInfo({username, signature, avatar});
    ElMessage({type: 'success', message: '用户信息更新成功'});
    dialogFormVisible.value = false;
    return;
  }

  if (!isModified && isAvatarUploaded) {
    await upload.value.submit();
    userStore.changeInfo({username, signature, avatar});
    ElMessage({type: 'success', message: '头像上传成功'});
    dialogFormVisible.value = false;
    return;
  }

  if (isModified && isAvatarUploaded) {
    const res = await updateUserInfo({username, signature});
    await upload.value.submit();
    userStore.changeInfo({username, signature, avatar});
    ElMessage({type: 'success', message: res.info});
    dialogFormVisible.value = false;
  }
};
</script>

<template>
  <nav class="menu" :class="{ open: isMenuOpen }">
    <el-tooltip effect="dark" content="切换菜单样式" placement="right">
      <div class="actionsBar">
        <div>
          <button id="menuBtn" type="button" @click="toggleMenu"><i class="iconfont icon-hanbaocaidan"></i></button>
          <h3 class="menuText" :class="{ open2: isMenuOpen }">{{ userStore.userInfo.username }}</h3>
        </div>
      </div>
    </el-tooltip>
    <ul class="optionsBar">
      <li class="menuItem">
        <el-tooltip effect="dark" content="主页" placement="right">
          <RouterLink to="/" class="menuOption">
            <i class="iconfont icon-shouye"></i>
            <h5 class="menuText" :class="{ open2: isMenuOpen }">主页</h5>
          </RouterLink>
        </el-tooltip>
      </li>
      <li class="menuBreak">
        <hr>
      </li>
      <li class="menuItem">
        <el-tooltip effect="dark" content="发布" placement="right">
          <RouterLink to="/user/uploads" class="menuOption">
            <el-icon size="x-large">
              <Promotion/>
            </el-icon>
            <h5 class="menuText" :class="{ open2: isMenuOpen }">发布</h5>
          </RouterLink>
        </el-tooltip>
      </li>
      <li class="menuItem" v-if="userStore.userInfo.id">
        <el-tooltip effect="dark" content="更新个人信息" placement="right">
          <div class="menuOption" @click="openDialog">
            <el-icon size="x-large">
              <Tools/>
            </el-icon>
            <h5 class="menuText" :class="{ open2: isMenuOpen }">更新个人信息</h5>
          </div>
        </el-tooltip>
      </li>
      <li class="menuItem" v-if="userStore.userInfo.id">
        <el-tooltip effect="dark" content="个人帖子管理" placement="right">
          <RouterLink to="/user/control">
            <div class="menuOption">
              <el-icon size="x-large">
                <HelpFilled/>
              </el-icon>
              <h5 class="menuText" :class="{ open2: isMenuOpen }">个人帖子管理</h5>
            </div>
          </RouterLink>
        </el-tooltip>
      </li>
    </ul>
    <div class="about" id="about">
    </div>
    <div v-if="userStore.userInfo.id">
      <div class="menuUser">
        <RouterLink :to="`/user/index/${userStore.userInfo.id}`">
          <div>
            <img :src="userStore.userInfo.avatar" alt="">
          </div>
          <h5 class="Username menuText" :class="{ open2: isMenuOpen }" v-show="isMenuOpen">
            {{ userStore.userInfo.username }}</h5>
          <p class="menuText" :class="{ open2: isMenuOpen }"><i class="iconfont icon-youjiantou"></i></p>
        </RouterLink>
      </div>
      <div class="themeBar">
        <el-tooltip effect="dark" content="退出登录" placement="right">
          <div>
            <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认"
                           cancel-button-text="取消">
              <template #reference>
                <button type="button" @click=""><i class="iconfont icon-tuichu"></i></button>
              </template>
            </el-popconfirm>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div v-else>
      <el-tooltip effect="dark" content="登录" placement="right">
        <div class="themeBar">
          <div>
            <button title="登录" type="button" @click="changeShow">
              <el-icon size="x-large">
                <Expand/>
              </el-icon>
            </button>
          </div>
        </div>
      </el-tooltip>
    </div>
  </nav>
  <div class="overlay" v-if="show">
    <el-button class="close" @click="changeShow" plain round>
      <el-icon size="x-large">
        <Close/>
      </el-icon>
    </el-button>
    <login @changeShow="changeShow"/>
  </div>

  <el-dialog v-model="dialogFormVisible" title="更新个人信息" center draggable>
    <div class="fileUpload">
      <el-upload v-model:file-list="fileList"
                 ref="upload"
                 action="http://localhost:8000/user/avatar/"
                 :limit="1"
                 :on-exceed="handleExceed"
                 :auto-upload="false"
                 :on-change="handleChange"
                 :headers="userStore.headersObj"
                 :on-success="onSuccess"
                 :on-error="onError"
      >
        <template #trigger>
          <el-button class="btn" type="primary" round>选择一个文件</el-button>
        </template>
        <template #tip>
          <div class="el-upload__tip" style="color:red;text-align: left">
            仅限一个文件，新文件将会被覆盖
          </div>
        </template>
      </el-upload>

    </div>
    <div class="fileUpload">
      <el-form :model="form" ref="formRef" :rules="rules" label-position="top">
        <el-form-item prop="username" label="昵称" label-width="100px" style="margin: 30px;">
          <el-input v-model="form.username" maxlength="6"
                    show-word-limit class="my"/>
        </el-form-item>
        <el-form-item prop="signature" label="个性签名" label-width="100px" style="margin: 30px;">
          <el-input v-model="form.signature" class="my"/>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false" round>取消</el-button>
        <el-button type="primary" @click="doUpdate" round>
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.fileUpload {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.fileUpload button {
  margin-left: 20px;
  margin-bottom: 20px;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 设置透明度的背景色 */
  z-index: 9999; /* 设置一个较大的z-index值，确保图层位于其他内容之上 */
}

.close {
  border: 0;
  position: absolute;
  left: 70%;
  top: 18%;
  background-color: #fff;
  z-index: 1000; /* 设置一个较大的z-index值，确保图层位于其他内容之上 */
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.iconfont {
  font-size: 20px;
}

.menu {
  position: absolute;
  width: 60px;
  height: auto;
  background-color: #f6f3f3;
  z-index: 2;
  top: 65px;
  bottom: 0;
  left: 10px;
  margin: auto;
  border-radius: 0.8rem;
  transition: 0.3s ease 0.15s;
  font-family: sans-serif;
}

.menu a {
  text-decoration: none;
}

.menu .actionsBar {
  width: 100%;
  height: 10%;
  padding: 0.5rem;
  overflow: hidden;
}

.menu .actionsBar div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.menu .actionsBar div button {
  background-color: transparent;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  color: #000;
  width: 45px;
  height: 45px;
  transition: 0.3s ease;
  font-size: 1rem;
}

.menu .actionsBar div button:hover {
  background-color: #d5d0d0;
  color: #F19FA3;

}

.menu .actionsBar div h3 {
  width: calc(100% - 45px);
  text-align: center;
}

.menu .optionsBar {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 60%;
  padding: 0 0.5rem;
  align-items: center;
  flex-direction: column;
}

.menu .optionsBar .menuItem {
  width: 100%;
  height: 45px;
  margin: 0.3rem;
}

.menu .optionsBar .menuItem .menuOption {
  font-size: 1rem;
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.menu .optionsBar .menuItem .menuOption:hover {
  background-color: #d5d0d0;
  color: #f5131e;

}

.menu .optionsBar .menuItem .menuOption:hover i,
.menu .optionsBar .menuItem .menuOption:hover h5 {
  color: #f5131e;

}

.menu .optionsBar .menuItem .menuOption i {
  width: 45px;
  text-align: center;
  color: #000;
}

.menu .optionsBar .menuItem .menuOption h5 {
  width: calc(100% - 45px);
}

.menuText {
  color: #000;
  transform: translateX(-250px);
  opacity: 0;
  transition: transform 0.3s ease 0.1s;
}

.menu .about {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  flex-direction: column;
  font-family: sans-serif;
  opacity: 0;
  white-space: nowrap;
  transition: 0.3s ease 0.15s;
}

.menu.open {
  width: 240px;
  opacity: 0.9;
}

.menuText.open2 {
  opacity: 1;
  transform: translateX(0);
  text-align: center;
}

.menu .menuBreak {
  width: 100%;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu .menuBreak hr {
  width: 70%;
  height: 3px;
  background-color: #000;
  border: none;
  border-radius: 5px;
}

.menu .themeBar {
  overflow: hidden;
  width: 100%;
  height: 10%;
  padding: 0.5rem;
}

.menu .themeBar div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.menu .themeBar div button {
  background-color: transparent;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  color: #000;
  width: 100%;
  height: 45px;
  transition: 0.3s ease;
  font-size: 1rem;
}

.menu .themeBar div button:hover {
  background-color: #d5d0d0;
  color: #f5131e;

}

.menu .menuUser {
  width: 100%;
  height: 10%;
}

.menu .menuUser a {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 0.5rem;
  position: relative;
}

.menu .menuUser a div {
  width: 45px;
  height: 45px;
  position: relative;
  border-radius: 0.5rem;
}

.menu .menuUser a div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.menu .menuUser a .Username {
  width: calc(70% - 45px);
}

.menu .menuUser a p {
  width: calc(30% - 45px);
}

.menu .menuUser a:hover p {
  animation: animArrow 0.3s ease 2;
  color: #F19FA3;

}

@keyframes animArrow {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0);
  }
}

.menu .menuUser .userInfo {
  position: absolute;
  width: 20rem;
  height: 18rem;
  opacity: 0;
  pointer-events: none;
  top: 34%;
  left: 1.5rem;
  transition: 0.3s ease;
  transform: scale(0);
  transform-origin: bottom left;
}

.menu .menuUser:hover .userInfo {
  pointer-events: all;
  opacity: 1;
  transform: scale(1);
  color: #F19FA3;
}

.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>