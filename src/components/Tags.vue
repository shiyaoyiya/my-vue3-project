    <template>
    <div class="window-frame">
        <!-- 标签区域 -->
        <div class="tags-section">
        <h2>Tags</h2>
        <div class="tags-container">
            <div 
            v-for="(tag, index) in tags" 
            :key="index" 
            class="tag-bubble"
            >
            {{ tag }}
            </div>
        </div>
        </div>

        <!-- 技能进度条区域 -->
        <div class="skills-section">
        <h2>Skills</h2>
        <div 
            v-for="(skill, index) in skills" 
            :key="index" 
            class="skill-item"
        >
            <span class="skill-name">{{ skill.name }}</span>
            <div class="progress-bar">
            <div 
                class="progress-fill" 
                :style="{ width: skill.proficiency + '%' }"
            ></div>
            </div>
        </div>
        </div>
    </div>
    </template>

    <script setup>
    import { reactive } from 'vue';

    const state = reactive({
    tags: [
        '乐于助人',
        '团队协作',
        '快速学习',
        '问题解决',
        '沟通能力',
        '时间管理',
        '创新思维',
        '善解人意'
    ],
    skills: [
        { name: 'Vue.js', proficiency: 85 },
        { name: 'JavaScript', proficiency: 90 },
        { name: 'Docker', proficiency: 75 },
        { name: 'Node.js', proficiency: 70 },
        { name: 'linux', proficiency: 88 },
        { name: 'MySQL', proficiency: 85 },
        { name: 'C语言', proficiency: 95 }
    ]
    });

    const { tags, skills } = state;
    </script>

    <style scoped>
    .window-frame {
    width: 300px;
    font-family: Arial, sans-serif;
    color: white;
    }

    .tags-section,.skills-section{
        background-color: rgba(255,255,255,0.1);
        backdrop-filter: blur(5px);
        padding:1vh;
        border-radius: 20px;
        margin-bottom: 5vh;
    }
    .tags-section h2,
    .skills-section h2 {
    text-align: center;
    margin-bottom: 15px;
    color: #ecf0f1;
    
    }

    .tags-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-bottom: 2vh;
    }

    .tag-bubble {
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    padding: 6px 12px;
    border-radius: 15px;
    font-size: 0.9em;
    transition: all 0.3s ease;
    }

    .skill-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    }

    .skill-name {
    /* width: 40%; */
    font-size: 0.9em;
    background-color: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    padding: 6px 12px;
    border-radius: 15px;
    }

    .progress-bar {
    width: 55%;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    overflow: hidden;
    }

    .progress-fill {
    height: 100%;
    background-color: #42b883;
    border-radius: 5px;
    transition: width 0.5s ease;
    }

    /* 夜间模式效果 
    .window-frame {
    background: linear-gradient(
        to bottom,
        #2c3e50 0%,
        #3498db 100%
    );
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
    }

    .tag-bubble:hover {
    transform: translateY(-2px);
    background-color: rgba(255, 255, 255, 0.15);
    }*/
    </style>