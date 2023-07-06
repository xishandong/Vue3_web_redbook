import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Detail from '@/views/Details/index.vue'
import Explore from '@/views/Explore/index.vue'
import UserIndex from '@/views/UserIndex/index.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                {
                    path: '',
                    component: Explore
                },
                {
                    path: 'explore/:id',
                    component: Detail
                },
                {
                    path: '/user/index/:id',
                    component: UserIndex
                }
            ]
        },
        {
            path: '/login',
            component: Login
        }
    ]
})

export default router
