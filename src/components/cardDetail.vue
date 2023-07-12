<script setup>
import {Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
import {doComment, doFocus, unFollow, controlUserCollectOrLike} from "@/apis/main";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user";

defineProps({
  detail: {
    type: Object,
  },
  comments: {
    type: Array,
  }
})
// 子传父
const emit = defineEmits(['afterDoComment'])
// 评论内容
const content = ref('')
const userStore = useUserStore()
const doFocusOn = async (id) => {
  if (userStore.userInfo.id === id) {
    ElMessage({type: 'warning', message: '不能对自己进行关注操作'})
    return
  }
  const res = await doFocus({id})
  userStore.extendUserInfo(1, id)
  ElMessage({type: 'success', message: res.info})
}
const cancelFocusOn = async (id) => {
  const res = await unFollow({id})
  userStore.removeFocus(1, id)
  ElMessage({type: 'success', message: res.info})
}
const checkFollow = (id) => {
  return userStore.userFocus.includes(id)
}
const checkCollect = (id) => {
  return userStore.userCollect.includes(id)
}
const checkFavorite = (id) => {
  return userStore.userFavorite.includes(id)
}
const comment = async (post, to) => {
  const data = {
    post_id: post.id,
    content: content.value,
    parent_comment_id: to
  }
  const res = await doComment({data})
  content.value = ''
  ElMessage({type: 'success', message: res.info})
  emit('afterDoComment', data)
}
const doSomething = async (type, detail) => {
  const post_id = detail.id
  if (type === 'like') {
    const operator = checkFavorite(post_id)
    const res = await controlUserCollectOrLike({post_id, operator, type})
    if (operator) {
      userStore.removeFocus(2, post_id)
      detail.likeCount --;
      ElMessage({type: 'success', message: res.info})
    } else {
      userStore.extendUserInfo(2, post_id)
      detail.likeCount ++;
      ElMessage({type: 'success', message: res.info})
    }
  } else if (type === 'collect') {
    const operator = checkCollect(post_id)
    const res = await controlUserCollectOrLike({post_id, operator, type})
    if (operator) {
      detail.collectCount --;
      userStore.removeFocus(3, post_id)
      ElMessage({type: 'success', message: res.info})
    } else {
      detail.collectCount ++;
      userStore.extendUserInfo(3, post_id)
      ElMessage({type: 'success', message: res.info})
    }
  }
}
</script>

<template>
  <div class="box" v-if="detail.id">
    <el-card style="border-radius: 0.8rem;">
      <el-row :gutter="50">
        <el-col :span="50">
          <div class="banner">
            <el-carousel height="600px">
              <el-carousel-item v-for="item in detail.imgs" :key="item">
                <img class="image"
                     :src="item"
                     alt=""/>
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="50">
          <div class="info" style="width: 500px;">
            <el-row style="align-items: center;width: 500px;">
              <a :href="`/user/index/${detail.user.id}`">
                <el-avatar :src="detail.user.avatar" size="large"/>
              </a>
              <div class="username">{{ detail.user.username }}</div>
              <el-popconfirm @confirm="cancelFocusOn(detail.user.id)" title="确认取消关注吗?" confirm-button-text="确认"
                             v-if="checkFollow(detail.user.id)"
                             cancel-button-text="取消">
                <template #reference>
                  <button class="focusOn">已关注</button>
                </template>
              </el-popconfirm>
              <button class="focusOn" v-else @click="doFocusOn(detail.user.id)">关注</button>
            </el-row>
            <div class="main-content">
              <el-row style="margin-top: 20px;">
                <h2>{{ detail.title }}</h2>
              </el-row>
              <el-row>
                <div class="content">{{ detail.content }}</div>
              </el-row>
              <el-row>
                <time class="time">{{ detail.createTime }}</time>
              </el-row>
              <hr/>
              <div class="comments" v-if="comments">
                <el-empty description="现在还没有评论" v-if="comments.length === 0"/>
                <div v-else class="commentBox">
                  <div class="commentTitle" style="margin-bottom: 10px;">共{{ comments.length }}条评论</div>
                  <div v-for="item in comments" :key="item.id">
                    <el-row :gutter="20">
                      <el-col :span="2.5">
                        <a :href="`/user/index/${item.user.id}`">
                          <el-avatar :src="item.user.avatar" :size="30"></el-avatar>
                        </a>
                      </el-col>
                      <el-col :span="20" style="font-size: 14px">
                        <div style="color:#33333399;">{{ item.user.username }}</div>
                        <div style="color:#333333;margin-top: 2px;margin-bottom: 10px;">{{ item.content }}</div>
                        <time class="time">{{ item.createTime }}</time>
                      </el-col>
                    </el-row>
                    <el-divider/>
                  </div>
                </div>
              </div>
            </div>
            <el-divider/>
          </div>
          <div class="bottomArea">
            <div class="buttonArea">
              <el-row>
                <div class="warp" @click="doSomething('like', detail)">
                  <svg t="1689147877558" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-bottom: 2px;"
                       xmlns="http://www.w3.org/2000/svg" p-id="3345" width="25" height="25">
                    <path
                        d="M512 901.746939c-13.583673 0-26.122449-4.179592-37.093878-13.061225-8.881633-7.314286-225.697959-175.020408-312.424489-311.379592C133.746939 532.37551 94.040816 471.24898 94.040816 384.522449c0-144.718367 108.146939-262.269388 240.326531-262.269388 67.395918 0 131.657143 30.82449 177.632653 84.636735 45.453061-54.334694 109.191837-84.636735 177.110204-84.636735 132.702041 0 240.326531 117.55102 240.326531 262.269388 0 85.159184-37.093878 143.673469-67.395919 191.216327l-1.044898 1.567346c-86.726531 136.359184-303.542857 304.587755-312.424489 311.379592-10.44898 8.359184-22.987755 13.061224-36.571429 13.061225z"
                        :fill="!checkFavorite(detail.id)?'#cecccc':'#d81e06'" p-id="3346"></path>
                  </svg>
                  <p style="margin: 0 0 0 1px;">{{ detail.likeCount }}</p>
                </div>
                <div class="warp" @click="doSomething('collect', detail)">
                  <svg t="1689148085763" class="icon" viewBox="0 0 1024 1024" version="1.1"
                       style="margin-bottom: 4px;"
                       xmlns="http://www.w3.org/2000/svg" p-id="4912" width="25" height="25">
                    <path
                        d="M512.009505 25.054894l158.199417 320.580987 353.791078 51.421464L767.995248 646.579761l60.432101 352.365345-316.417844-166.354615-316.436854 166.354615 60.432101-352.365345L0 397.057345l353.791078-51.421464z"
                        :fill="!checkCollect(detail.id)?'#cecccc':'#f4ea2a'" p-id="4913"></path>
                  </svg>
                  <p style="margin: 0 0 0 1px;">{{ detail.collectCount }}</p>
                </div>
                <div class="warp">
                  <svg t="1689148939874" class="icon" viewBox="0 0 1024 1024" version="1.1" style="margin-bottom: 2px;"
                       xmlns="http://www.w3.org/2000/svg" p-id="6375" width="25" height="25">
                    <path
                        d="M512 0C226.742857 0 0 197.485714 0 446.171429c0 138.971429 73.142857 270.628571 190.171429 351.085714L190.171429 1024l226.742857-138.971429c29.257143 7.314286 65.828571 7.314286 95.085714 7.314286 285.257143 0 512-197.485714 512-446.171429C1024 197.485714 797.257143 0 512 0zM256 512C219.428571 512 190.171429 482.742857 190.171429 446.171429S219.428571 380.342857 256 380.342857c36.571429 0 65.828571 29.257143 65.828571 65.828571S292.571429 512 256 512zM512 512C475.428571 512 446.171429 482.742857 446.171429 446.171429S475.428571 380.342857 512 380.342857c36.571429 0 65.828571 29.257143 65.828571 65.828571S548.571429 512 512 512zM768 512C731.428571 512 702.171429 482.742857 702.171429 446.171429s29.257143-65.828571 65.828571-65.828571c36.571429 0 65.828571 29.257143 65.828571 65.828571S804.571429 512 768 512z"
                        p-id="6376" fill="#cecccc"></path>
                  </svg>
                  <p style="margin: 0 0 0 1px;">{{ comments.length }}</p>
                </div>
              </el-row>
            </div>
            <el-input
                v-model="content" class="comment-input" type="text" placeholder="说点什么..."
                :prefix-icon="Edit" @keyup.enter="comment(detail)" clearable
            />
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.content {
  margin: 0;
  font-weight: 400;
  font-size: 16px;
  line-height: 28px;
  color: #333;
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

.commentTitle {
  font-size: 14px;
  line-height: 18px;
  color: #666;
}

.box {
  position: absolute;
  left: 200px;
  top: 40px;
  border-radius: 0.8rem;
  width: 1200px;
  height: 600px;
  overflow-y: scroll;
}

.banner {
  width: 600px;
  border-radius: 0.8rem;
}

.username {
  margin-left: 15px;
}

.focusOn {
  position: absolute;
  right: 10px;
  padding: 0.6rem 0.8rem;
  color: white;
  background-color: red;
  border: 0;
  border-radius: 0.8rem;
}

.focusOn:hover {
  background-color: #fd5656;
}

.image {
  width: 600px;
  height: 600px;
  border-radius: 0.8rem;
  object-fit: contain;
}

.main-content::-webkit-scrollbar {
  width: 0.1em; /* 设置滚动条宽度为0.1em */
  background-color: transparent; /* 设置滚动条背景颜色为透明 */
}

.main-content {
  height: 420px;
  overflow-y: scroll;
}

.time {
  font-size: 12px;
  color: #999;
}

.bottomArea {
  position: absolute;
}

.buttonArea {
  position: relative;
  width: 500px;
  height: 35px;
  bottom: 1em;
}

.warp {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.comment-input {
  position: relative;
  bottom: 1.5em;
  width: 500px;
}
</style>