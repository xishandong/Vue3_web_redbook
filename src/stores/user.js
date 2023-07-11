import {defineStore} from "pinia";
import {ref} from "vue";
import {login, Register, queryUserFocus} from "@/apis/main";

export const useUserStore
    = defineStore('user', () => {
        // 用户信息存储
        const userInfo = ref({})
        // 用户关注
        const userFocus = ref([])
        const userRegister = async ({email, username, password}) => {
            await Register({email, username, password})
        }
        const getUserInfo = async ({email, password}) => {
            userInfo.value = await login({email, password})
            const res = await queryUserFocus()
            userFocus.value = res.info
        }
        const extendUserInfo = (id) => {
            userFocus.value = [...userFocus.value, id]
        }
        const removeFocus = (id) => {
            const index = userFocus.value.indexOf(id)
            console.log(index)
            if (index !== -1) {
                userFocus.value.splice(index, 1);
            }
        }
        const userLogout = async () => {
            userInfo.value = {}
            return {'info': '成功退出登录'}
        }
        return {
            userInfo,
            getUserInfo,
            userLogout,
            userRegister,
            extendUserInfo,
            userFocus,
            removeFocus
        }
    },
    {
        persist: true,
    })