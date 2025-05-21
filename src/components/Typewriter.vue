    <template>
    <div class="leleo-typewriter" style="text-align: center;">
        <span class="qm">“ </span>
        <span ref="text" class="msg"></span>
        <span class="qm"> ”</span>
    </div>
    </template>

    <script setup>
    import { ref, onMounted } from "vue";
    import TypeIt from 'typeit';

    
    const config = {
    typeWriterStrings: [ // 默认配置，可通过环境变量覆盖
        '去寻找属于你的25号底片吧！'
    ]
    };

    const text = ref(null);

    onMounted(() => {
    // 环境变量处理
    const configdata = import.meta.env.VITE_CONFIG 
        ? JSON.parse(import.meta.env.VITE_CONFIG) 
        : config;

    new TypeIt(text.value, {
        strings: configdata.typeWriterStrings,
        cursorChar: "<span class='cursorChar' style='font-size: 26px;color: var(--leleo-vcard-color);'>|<span>",
        speed: 150,
        lifeLike: true,
        cursor: true,
        breakLines: false,
        loop: true,
    }).go();
    });
    </script>

    <style>
    /* 合并后的样式 */
    .leleo-typewriter {
    --leleo-vcard-color: #fff; /* 定义颜色变量 */
    }

    .msg, .qm {
    color: var(--leleo-vcard-color);
    letter-spacing: 2px;
    font-family: Arial, sans-serif;
    font-size: 25px;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
    }

    .cursorChar {
    display: inline-block;
    margin-left: 2px;
    }

    @media screen and (min-width: 960px) and (max-width: 1200px) {
    .msg, .qm {
        font-size: 20px;
    }
    }

    @media (max-width: 960px) {
    .leleo-typewriter {
        min-height: 76px;   
    }
    .msg, .qm {
        font-size: 16px;
    }
    }
    </style>