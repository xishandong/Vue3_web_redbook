<script setup>
import {ref} from "vue";

defineProps({
  card_columns: {
    default: () => {
    }
  }
})
const emit = defineEmits(['show-detail'])
const details = (id) => {
  const target = event.target;
  const left = target.x;
  const top = target.y;
  emit('show-detail', id, left, top)
}
const ok = ref(false)
const handleLoad = (card) => {
  card.load = true
}
</script>

<template>
  <div class="col">
    <div v-for="col in card_columns" :key="col.id">
      <section v-for="card in col" :key="card.id">
        <div v-show="card.load" style=" padding: 0" class="card">
          <a :href="`/explore/${card.id}`" @click.prevent="details(card.id)">
            <img
                :src="card.img"
                class="image"
                @load="handleLoad(card)"
                alt=""
            />
          </a>
          <div style="padding: 10px">
            <div style="margin-bottom: 10px;height: 20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
              <span style="font-size: 1.0rem;" @click="details(card.id)">{{ card.title }}</span>
            </div>
            <div class="bottom">
              <el-row style="align-items: center;">
                <RouterLink :to="`/user/index/${card.user.id}`">
                  <el-avatar
                      :src="card.user.avatar" size="small"
                  />
                </RouterLink>
                <div class="username">{{ card.user.username }}</div>
              </el-row>
            </div>
          </div>
        </div>
        <div v-if="!card.load">
          <div class="card loading">
            <div class="image" :style="{height: card.img_info.height / (card.img_info.width / 250) + 'px'}">
            </div>
            <div style="padding: 10px">
              <div
                  style="margin-bottom: 10px;height: 20px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">
                <span style="font-size: 1.0rem;" @click="details(card.id)">{{ card.title }}</span>
              </div>
              <div class="bottom">
                <el-row style="align-items: center;">
                  <RouterLink :to="`/user/index/${card.user.id}`">
                    <div class="avatar"></div>
                  </RouterLink>
                  <div class="username">{{ card.user.username }}</div>
                </el-row>
              </div>
            </div>
          </div>
        </div>
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

.loading .image,
.loading .avatar {
  background: gainsboro linear-gradient(
      100deg,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, .5) 50%,
      rgba(255, 255, 255, 0) 60%
  );
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1s loading ease-in-out infinite;
}

@keyframes loading {
  to {
    background-position-x: -20%;
  }
}

.loading .avatar {
  border-radius: 50%;
  height: 24px;
  width: 24px;
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
  object-fit: fill;
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