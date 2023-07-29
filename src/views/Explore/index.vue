<script setup>
import {onMounted, ref} from "vue";
import HomeCard from "@/components/homeCard.vue";
import {Back} from "@element-plus/icons-vue";
import CardDetail from "@/components/cardDetail.vue";
import {queryPost} from "@/apis/main";
import {useRoute} from "vue-router";
import {controlDetail} from "@/stores/controlDetail";
import {onClickOutside} from '@vueuse/core';
import {resizeWaterFall, waterFallInit, waterFallMore} from "@/utils/waterFall";

const query = useRoute().query.query
const Details = controlDetail()

// 主页卡片 //////////////////////////////////////////////////////////////////
const cards = ref([]);
const disabled = ref(true); // 初始禁用滚动加载

const columns = ref(0)
const card_columns = ref({})
const arrHeight = ref([])

// 主页获取帖子
const doQuery = async (offset) => {
  const res = await queryPost({offset, query});
  cards.value = res.info;
  waterFallInit(columns, card_columns, arrHeight, cards)
  disabled.value = false; // 启用滚动加载
};
// 无限滚动
const load = async () => {
  disabled.value = true;
  const offset = cards.value.length;
  const res = await queryPost({offset, query});
  const more = res.info;
  if (more.length === 0) {
    disabled.value = true; // 没有更多数据，禁用滚动加载
  } else {
    cards.value = [...cards.value, ...more];
    waterFallMore(arrHeight, card_columns, more)
    disabled.value = false;
  }
};
// 主页卡片结束////////////////////////////////////////////////////////////////

// 卡片详情 //////////////////////////////////////////////////////////////////
const detail = Details.detail;
const show = ref(false);
const overlayX = ref(0); // 覆盖层的水平位置
const overlayY = ref(0); // 覆盖层的垂直位置
const content = Details.content // 评论内容
const getDetails = async (id) => Details.getDetail(id)
const showMessage = async (id) => {
  window.history.pushState({}, "", `/explore/${id}`);
  overlayX.value = event.clientX;
  overlayY.value = event.clientY;
  await getDetails(id);
  show.value = true;
};
const afterDoComment = (comment) => Details.afterDoComment(comment)
const close = () => {
  window.history.pushState({}, "", "/");
  show.value = false;
};
// 卡片详情结束 //////////////////////////////////////////////////////////////////

onMounted(async () => {
  await doQuery(0);
  resizeWaterFall(columns, card_columns, arrHeight, cards)
});

const overlay = ref(null)
onClickOutside(overlay, () => {
  window.history.pushState({}, "", "/explore/${id}");
  show.value = false;
});
</script>

<template>
  <div class="Empty" v-if="cards.length === 0">
    <el-empty description="没有帖子..."/>
  </div>
  <div v-else>
    <div v-infinite-scroll="load" :infinite-scroll-disabled="disabled" :infinite-scroll-delay="200" :infinite-scroll-distance="100">
      <home-card :card_columns="card_columns" @show-detail="showMessage" ref="homeCardRef"></home-card>
    </div>
    <transition name="fade">
      <div class="overlay" v-if="show" :style="{ transformOrigin: `${overlayX}px ${overlayY}px` }">
        <button class="backPage" @click="close">
          <el-icon>
            <Back/>
          </el-icon>
        </button>
        <card-detail :detail="detail" @afterDoComment="afterDoComment" ref="overlay"/>
      </div>
    </transition>
  </div>
</template>


<style scoped>
.Empty {
  margin-top: 10%;
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