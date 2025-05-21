<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AvatarMusicPlayer from './components/AvatarMusicPlayer.vue';
import Typewriter from './components/Typewriter.vue';
import Turntable from './components/Turntable.vue';
import Date from './components/Date.vue';
import Tags from './components/Tags.vue';
import Content from './components/Content.vue';
import Homeright from './components/Homeright.vue';

</script>

<template>
  <div class="app">
    <div class="homeleft">
      <div class="avatar">
        <AvatarMusicPlayer/>
      </div>
        
      <div class="tags">
        <Tags/>
    </div>
    </div>
    <div class="homeright">
      <Homeright/>
    </div>
    <router-view />
  </div>
</template>

<style>
  html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  /* display: flex; */
}
  .app{
        padding: 20px;
        display: flex;
        background-image: url(../public/img/image.png) ;
        height: 100vh;
        width: 100vw;
        box-sizing: border-box; 
        background-size: cover;
        background-attachment: fixed;
        
    }
  @import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');

  .tags{
    margin-top: 250px;
    border: none;
    
  }
  .homeleft{
    height: 100%;
    width: 400px;
    overflow: auto;/* 允许滚动 */
    -ms-overflow-style: none;/* 隐藏滚动条 IE/Edge */
    scrollbar-width: none; /* 隐藏滚动条 Firefox */
    border: none;
  }
  .homeright{
    /* position: absolute; */
    width: 100%;
    height: 100%;
    /* margin-left: 50px; */
    /* display: flex; */
  }

  @media (max-width: 500px) {
        .homeleft{
          display: none;
        }
    }
</style>
