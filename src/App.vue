<template>
  <Switch></Switch>
  <n-message-provider>
    <router-view></router-view>
    <main-footer></main-footer>
  </n-message-provider>
</template>

<script setup lang="ts">
import Switch from './components/switch.vue'
import MainFooter from './components/mainFooter.vue'
</script>

<style>
@import './assets/icon/iconfont.css';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
