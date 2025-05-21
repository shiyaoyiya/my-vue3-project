<!-- src/views/PopupView.vue -->
<template>
  <div class="overlay" @click="handleOverlayClick">
  <div 
    class="popup"
    :style="popupStyle"
    ref="popupRef"
  >
    <Swiper
      v-if="images.length"
      :loop="true"
      :spaceBetween="10"
      :slides-per-view="1"
      :modules="[Pagination, Navigation, Keyboard, Mousewheel]"
      :pagination="{ clickable: true }"
      :navigation="true"
      :keyboard="{ enabled: true }"
      :mousewheel="{ forceToAxis: true}"
      class="swiper-container"
    >
      <SwiperSlide v-for="(src, index) in images" :key="index">
        <img :src="src" class="swiper-image" />
      </SwiperSlide>
    </Swiper>

    <p v-else>暂无图片</p>
  </div>
</div>

</template>

<script setup lang="ts">
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Navigation, Keyboard, Mousewheel } from 'swiper/modules'


const route = useRoute()
const router = useRouter()

// 初始位置参数
const startX = Number(route.query.x || window.innerWidth / 2)
const startY = Number(route.query.y || window.innerHeight / 2)
const folder = typeof route.query.folder === 'string' ? route.query.folder : ''
const imageCount = Number(route.query.num)

const images = ref<string[]>([])
const swiperRef = ref<any>(null)

const popupRef = ref(null)
const left = ref(startX)
const top = ref(startY)
const scale = ref(0.1)
const opacity = ref(0)

const targetLeft = computed(() => window.innerWidth / 2)
const targetTop = computed(() => window.innerHeight / 2)

const popupStyle = computed(() => ({
  left: `${left.value}px`,
  top: `${top.value}px`,
  transform: `translate(-50%, -50%) scale(${scale.value})`,
  opacity: opacity.value,
}))

const loadImage = (folder: string, index: number): Promise<string> => {
  return new Promise((resolve) => {
    const tryFormats = ['webp', 'jpg', 'jpeg', 'png']
    const tryNext = (i: number) => {
      if (i >= tryFormats.length) return resolve('')
      const ext = tryFormats[i]
      const path = `/img/${folder}/${index}.${ext}`
      const img = new Image()
      img.onload = () => resolve(path)
      img.onerror = () => tryNext(i + 1)
      img.src = path
    }
    tryNext(0)
  })
}

onMounted(async () => {
  for (let i = 1; i <= imageCount; i++) {
    const src = await loadImage(folder, i)
    if (src) images.value.push(src)
  }

  nextTick(() => {
    opacity.value = 1
    scale.value = 1
    left.value = targetLeft.value
    top.value = targetTop.value
  })
})

const close = () => {
  router.back()
}

// 滚轮切换图片
let scrollTimeout: ReturnType<typeof setTimeout> | null = null

const handleWheel = (e: WheelEvent) => {
  // 节流，避免滚动太快导致疯狂切图
  if (scrollTimeout) return
  scrollTimeout = setTimeout(() => {
    scrollTimeout = null
  }, 400)

  if (!swiperRef.value) return
  const swiper = swiperRef.value.swiper

  if (e.deltaY > 0) {
    swiper.slideNext()
  } else if (e.deltaY < 0) {
    swiper.slidePrev()
  }
}

const handleOverlayClick = (e: MouseEvent) => {
  const popupEl = popupRef.value as HTMLElement | null
  const target = e.target as HTMLElement

  // 如果点击的是 popup 里的 pagination、navigation 按钮等，阻止关闭
  if (
    popupEl &&
    (popupEl.contains(target) &&
    (target.closest('.swiper-pagination') ||
     target.closest('.swiper-button-next') ||
     target.closest('.swiper-button-prev')))
  ) {
    return
  }

  close()
}

</script>

<style scoped>
.overlay {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  position: fixed;
  background: transparent;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  min-width: 300px;
  max-width: 100vw;
}

.swiper-image {
  width: auto;
  height: 90vh;
  object-fit: contain;
  border-radius: 8px;
  display: block;
}

::v-deep(.swiper-pagination-bullet) {
  background: rgba(255,255,255, 0.3);
  opacity: 1;
  transition: 0.3s;
}

::v-deep(.swiper-pagination-bullet-active) {
  background: #fff;
}



::v-deep(.swiper-slide) {
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width:500px) {
  .overlay {
  position: fixed;
  inset: 0;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  /* position: fixed;
  background: transparent;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  transition: all 0.4s ease;
  max-width: 500px; */

    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    padding: 0;
    margin: 0;
}

.swiper-image {
  /* width: 100vw;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
  display: block; */

    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    display: block;
}
}

</style>
