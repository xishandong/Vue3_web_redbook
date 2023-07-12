import {createRouter, createWebHistory} from 'vue-router'
import Home from '@/views/Home/index.vue'
import Login from '@/views/Login/index.vue'
import Detail from '@/views/Details/index.vue'
import Explore from '@/views/Explore/index.vue'
import UserIndex from '@/views/UserIndex/index.vue'
import Uploads from '@/views/Uploads/index.vue'
import NotFound from '@/views/NotFound/index.vue'

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
                },
                {
                    path: '/user/uploads',
                    component: Uploads
                },
            ]
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/NotFound',
            component: NotFound
        }
    ]
})

export default router
