<template>
    <div class="home">
        <span class="title">
        Hello, I'M LEO
        </span>
        <span class="title2">
            LEO
        </span>
    <div class="hometop">
        <div class="avatar">
            <AvatarMusicPlayer/>
        </div>
        <div class="typewriter">
        <Typewriter/>
    </div>
    <div class="date">
        <Date/>
        <Turntable/>
    </div>
    </div>
    <div class="content">
        <Content/>
    </div>
    </div>
</template>

<script lang="ts" setup>
import AvatarMusicPlayer from './AvatarMusicPlayer.vue';
import Content from './Content.vue';
import Date from './Date.vue';
import Turntable from './Turntable.vue';
import Typewriter from './Typewriter.vue';


</script>

<style scoped>
    .home {
    margin: 0;
    padding: 10px;
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    overflow-x: hidden;   /* 禁止水平滚动 */
    overflow-y: auto;     /* 垂直滚动 */
    -ms-overflow-style: none; /* IE 隐藏滚动条 */
    scrollbar-width: none;    /* Firefox 隐藏滚动条 */
    
    }
    .home::-webkit-scrollbar {
    display: none; /* Chrome 隐藏滚动条 */
    }

    .hometop{
        display: flex;
        margin-top: -6vh;
    }

    @font-face {
        font-family: 'Font1';
        src: url(../../public/fonts/faken.ttf);
    }

    .title {
    font-family: 'Font1';
    font-size: 68px;
    color: #fff;
    margin-left: 10vw;
    }
    .title2{
        display: none;
    }
    .typewriter,
    .date,
    .content {
    margin-top: 40px; 
    }

    .typewriter {
    width: 400px;
    height: 50px;
    margin-top: 15vh;
    margin-left: 15vw;
    }

    .date {
    width: 25vw;
    height: 250px;
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    margin-left: auto;
    }

    .content {
    width: 90%;
    min-height: 100px;
    margin:40px auto;
    }
    .avatar{
        display: none;
    }
    @media (max-width: 500px) {
        .date{
            display: none;
        }
        .typewriter{
            margin: 200px 0 auto;
        }
        .hometop{
            width: 100%;
            display: flex;
            margin-top: -6vh;
            justify-content: center;
        }
        .avatar{
            display: block;
            margin-left: 5vw;
        }
        .title{
            display: none;
        }
        .title2{
            display: block;
            font-family: 'Font1';
            font-size: 68px;
            color: #fff;
            text-align: center;
        }
    }
</style>