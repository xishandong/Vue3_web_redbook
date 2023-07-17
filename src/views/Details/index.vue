<script setup>
import {onMounted} from "vue";
import {useRoute} from "vue-router";
import CardDetail from "@/components/cardDetail.vue";
import {controlDetail} from "@/stores/controlDetail";

const route = useRoute();
const Detail = controlDetail();
const detail = Detail.detail
// 评论内容
const content = Detail.content
const getDetail = () => Detail.getDetail(route.params.id)
const afterDoComment = (comment) => Detail.afterDoComment(comment)

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