<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="top">
        <div class="left">
            <span class="lbtn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <div class="title">智慧旅游可视化大数据展示平台</div>
        </div>
        <div class="right">
            <span class="rbtn">统计报告</span>
            <span class="time">{{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const $router = useRouter();
const time = ref('');
let timer = 0;

const goHome = () => {
    $router.push('/home');
};

const updateTime = () => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    const h = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const s = String(now.getSeconds()).padStart(2, '0');
    time.value = `${y}-${m}-${d} ${h}:${min}:${s}`;
};

onMounted(() => {
    updateTime();
    timer = window.setInterval(updateTime, 1000);
});

onBeforeUnmount(() => {
    clearInterval(timer);
});
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
    background: url(../../images/dataScreen-header-center-bg.png) no-repeat center bottom;
    background-size: 100% auto;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 10%;
        right: 10%;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(0, 242, 255, 0.4), transparent);
    }

    .left {
        flex: 1.2;
        display: flex;
        justify-content: flex-end;
        padding-right: 20px;

        .lbtn {
            padding: 4px 20px;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            color: #00f2ff;
            font-size: 14px;
            cursor: pointer;
            transition: text-shadow 0.3s;
            letter-spacing: 2px;

            &:hover {
                text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
            }
        }
    }

    .center {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;

        .title {
            font-size: 28px;
            font-weight: 700;
            color: #ffffff;
            letter-spacing: 8px;
            text-shadow:
                0 0 10px rgba(0, 242, 255, 0.3),
                0 0 30px rgba(0, 242, 255, 0.1);
            font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
            white-space: nowrap;
        }
    }

    .right {
        flex: 1.2;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 15px;
        padding-right: 20px;

        .rbtn {
            padding: 4px 16px;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            color: #00f2ff;
            font-size: 14px;
            cursor: pointer;
            transition: text-shadow 0.3s;
            letter-spacing: 2px;

            &:hover {
                text-shadow: 0 0 10px rgba(0, 242, 255, 0.5);
            }
        }

        .time {
            color: rgba(255, 255, 255, 0.75);
            font-size: 14px;
            font-family: 'Courier New', monospace;
        }
    }
}
</style>
