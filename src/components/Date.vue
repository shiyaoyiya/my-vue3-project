    <template>
    <div class="datetime-container">
        <div class="time-display">{{ time }}</div>
        <div class="date-display">{{ date }}</div>
    </div>
    </template>

    <script setup>
    import { ref, onMounted, onBeforeUnmount } from 'vue'

    const time = ref('')
    const date = ref('')

    const updateDateTime = () => {
    const now = new Date()
    
    // 格式化时间 HH:MM:SS
    time.value = now.toLocaleTimeString('en-GB', { hour12: false })
    
    // 格式化日期 YYYY年 MM月 DD日 星期X
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    date.value = `${now.getFullYear()}年 ${String(now.getMonth() + 1).padStart(2, '0')}月 ${String(now.getDate()).padStart(2, '0')}日 ${weekdays[now.getDay()]}`
    }

    onMounted(() => {
    updateDateTime()
    const timer = setInterval(updateDateTime, 1000)
    onBeforeUnmount(() => clearInterval(timer))
    })
    </script>

    <style scoped>

    @font-face {
        font-family: 'Font2';
        src: url(../../public/fonts/Digital-Play-Italic-St-1.ttf);
    }
    .datetime-container {
    --text-color: #ffffff;
    --time-size: clamp(2.5rem, 5vw, 3.5rem); /* 时间数字 */
    --date-size: clamp(0.75rem, 1.5vw, 1rem); /* 日期文字 */
    /* background: linear-gradient(135deg, #2b1b17 0%, #0a0a0a 100%); */

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* min-height: 100vh; */
    background: var(--background);
    color: var(--text-color);
    text-align: center;
    user-select: none;
    width: 25vw;
    height: 80px;
    }

    .time-display {
    font-family: 'Font2';
    font-size: 30px;
    font-weight: 300;
    letter-spacing: 3px;
    margin-bottom: 10px;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
    line-height: 1; 
    }

    .date-display {
    font-family: '黑体';
    font-size: 20px;
    opacity: 0.5;
    font-weight: bold;
    line-height: 1;  
    }

    /* 优化数字间距 */
    .time-display,
    .date-display {
    font-variant-numeric: tabular-nums;
    }

    /* 移动端优化 */
    @media (max-width: 480px) {
    .datetime-container {
        padding: 1rem;
    }
    }
    </style>