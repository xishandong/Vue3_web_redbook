import {defineStore} from "pinia";
import {ref} from "vue";
import {login, queryUserFocus, Register} from "@/apis/main";

export const useUserStore = defineStore('user', () => {
  const userInfo = ref({});
  const userFocus = ref([]);

  const userRegister = async ({ email, username, password }) => {
    await Register({ email, username, password });
  };

  const getUserInfo = async ({ email, password }) => {
    userInfo.value = await login({email, password});

    const focusResult = await queryUserFocus();
    userFocus.value = focusResult.info;
  };

  const extendUserInfo = (id) => {
    userFocus.value = [...userFocus.value, id];
  };

  const removeFocus = (id) => {
    const index = userFocus.value.indexOf(id);
    if (index !== -1) {
      userFocus.value.splice(index, 1);
    }
  };

  const userLogout = async () => {
    userInfo.value = {};
    return { info: "成功退出登录" };
  };

  const changeInfo = ({ username, signature, avatar }) => {
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
  };
}, {
  persist: true,
});
