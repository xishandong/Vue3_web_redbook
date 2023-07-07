<script setup>
defineProps({
  cards: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['show-detail'])
const details = (id) => {
  emit('show-detail', id)
}
</script>

<template>
  <section v-for="card in cards" :key="card.id">
    <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card">
      <a :href="`/explore/${card.id}`" @click.prevent="details(card.id)">
        <img
            v-if="card.img"
            :src="card.img"
            class="image"
            alt=""
        />
      </a>
      <div style="padding: 10px">
        <div style="margin-bottom: 10px;height: 20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
          <span style="font-size: 1.0rem;" @click="details(card.id)">{{ card.title }}</span>
        </div>
        <div class="bottom">
          <el-row style="align-items: center;">
            <a :href="`/user/index/${card.user.id}`">
              <el-avatar
                  :src="card.user.avatar" size="small"
              />
            </a>
            <div class="username">{{ card.user.username }}</div>
          </el-row>
        </div>
      </div>
    </el-card>
  </section>
</template>

<style scoped>
section {
  break-inside: avoid; /* 防止卡片被分割在两列中 */
  margin-bottom: 20px; /* 设置卡片之间的垂直间隔为20px */
}

.card {
  max-width: 250px;
  max-height: 350px;
  border-radius: 0.8rem;
  background-color: transparent;
}

.image {
  width: 250px;
  max-height: 250px;
  border-radius: 0.8rem;
  object-fit: contain;
}

.image:hover {
  opacity: 0.7;
}

.username {
  margin-left: 10px;
  font-weight: 200;
  font-size: 0.5rem;
}

</style>