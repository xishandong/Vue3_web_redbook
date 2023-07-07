import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore =
    defineStore('user', ()=>{
        const userInfo = ref({})
        userInfo.value = {
            id: 1,
            username: '西山',
            avatar: 'https://sns-avatar-qc.xhscdn.com/avatar/6432472e3efe33e0b0d55517.jpg?imageView2/2/w/540/format/webp|imageMogr2/strip'
        }
        const getUserInfo = () => {
            console.log('hello')
        }
        const userLogout = () => {
            userInfo.value = {}
        }
        return {
            userInfo,
            getUserInfo,
            userLogout
        }
    })