<script setup>
import {useRoute} from "vue-router";
import {onBeforeMount, onMounted, ref} from "vue";
import HomeCard from "@/components/homeCard.vue";
import CardDetail from "@/components/cardDetail.vue";
import {Back} from "@element-plus/icons-vue";

const route = useRoute()
const userInfo = ref({})
const radio = ref('帖子')
const getUserInfo = () => {
  console.log(route.params.id)
  userInfo.value = {
    user: {
      id: 1,
      username: '用户0',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      fans: 15,
      focusOn: 15
    },
    posts: []
  }
}

const Toggle = () => {
  console.log(radio.value)
}
const detail = ref({})
// 卡片详情
const show = ref(false)
const getDetails = () => {
  return {
    title: '这是标题',
    content: '这是内容',
    user: {
      id: 1,
      username: '用户0',
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    },
    imgs: [
      'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
      'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
      'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip'
    ],
    createTime: '2023-10-18',
    comment: [],
  }
}
const showMessage = async (id) => {
  window.history.pushState({}, '', `/explore/${id}`);
  detail.value = getDetails()
  show.value = true
}
const close = () => {
  window.history.pushState({}, '', `/`);
  show.value = false
}

onBeforeMount(() => getUserInfo())

</script>

<template>
  <div class="userInfo">
    <el-row :gutter="20">
      <el-col :span="10" style="width: 250px;">
        <el-avatar :size="150" :src="userInfo.user.avatar"></el-avatar>
      </el-col>
      <el-col :span="10" style="width: 250px;">
        <h2>{{ userInfo.user.username }}</h2>
        <p>个人标语</p>
        <div class="tagArea">
          <el-tag class="ml-2" type="success" round>{{ userInfo.user.focusOn }} 关注</el-tag>
          <el-tag class="ml-2" type="info" round>{{ userInfo.user.fans }} 粉丝</el-tag>
          <el-tag class="ml-2" type="warning" round>{{ userInfo.posts.length }} 笔记数</el-tag>
        </div>
      </el-col>
    </el-row>
  </div>
  <div class="checkBox" @change="Toggle">
    <el-radio-group v-model="radio" size="large">
      <el-radio-button class="radio" label="帖子" name="post"/>
      <el-radio-button class="radio" label="收藏" name="collect"/>
      <el-radio-button class="radio" label="点赞" name="like"/>
    </el-radio-group>
  </div>
  <div style="margin-top: 30px;">
    <div v-if="radio === '帖子'">
      <div v-if="userInfo.posts.length === 0">
        <el-empty description="现在还没有帖子..."/>
      </div>
      <div class="container" v-else>
        <home-card :cards="userInfo.posts" @show-detail="showMessage"></home-card>
      </div>
      <div class="overlay" v-if="show">
        <button class="backPage" @click="close">
          <el-icon>
            <Back/>
          </el-icon>
        </button>
        <card-detail :detail="detail"/>
      </div>
    </div>
    <div v-else-if="radio === '收藏'">
      <el-empty description="现在还没有收藏..."/>
    </div>
    <div v-else-if="radio === '点赞'">
      <el-empty description="现在还没有点赞..."/>
    </div>
  </div>
</template>

<style scoped>
.container {
  column-count: 5; /* 设置列数，可以根据需要调整列数 */
  column-gap: 20px; /* 设置列之间的间隔为20px */
}

.userInfo {
  position: relative;
  width: 500px;
  left: 30%;
}

.tagArea {
  width: 400px;
}

.tagArea .ml-2 {
  margin-right: 10px;
}

.checkBox {
  margin-top: 50px;
  position: relative;
  left: 40%;
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