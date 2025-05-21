<template>
  <div class="avatar-wrapper" @mouseenter="hover = true" @mouseleave="hover = false">
    <div :class="['avatar', { playing }]">
      <img :src="avatarUrl" alt="avatar" />

      <div v-if="hover" class="overlay">
        <div class="track-title">{{ currentTrack.title }}</div>

        <div class="button-group">
          <button @click="prevTrack">⏮</button>
          <button @click="togglePlay">{{ playing ? '⏸' : '▶' }}</button>
          <button @click="nextTrack">⏭</button>
        </div>

        <div class="track-artist">{{ currentTrack.artist }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// 本地头像路径（放在 public 目录或 assets 中）
const avatarUrl = '/avatar/avatar.jpg'

const hover = ref(false)
const playing = ref(false)
const currentTrackIndex = ref(0)

const tracks = [
  {
    title: '离歌',
    artist: '信乐团',
    src: '/music/信乐团_离歌.flac'
  },
  {
    title: '我还想她',
    artist: '林俊杰',
    src: '/music/林俊杰_我还想她.flac'
  },
  {
    title: '倒带',
    artist: '蔡依林',
    src: '/music/蔡依林_倒带.flac'
  }
]

const currentTrack = computed(() => tracks[currentTrackIndex.value])

const audio = new Audio()

function loadTrack(index) {
  audio.src = tracks[index].src
  audio.load()
}

function togglePlay() {
  if (playing.value) {
    audio.pause()
  } else {
    audio.play()
  }
  playing.value = !playing.value
}

function prevTrack() {
  currentTrackIndex.value =
    (currentTrackIndex.value - 1 + tracks.length) % tracks.length
  changeTrack()
}

function nextTrack() {
  currentTrackIndex.value = (currentTrackIndex.value + 1) % tracks.length
  changeTrack()
}

function changeTrack() {
  loadTrack(currentTrackIndex.value)
  audio.play()
  playing.value = true
}

onMounted(() => {
  loadTrack(currentTrackIndex.value)

  audio.addEventListener('ended', () => {
    nextTrack()
  })
})

onBeforeUnmount(() => {
  audio.pause()
  audio.src = ''
})
</script>

<style scoped>
.avatar-wrapper {
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  cursor: pointer;
  margin-top: 5vh;
  margin-left: 70px;
}

.avatar {
  width: 100%;
  height: 100%;
  position: relative;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar.playing img {
  animation: spin 4s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 15, 15, 0.55);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  padding: 12px;
  box-sizing: border-box;
  border-radius: 50%;
}

.track-title {
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
}

.track-artist {
  font-size: 12px;
  margin-top: 10px;
  text-align: center;
  opacity: 0.8;
}

.button-group {
  display: flex;
  gap: 12px;
}

.button-group button {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  font-size: 16px;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.button-group button:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
</style>
