<script setup>
import {ref} from "vue";
import {Promotion, Expand, Close} from "@element-plus/icons-vue";
import {useUserStore} from "@/stores/user";
import Login from '@/views/Login/index.vue'
// user
const userStore = useUserStore()
// control menu condition
const isMenuOpen = ref(false)
// change menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}
// logout
const confirm = () => {
  userStore.userLogout()
}
const show = ref(false)
const changeShow = () => {
  show.value = !show.value;
}
</script>

<template>
  <nav class="menu" :class="{ open: isMenuOpen }">
    <div class="actionsBar">
      <div>
        <button id="menuBtn" type="button" @click="toggleMenu"><i class="iconfont icon-hanbaocaidan"></i></button>
        <h3 class="menuText" :class="{ open2: isMenuOpen }">{{ userStore.userInfo.name }}</h3>
      </div>
    </div>
    <ul class="optionsBar">
      <li class="menuItem">
        <RouterLink to="/" class="menuOption">
          <i class="iconfont icon-shouye"></i>
          <h5 class="menuText" :class="{ open2: isMenuOpen }">主页</h5>
        </RouterLink>
      </li>
      <li class="menuBreak">
        <hr>
      </li>
      <li class="menuItem">
        <RouterLink to="/" class="menuOption">
          <el-icon size="x-large">
            <Promotion/>
          </el-icon>
          <h5 class="menuText" :class="{ open2: isMenuOpen }">发布</h5>
        </RouterLink>
      </li>
    </ul>
    <div class="about" id="about">
    </div>
    <div v-if="userStore.userInfo.id">
      <div class="menuUser">
        <RouterLink :to="`/user/index/${userStore.userInfo.id}`">
          <div>
            <img :src="userStore.userInfo.avatar" alt="">
          </div>
          <h5 class="Username menuText" :class="{ open2: isMenuOpen }">{{ userStore.userInfo.name }}</h5>
          <p class="menuText" :class="{ open2: isMenuOpen }"><i class="iconfont icon-youjiantou"></i></p>
        </RouterLink>
      </div>
      <div class="themeBar">
        <div>
          <el-popconfirm @confirm="confirm" title="确认退出吗?" confirm-button-text="确认"
                         cancel-button-text="取消">
            <template #reference>
              <button type="button" @click=""><i class="iconfont icon-tuichu"></i></button>
            </template>
          </el-popconfirm>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="themeBar">
          <div>
            <button title="登录" type="button" @click="changeShow">
              <el-icon size="x-large">
                <Expand/>
              </el-icon>
            </button>
          </div>
      </div>
    </div>
  </nav>
  <div class="overlay" v-if="show">
    <el-button class="close" @click="changeShow" plain round><el-icon size="x-large"><Close /></el-icon></el-button>
    <login/>
  </div>
</template>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 设置透明度的背景色 */
  z-index: 9999; /* 设置一个较大的z-index值，确保图层位于其他内容之上 */
}
.close{
  border: 0;
  position: absolute;
  left: 71%;
  top: 18%;
  background-color: #fff;
  z-index: 1000; /* 设置一个较大的z-index值，确保图层位于其他内容之上 */
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.iconfont {
  font-size: 20px;
}

.menu {
  position: absolute;
  width: 60px;
  height: 650px;
  background-color: #dedbdb;
  z-index: 2;
  top: 65px;
  bottom: 0;
  left: 10px;
  margin: auto;
  border-radius: 0.8rem;
  transition: 0.3s ease 0.15s;
  font-family: sans-serif;
}

.menu a {
  text-decoration: none;
}

.menu .actionsBar {
  width: 100%;
  height: 10%;
  padding: 0.5rem;
  overflow: hidden;
}

.menu .actionsBar div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.menu .actionsBar div button {
  background-color: transparent;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  color: #000;
  width: 45px;
  height: 45px;
  transition: 0.3s ease;
  font-size: 1rem;
}

.menu .actionsBar div button:hover {
  background-color: #d5d0d0;
  color: #F19FA3;

}

.menu .actionsBar div h3 {
  width: calc(100% - 45px);
  text-align: center;
}

.menu .optionsBar {
  overflow: hidden;
  display: flex;
  width: 100%;
  height: 60%;
  padding: 0 0.5rem;
  align-items: center;
  flex-direction: column;
}

.menu .optionsBar .menuItem {
  width: 100%;
  height: 45px;
  margin: 0.3rem;
}

.menu .optionsBar .menuItem .menuOption {
  font-size: 1rem;
  outline: none;
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.menu .optionsBar .menuItem .menuOption:hover {
  background-color: #d5d0d0;
  color: #f5131e;

}

.menu .optionsBar .menuItem .menuOption:hover i,
.menu .optionsBar .menuItem .menuOption:hover h5 {
  color: #f5131e;

}

.menu .optionsBar .menuItem .menuOption i {
  width: 45px;
  text-align: center;
  color: #000;
}

.menu .optionsBar .menuItem .menuOption h5 {
  width: calc(100% - 45px);
}

.menuText {
  color: #000;
  transform: translateX(-250px);
  opacity: 0;
  transition: transform 0.3s ease 0.1s;
}

.menu .about {
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 1rem;
  flex-direction: column;
  font-family: sans-serif;
  opacity: 0;
  white-space: nowrap;
  transition: 0.3s ease 0.15s;
}

.menu.open {
  width: 240px;
  opacity: 0.9;
}

.menuText.open2 {
  opacity: 1;
  transform: translateX(0);
  text-align: center;
}

.menu .menuBreak {
  width: 100%;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu .menuBreak hr {
  width: 70%;
  height: 3px;
  background-color: #000;
  border: none;
  border-radius: 5px;
}

.menu .themeBar {
  overflow: hidden;
  width: 100%;
  height: 10%;
  padding: 0.5rem;
}

.menu .themeBar div {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 0.5rem;
  transition: 0.3s ease;
}

.menu .themeBar div button {
  background-color: transparent;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  color: #000;
  width: 100%;
  height: 45px;
  transition: 0.3s ease;
  font-size: 1rem;
}

.menu .themeBar div button:hover {
  background-color: #d5d0d0;
  color: #f5131e;

}

.menu .menuUser {
  width: 100%;
  height: 10%;
}

.menu .menuUser a {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-decoration: none;
  padding: 0.5rem;
  position: relative;
}

.menu .menuUser a div {
  width: 45px;
  height: 45px;
  position: relative;
  border-radius: 0.5rem;
}

.menu .menuUser a div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.menu .menuUser a .Username {
  width: calc(70% - 45px);
}

.menu .menuUser a p {
  width: calc(30% - 45px);
}

.menu .menuUser a:hover p {
  animation: animArrow 0.3s ease 2;
  color: #F19FA3;

}

@keyframes animArrow {
  0% {
    transform: translateX(0);
  }

  50% {
    transform: translateX(5px);
  }

  100% {
    transform: translateX(0);
  }
}

.menu .menuUser .userInfo {
  position: absolute;
  width: 20rem;
  height: 18rem;
  opacity: 0;
  pointer-events: none;
  top: 34%;
  left: 1.5rem;
  transition: 0.3s ease;
  transform: scale(0);
  transform-origin: bottom left;
}

.menu .menuUser:hover .userInfo {
  pointer-events: all;
  opacity: 1;
  transform: scale(1);
  color: #F19FA3;
}

.selected {
  background-color: #d5d0d0;
  color: #f5131e;
}
</style>