<script setup>
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import HomeCard from "@/components/homeCard.vue";
import CardDetail from "@/components/cardDetail.vue";
import {Back} from "@element-plus/icons-vue";
import {queryUserIndex, queryUserPost} from "@/apis/main";
import {controlDetail} from "@/utils/controlDetail";

const route = useRoute()
const Details = controlDetail()

// 加载用户信息 //////////////////////////////////////////////////////////////
const userInfo = ref({})
const getUserInfo = async () => {
  const id = route.params.id
  const res = await queryUserIndex({id})
  userInfo.value = res.data
}
// 加载用户信息结束 ////////////////////////////////////////////////////////////

// 主页切换标签 //////////////////////////////////////////////////////////////
const radio = ref('帖子')
const userPost = ref([])
const userCollect = ref([])
const userFavorite = ref([])
const disabled = ref(true); // 初始禁用滚动加载
const Toggle = async () => {
  const user_id = route.params.id
  const offset = 0
  const types = radio.value
  if (radio.value === '帖子' && userPost.value.length === 0) {
    const post = await queryUserPost({user_id, types, offset})
    userPost.value = post.info
  } else if (radio.value === '收藏' && userCollect.value.length === 0) {
    const post = await queryUserPost({user_id, types, offset})
    userCollect.value = post.info
  } else if (radio.value === '点赞' && userFavorite.value.length === 0) {
    const post = await queryUserPost({user_id, types, offset})
    userFavorite.value = post.info
  }
  disabled.value = false;
}
const load = async () => {
  disabled.value = true;
  const user_id = userInfo.value.user.id;
  const types = radio.value;
  if (types === '帖子') {
    const offset = userPost.value.length;
    const post = await queryUserPost({user_id, types, offset});
    if (post.length === 0) {
      disabled.value = true;
    } else {
      userPost.value = [...userPost.value, ...post.info];
      disabled.value = false;
    }
  } else if (types === '点赞') {
    const offset = userFavorite.value.length;
    const like = await queryUserPost({user_id, types, offset});
    if (like.length === 0) {
      disabled.value = true;
    } else {
      userFavorite.value = [...userFavorite.value, ...like.info];
      disabled.value = false;
    }
  } else if (types === '收藏') {
    const offset = userCollect.value.length;
    const collect = await queryUserPost({user_id, types, offset});
    if (collect.length === 0) {
      disabled.value = true;
    } else {
      userCollect.value = [...userCollect.value, ...collect.info];
      disabled.value = false;
    }
  }
};
// 主页切换标签结束 ///////////////////////////////////////////////////////////

// 卡片详情页的内容 //////////////////////////////////////////////////////////
const detail = Details.detail
const overlayX = ref(0); // 覆盖层的水平位置
const overlayY = ref(0); // 覆盖层的垂直位置
// 卡片详情
const show = ref(false)
const getDetails = async (id) => Details.getDetail(id)
const showMessage = async (id) => {
  window.history.pushState({}, '', `/explore/${id}`);
  overlayX.value = event.clientX;
  overlayY.value = event.clientY;
  await getDetails(id)
  show.value = true
}
const afterDoComment = (comment) => Details.afterDoComment(comment)
const setComment = (data) => Details.SetComment(data)
const close = () => {
  window.history.pushState({}, '', `/user/index/${userInfo.value.user.id}`);
  show.value = false
}
// 卡片详情页的内容结束 //////////////////////////////////////////////////////////

onMounted(async () => {
  await getUserInfo()
  await Toggle()
})

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
      <div v-if="userPost.length === 0">
        <el-empty description="现在还没有帖子..."/>
      </div>
      <div class="container" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-distance="0"
           v-else>
        <home-card :cards="userPost" @show-detail="showMessage"></home-card>
      </div>
      <transition name="fade">
        <div class="overlay" v-if="show" :style="{ transformOrigin: `${overlayX}px ${overlayY}px` }">
          <button class="backPage" @click="close">
            <el-icon>
              <Back/>
            </el-icon>
          </button>
          <card-detail :detail="detail" @afterDoComment="afterDoComment" v-if="detail.id"/>
        </div>
      </transition>
    </div>
    <div v-else-if="radio === '收藏'">
      <div v-if="userCollect.length === 0">
        <el-empty description="现在还没有收藏..."/>
      </div>
      <div class="container" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-distance="0"
           v-else>
        <home-card :cards="userCollect" @show-detail="showMessage"></home-card>
      </div>
      <transition name="fade">
        <div class="overlay" v-if="show" :style="{ transformOrigin: `${overlayX}px ${overlayY}px` }">
          <button class="backPage" @click="close">
            <el-icon>
              <Back/>
            </el-icon>
          </button>
          <card-detail :detail="detail" @afterDoComment="afterDoComment"/>
        </div>
      </transition>
    </div>
    <div v-else-if="radio === '点赞'">
      <div v-if="userFavorite.length === 0">
        <el-empty description="现在还没有点赞..."/>
      </div>
      <div class="container" v-infinite-scroll="load" :infinite-scroll-disabled="disabled" infinite-scroll-distance="0"
           v-else>
        <home-card :cards="userFavorite" @show-detail="showMessage"></home-card>
      </div>
      <transition name="fade">
        <div class="overlay" v-if="show" :style="{ transformOrigin: `${overlayX}px ${overlayY}px` }">
          <button class="backPage" @click="close">
            <el-icon>
              <Back/>
            </el-icon>
          </button>
          <card-detail :detail="detail" @afterDoComment="afterDoComment"/>
        </div>
      </transition>
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
  animation: scaleIn 0.5s forwards;
}

@keyframes scaleIn {
  0% {
    transform: scale(0);
  }
  5% {
    transform: scale(0.1);
  }
  10% {
    transform: scale(0.2);
  }
  15% {
    transform: scale(0.3);
  }
  20% {
    transform: scale(0.4);
  }
  25% {
    transform: scale(0.5);
  }
  30% {
    transform: scale(0.6);
  }
  35% {
    transform: scale(0.7);
  }
  40% {
    transform: scale(0.8);
  }
  45% {
    transform: scale(0.9);
  }
  50% {
    transform: scale(0.95);
  }
  55% {
    transform: scale(0.97);
  }
  60% {
    transform: scale(0.98);
  }
  65% {
    transform: scale(0.99);
  }
  70% {
    transform: scale(0.995);
  }
  75% {
    transform: scale(0.997);
  }
  80% {
    transform: scale(0.998);
  }
  85% {
    transform: scale(0.999);
  }
  90% {
    transform: scale(0.9995);
  }
  95% {
    transform: scale(0.9997);
  }
  100% {
    transform: scale(1);
  }
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

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>