<script setup>
import {ref} from "vue";
import HomeCard from "@/components/homeCard.vue";
import {Back} from "@element-plus/icons-vue";
import CardDetail from "@/components/cardDetail.vue";

// 主页卡片
const cards = ref([
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    // img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    // img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'http://101.132.149.112/static/img/avatar-1-%E9%87%91%E7%8F%8D%E5%A6%AE.jpg',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'http://101.132.149.112/static/img/avatar-1-%E9%87%91%E7%8F%8D%E5%A6%AE.jpg',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    // img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    // img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'http://101.132.149.112/static/img/avatar-1-%E9%87%91%E7%8F%8D%E5%A6%AE.jpg',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'http://101.132.149.112/static/img/avatar-1-%E9%87%91%E7%8F%8D%E5%A6%AE.jpg',
      username: '用户名'
    }
  }
])
const detail = ref({})
const disabled = ref(false)
const load = () => {
  let temp = [
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    // img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    // img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'http://101.132.149.112/static/img/avatar-1-%E9%87%91%E7%8F%8D%E5%A6%AE.jpg',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'http://101.132.149.112/static/img/avatar-1-%E9%87%91%E7%8F%8D%E5%A6%AE.jpg',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    // img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    // img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '1',
    title: '我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'https://sns-img-hw.xhscdn.com/0ba64dcb-5292-3680-a306-760f409f8b1a?imageView2/2/w/1920/format/webp|imageMogr2/strip',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
      username: '用户名'
    }
  },
  {
    img: 'http://101.132.149.112/static/img/avatar-1-%E9%87%91%E7%8F%8D%E5%A6%AE.jpg',
    id: '2',
    title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
    user: {
      avatar: 'http://101.132.149.112/static/img/avatar-1-%E9%87%91%E7%8F%8D%E5%A6%AE.jpg',
      username: '用户名'
    }
  }
]
  cards.value = [...cards.value, ...temp]
  // disabled.value = true
}

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

</script>

<template>
  <div class="container" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
    <home-card :cards="cards" @show-detail="showMessage"></home-card>
  </div>
  <div class="overlay" v-if="show">
    <button class="backPage" @click="close">
      <el-icon>
        <Back/>
      </el-icon>
    </button>
    <card-detail :detail="detail"/>
  </div>
</template>

<style scoped>
.container {
  column-count: 5; /* 设置列数，可以根据需要调整列数 */
  column-gap: 20px; /* 设置列之间的间隔为20px */
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