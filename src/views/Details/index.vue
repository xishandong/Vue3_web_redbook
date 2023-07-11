<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import CardDetail from "@/components/cardDetail.vue";
import {postDetail} from "@/apis/main";
import {getCurrentTime} from "@/utils/getTime";
import {useUserStore} from "@/stores/user";

const route = useRoute()
const detail = ref({});

// 评论内容
const content = ref('')
const userStore = useUserStore()
const getDetail = async () => {
  const id = route.params.id
  const res = await postDetail({ id });
  detail.value = res.info
}

const afterDoComment = (comment) => {
  const info = [{
    user: userStore.userInfo,
    content: comment.content,
    createTime: getCurrentTime()
  }]
  detail.value.comment = [...detail.value.comment, ...info]
}

onMounted(() => getDetail())
</script>

<template>
  <card-detail :detail="detail" @afterDoComment="afterDoComment" v-if="detail.id"/>
</template>

<style scoped>
.box {
  position: absolute;
  left: 200px;
  top: 70px;
  border-radius: 0.8rem;
  width: 1200px;
  height: 600px;
}
</style>