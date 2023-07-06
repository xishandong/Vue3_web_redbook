<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import CardDetail from "@/components/cardDetail.vue";

const route = useRoute()
const detail = ref({});
const getDetail = () => {
  detail.value = {
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
    comment: [
      {
        user: {
          username: '用户1',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          id: 2
        },
        content: '我是一条评论'
      }
    ]
  }
}


onBeforeMount(() => getDetail())
</script>

<template>
  <card-detail :detail="detail"/>
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