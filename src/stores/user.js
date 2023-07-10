import {defineStore} from "pinia";
import {ref} from "vue";
import {login, Register} from "@/apis/main";

export const useUserStore
    = defineStore('user', () => {
        const userInfo = ref({})
        const userRegister = async ({email, username, password}) => {
            await Register({email, username, password})
        }
        const getUserInfo = async ({email, password}) => {
            userInfo.value = await login({email, password})
        }
        const userLogout = async () => {
            userInfo.value = {}
            return {'info': '成功退出登录'}
        }
        return {
            userInfo,
            getUserInfo,
            userLogout,
            userRegister
        }
    },
    {
        persist: true,
    })