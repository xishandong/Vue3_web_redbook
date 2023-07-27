<script setup>
const props = defineProps({
  card_columns: {
    default: () => {}
  }
})
const emit = defineEmits(['show-detail'])
const details = (id) => {
  emit('show-detail', id)
}
</script>

<template>
  <div class="col">
    <div v-for="col in card_columns">
      <section v-for="card in col" :key="card.id">
        <el-card :body-style="{ padding: '0px' }" shadow="hover" class="card">
          <a :href="`/explore/${card.id}`" @click.prevent="details(card.id)">
            <img
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
    </div>
  </div>
</template>

<style scoped>
.col {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

section {
  width: 250px;
  break-inside: avoid; /* 防止卡片被分割在两列中 */
  margin: 20px 20px 20px 20px;
}

.card {
  border-radius: 0.8rem;
  background-color: transparent;
}

.image {
  width: 250px;
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