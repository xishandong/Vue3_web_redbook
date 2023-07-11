<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import HomeCard from "@/components/homeCard.vue";
import CardDetail from "@/components/cardDetail.vue";
import {Back} from "@element-plus/icons-vue";
import {queryUserIndex, postDetail} from "@/apis/main";
import {getCurrentTime} from "@/utils/getTime";
import {useUserStore} from "@/stores/user";

const userStore = useUserStore()
const route = useRoute()
const userInfo = ref({})
const radio = ref('帖子')
const getUserInfo = async () => {
  const id = route.params.id
  const res = await queryUserIndex({id})
  userInfo.value = res.data
}

const Toggle = () => {
  console.log(radio.value)
}
const detail = ref({})
// 卡片详情
const show = ref(false)
const getDetails = async (id) => {
  const res = await postDetail({id})
  return res.info
}
const showMessage = async (id) => {
  window.history.pushState({}, '', `/explore/${id}`);
  detail.value = await getDetails(id)
  show.value = true
}
const close = () => {
  window.history.pushState({}, '', `/`);
  show.value = false
}

onMounted(async () => {
  await getUserInfo()
})
const afterDoComment = (comment) => {
  const info = [{
    user: userStore.userInfo,
    content: comment.content,
    createTime: getCurrentTime()
  }]
  detail.value.comment = [...detail.value.comment, ...info]
}
</script>

<template>
  <div class="userInfo" v-if="userInfo.user">
    <el-row :gutter="20">
      <el-col :span="10" style="width: 250px;">
        <el-avatar :size="150" :src="userInfo.user.avatar"></el-avatar>
      </el-col>
      <el-col :span="10" style="width: 250px;">
        <h2>{{ userInfo.user.username }}</h2>
        <p>{{ userInfo.user.signature }}</p>
        <div class="tagArea">
          <el-tag class="ml-2" type="success" round>{{ userInfo.user.focusOn }} 关注</el-tag>
          <el-tag class="ml-2" type="info" round>{{ userInfo.user.fans }} 粉丝</el-tag>
          <el-tag class="ml-2" type="warning" round>{{ userInfo.user.postsCount }} 笔记数</el-tag>
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
  <div style="margin-top: 30px;" v-if="userInfo.user">
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
        <card-detail :detail="detail" @afterDoComment="afterDoComment"/>
      </div>
    </div>
    <div v-else-if="radio === '收藏'">
      <div v-if="userInfo.collected.length === 0">
        <el-empty description="现在还没有收藏..."/>
      </div>
      <div class="container" v-else>
        <home-card :cards="userInfo.collected" @show-detail="showMessage"></home-card>
      </div>
      <div class="overlay" v-if="show">
        <button class="backPage" @click="close">
          <el-icon>
            <Back/>
          </el-icon>
        </button>
        <card-detail :detail="detail" @afterDoComment="afterDoComment"/>
      </div>
    </div>
    <div v-else-if="radio === '点赞'">
      <div v-if="userInfo.favorites.length === 0">
        <el-empty description="现在还没有点赞..."/>
      </div>
      <div class="container" v-else>
        <home-card :cards="userInfo.favorites" @show-detail="showMessage"></home-card>
      </div>
      <div class="overlay" v-if="show">
        <button class="backPage" @click="close">
          <el-icon>
            <Back/>
          </el-icon>
        </button>
        <card-detail :detail="detail" @afterDoComment="afterDoComment"/>
      </div>
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