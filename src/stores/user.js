import {defineStore} from "pinia";
import {ref} from "vue";
import {login, queryUserFocus, Register} from "@/apis/main";

export const useUserStore = defineStore('user', () => {
    const userInfo = ref({});
    const userFocus = ref([]);
    const userCollect = ref([]);
    const userFavorite = ref([]);
    const headersObj = ref({})
    const userRegister = async ({email, username, password}) => {
        await Register({email, username, password});
    };

    const getUserInfo = async ({email, password}) => {
        userInfo.value = await login({email, password});
        const focusResult = await queryUserFocus();
        userFocus.value = focusResult.info.follow;
        userCollect.value = focusResult.info.collected;
        userFavorite.value = focusResult.info.favorites;
        headersObj.value = {Authorization: `Bearer ${userInfo.value.token}`}
    };

    const extendUserInfo = (type, id) => {
        if (type === 1) {
            userFocus.value = [...userFocus.value, id];
        } else if (type === 2) {
            userFavorite.value = [...userFavorite.value, id];
        } else if (type === 3) {
            userCollect.value = [...userCollect.value, id];
        }
    };

    const removeFocus = (type, id) => {
        if (type === 1) {
            const index = userFocus.value.indexOf(id);
            if (index !== -1) {
                userFocus.value.splice(index, 1);
            }
        } else if (type === 2) {
            const index = userFavorite.value.indexOf(id);
            if (index !== -1) {
                userFavorite.value.splice(index, 1);
            }
        } else if (type === 3) {
            const index = userCollect.value.indexOf(id);
            if (index !== -1) {
                userCollect.value.splice(index, 1);
            }
        }
    };

    const userLogout = async () => {
        userInfo.value = {};
        return {info: "成功退出登录"};
    };

    const changeInfo = ({username, signature, avatar}) => {
        userInfo.value.username = username;
        userInfo.value.signature = signature;
        userInfo.value.avatar = avatar;
    };

    return {
        userInfo,
        getUserInfo,
        userLogout,
        userRegister,
        extendUserInfo,
        userFocus,
        removeFocus,
        changeInfo,
        userCollect,
        userFavorite,
        headersObj
    };
}, {
    persist: true,
});
