<script setup>
import {Edit} from "@element-plus/icons-vue";
import {ref} from "vue";

defineProps({
  detail: {
    type: Object,
  }
})
const content = ref('')
const doFocusOn = (id) => {
  console.log(id)
}

const comment = (id) => {
  console.log(id, content.value)
}

</script>

<template>
  <div class="box" v-if="detail">
    <el-card style="border-radius: 0.8rem;" >
      <el-row :gutter="50">
        <el-col :span="50">
          <div class="banner">
            <el-carousel height="600px">
              <el-carousel-item v-for="item in detail.imgs" :key="item">
                <img class="image"
                     :src="item"
                     alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
        </el-col>
        <el-col :span="50">
          <div class="info">
            <el-row style="align-items: center;width: 500px;">
              <el-avatar :src="detail.user.avatar" size="large"/>
              <div class="username">{{ detail.user.username }}</div>
              <button class="focusOn" @click="doFocusOn(detail.user.id)">关注</button>
            </el-row>
            <div class="main-content">
              <el-row style="margin-top: 20px;">
                <h2>{{ detail.title }}</h2>
              </el-row>
              <el-row>
                <p>{{ detail.content }}</p>
              </el-row>
              <el-row>
                <time class="time">{{ detail.createTime }}</time>
              </el-row>
              <hr/>
              <div class="comments">
                <el-empty description="现在还没有评论" v-if="detail.comment.length === 0"/>
              </div>
            </div>
          </div>
          <el-input
              v-model="content" class="comment-input" type="text" placeholder="说点什么..."
              :prefix-icon="Edit" @keyup.enter="comment(detail.user.id)" clearable
          />
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<style scoped>
.box {
  position: absolute;
  left: 200px;
  top: 40px;
  border-radius: 0.8rem;
  width: 1200px;
  height: 600px;
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