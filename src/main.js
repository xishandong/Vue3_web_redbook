import {createApp} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import '@/assets/font/iconfont.css'
import '@/styles/common.css'
import asideNav from '@/components/asideNav.vue'
import headNav from '@/components/headNav.vue'
import homeCard from '@/components/homeCard.vue'
import cardDetail from '@/components/cardDetail.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router).mount('#app')
app.component('asideNav', asideNav)
    .component('headNav', headNav)
    .component('homeCard', homeCard)
    .component('cardDetail', cardDetail)