<template>
  <div class="container">
    <div class="cards-grid">
      <div 
        v-for="(card, index) in sortedCards"
        :key="index"
        class="card"
        :class="{ 'expanded': card.expanded }"
      >
        <div class="image-container">
          <img 
            :src="card.img" 
            :alt="card.title"
            class="card-image"
          />
          <!-- <div class="graduation-ribbon" v-if="card.title.includes('毕业照')">
            <span>🎓 毕业纪念</span>
          </div> -->
        </div>
        
        <div class="card-content">
          <h3 class="card-title">{{ card.title }}</h3>
          <p class="card-subtitle">{{ card.subtitle }}</p>
          
          <div class="card-actions">
            <!-- <router-link 
              :to="{name:'detail'}"
              class="detail-btn"
            >
              {{ card.go }}
            </router-link> -->
            <!-- <span class="detail-btn" @click="openPopup($event)">{{ card.go }}</span> -->
            <button class="detail-btn" @click="openPopup($event,card.url,card.imageCount)">{{ card.go }}</button>
            <button 
              class="toggle-btn"
              @click="toggleCard(card)"
              :aria-label="card.expanded ? '收起详情' : '展开详情'"
            >
              {{ card.expanded ? '▲' : '▼' }}
            </button>
          </div>

          <transition name="expand">
            <div 
              v-show="card.expanded"
              class="card-text"
            >
              {{ card.text }}
              <!-- <div class="photo-meta">
                <span>📸 拍摄日期: {{ card.subtitle }}</span>
                <span>📍 拍摄地点: 校园草地</span>
              </div> -->
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface CardItem {
  go: string
  img: string
  title: string
  subtitle:string
  text: string
  url: string
  expanded: boolean
  imageCount:number
}

const cards = ref<CardItem[]>([
  {
    go: "👉 点击查看详情",
    img: "/img/学姐/5.jpg",
    title: "毕业照·学姐",
    subtitle: "2023-05-11",
    text: "这是我第一次帮别人拍照，给朋友的学姐跟拍的毕业照，相机甚至都是借舍友的，但这次拍照也为我那年暑假攒钱买相机埋下了种子",
    url: "学姐",
    expanded: false,
    imageCount:9
  },
  {
    go: "👉 点击查看详情",
    img: "/img/罗淋星/9.webp",
    title: "麓湖公园·kk星",
    subtitle: "2023-10-14",
    text: "这是我买相机后第一次给人拍照，模特也只能让好朋友来当了哈哈哈",
    url: "罗淋星",
    expanded: false,
    imageCount:9
  },
  {
    go: "👉 点击查看详情",
    img: "/img/NN1/13.webp",
    title: "华师异木棉·互勉",
    subtitle: "2023-11-17",
    text: "在网上找了个互勉的摄影师，这天约好一起去华师拍异木棉花",
    url: "NN1",
    expanded: false,
    imageCount:13
  },
  {
    go: "👉 点击查看详情",
    img: "/img/NN2/6.webp",
    title: "云台花园·互勉",
    subtitle: "2023-11-18",
    text: "第一天拍的效果大家都比较满意，于是回去之后马上约了第二天的拍摄",
    url: "NN2",
    expanded: false,
    imageCount:13
  },
  {
    go: "👉 点击查看详情",
    img: "/img/lyz1/5.jpg",
    title: "Birthday·伦琴",
    subtitle: "2024-03-24",
    text: "这天是我朋友生日的前一天，让我给她拍个好看的照片过生日，但无奈景太小，大部分照片都重复了",
    url: "lyz1",
    expanded: false,
    imageCount:6
  },
  {
    go: "👉 点击查看详情",
    img: "/img/lyz2/7.jpg",
    title: "三角梅·伦琴",
    subtitle: "2024-04-13",
    text: "某天在网上刷到学校附近有一片花墙，于是就去了",
    url: "lyz2",
    expanded: false,
    imageCount:10
  },
  {
    go: "👉 点击查看详情",
    img: "/img/lyz3/3.jpg",
    title: "自驾深圳·伦琴",
    subtitle: "2024-10-07",
    text: "这天我们自驾去了深圳的蓝宝石海滩，景色真的很不错",
    url: "lyz3",
    expanded: false,
    imageCount:13
  },
  {
    go: "👉 点击查看详情",
    img: "/img/罗淋星2/5.jpg",
    title: "毕业照·kk星",
    subtitle: "2024-11-08",
    text: "终于到这一天了，必然不让兄弟丢分",
    url: "罗淋星2",
    expanded: false,
    imageCount:6
  },
  // 其他卡片数据...
])

// 排序逻辑
const sortedCards = computed(() => {
  return [...cards.value].sort((a, b) =>
    new Date(a.subtitle).getTime() - new Date(b.subtitle).getTime()
  )
})


const toggleCard = (targetCard: CardItem) => {
  cards.value = cards.value.map(card => ({
    ...card,
    expanded: card === targetCard ? !card.expanded : false
  }))
}

// const toggleCard = (targetCard: CardItem) => {
//   cards.value = cards.value.map(card => ({
//     ...card,
//     expanded: card.id === targetCard.id ? !card.expanded : false
//   }))
// }

import { useRouter } from 'vue-router'
const router = useRouter()
const openPopup = (e: MouseEvent, folder: string,num:number) => {
  const target = e.target as HTMLElement 
  const rect = target.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2

  router.push({
    name: 'detail', // 确保 name 与路由配置一致
    query: { x, y, folder, num}
  })
}

</script>

<style scoped>

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  /* max-width: 1200px; */
  margin: 0 auto;
  /* padding-bottom: 2rem; */
  /* width: 100%;
  box-sizing: border-box;  */

  grid-auto-flow: dense;
  align-items: start;
}

.card {
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 12px;
  /* overflow: hidden; */
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  position: relative;
  /* width: 250px; */
  width: 100%; /* 占满 cell */
  min-width: 220px;
  max-width: 100%;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
}

.image-container {
  position: relative;
  padding-top: 56.25%;
}

.card-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.95;
  border-radius: 12px 12px 0 0;
}

.graduation-ribbon {
  position: absolute;
  top: 10px;
  right: -30px;
  background: #3498db;
  color: white;
  padding: 5px 20px;
  transform: rotate(45deg);
  font-size: 0.8rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.card-content {
  padding: 1rem;
  color: #e2e8f0;
  margin-top: -20px;
}

.card-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #fff;
  font-weight: 600;
}

.card-subtitle {
  color: #94a3b8;
  font-size: 0.8rem;
  margin-bottom: 0;
}

.card-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
}

.detail-btn {
  color: #fff;
  text-decoration: none;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  background: transparent;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  font: inherit;
}

.detail-btn:hover {
  color: #fff;
  transform: translateX(5px);
}

.toggle-btn {
  background: rgba(51, 153, 255, 0);
  border: 1px solid #fff;
  color: #fff;
  cursor: pointer;
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(51, 153, 255, 0.2);
}

.card-text {
  padding: 1rem 0;
  border-top: 1px solid rgba(255,255,255,0.1);
  font-size: 0.95rem;
  line-height: 1.7;
  color: #cbd5e1;
}

.photo-meta {
  margin-top: 1rem;
  padding: 0.8rem;
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
  font-size: 0.85rem;
  color: #94a3b8;
}

.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }
  
  .card-title {
    font-size: 1.1rem;
  }
  
  .graduation-ribbon {
    font-size: 0.7rem;
    right: -35px;
  }
}

/* 自定义滚动条 */
/* ::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0,0,0,0.1);
}

::-webkit-scrollbar-thumb {
  background: #3498db;
  border-radius: 4px;
} */
</style>