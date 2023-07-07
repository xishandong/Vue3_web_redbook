<script setup>
import {onBeforeMount, ref} from "vue";
import {useRoute} from "vue-router";
import CardDetail from "@/components/cardDetail.vue";

const route = useRoute()
const detail = ref({});
const getDetail = () => {
  detail.value = {
    title: '这是标题',
    content: '1提前购买战袍\n' +
        '·离职前7天购入，我选择的是这件《I am not doing sh*t today》在忙碌的办公室里晃悠非常拉仇恨，亲测很爽\n' +
        '\n' +
        '2早点到公司吃早饭\n' +
        '·重度回本项目之一，因为公司的早餐真的很丰盛，咱就是各个餐道甜的咸的荤的素的都来点，离开字节再也没人能让我早起吃饭',
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
        content: '我是一条评论',
        id: 1,
        createTime: '2023-07-07'
      },
      {
        user: {
          username: '用户1',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          id: 2
        },
        content: '我是一条评论',
        id: 2,
        createTime: '2023-07-07'
      },
      {
        user: {
          username: '用户1',
          avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
          id: 2
        },
        content: '条评论我是一条评论我是一条评论我是一条评论我是一条评论',
        id: 2,
        createTime: '2023-07-07'
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