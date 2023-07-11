<script setup>
import {Edit} from "@element-plus/icons-vue";
import {ref} from "vue";
import {doComment, doFocus, unFollow} from "@/apis/main";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user";

defineProps({
  detail: {
    type: Object,
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
  userStore.extendUserInfo(id)
  ElMessage({type: 'success', message: res.info})
}
const cancelFocusOn = async (id) => {
  const res = await unFollow({id})
  userStore.removeFocus(id)
  ElMessage({type: 'success', message: res.info})
}
const checkFollow = (id) => {
  return userStore.userFocus.includes(id)
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
</script>

<template>
  <div class="box" v-if="detail">
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
              <div class="comments">
                <el-empty description="现在还没有评论" v-if="detail.comment.length === 0"/>
                <div v-else class="commentBox">
                  <div class="commentTitle" style="margin-bottom: 10px;">共{{ detail.comment.length }}条评论</div>
                  <div v-for="item in detail.comment" :key="item.id">
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
          </div>
          <el-input
              v-model="content" class="comment-input" type="text" placeholder="说点什么..."
              :prefix-icon="Edit" @keyup.enter="comment(detail)" clearable
          />
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
  height: 450px;
  overflow-y: scroll;
}

.time {
  font-size: 12px;
  color: #999;
}

.comment-input {
  position: absolute;
  bottom: 1.5em;
  width: 500px;
}
</style>