<template>
    <div class="container">
        <div class="screen" ref="screen">
            <div class="top">
                <Top />
            </div>
            <div class="bottom">
                <div class="left">
                    <Tourist class="panel tourist"></Tourist>
                    <Sex class="panel sex"></Sex>
                    <Age class="panel age"></Age>
                </div>
                <div class="center">
                    <Map class="panel map"></Map>
                    <Line class="panel line"></Line>
                </div>
                <div class="right">
                    <Rank class="panel rank"></Rank>
                    <Year class="panel year"></Year>
                    <Counter class="panel counter"></Counter>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Top from './components/top/index.vue';
import Tourist from './components/tourist/index.vue';
import Sex from './components/sex/index.vue';
import Age from './components/age/index.vue';
import Map from './components/map/index.vue';
import Line from './components/line/index.vue';
import Rank from './components/rank/index.vue';
import Year from './components/year/index.vue';
import Counter from './components/couter/index.vue';

const screen = ref();
let resizeHandler: (() => void) | null = null;

function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return ww < wh ? ww : wh;
}

onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
    resizeHandler = () => {
        screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`;
    };
    window.addEventListener('resize', resizeHandler);
});

onUnmounted(() => {
    if (resizeHandler) {
        window.removeEventListener('resize', resizeHandler);
    }
});
</script>

<style scoped lang="scss">
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes glowPulse {
    0%, 100% { box-shadow: 0 0 10px rgba(0, 242, 255, 0.08), inset 0 0 10px rgba(0, 242, 255, 0.02); }
    50% { box-shadow: 0 0 20px rgba(0, 242, 255, 0.12), inset 0 0 20px rgba(0, 242, 255, 0.04); }
}

.container {
    width: 100vw;
    height: 100vh;
    background:
        radial-gradient(ellipse at 50% 40%, rgba(0, 80, 180, 0.08) 0%, transparent 60%),
        radial-gradient(ellipse at 50% 50%, rgba(0, 242, 255, 0.02) 0%, transparent 70%),
        #030512;
    background-size: cover;

    .screen {
        position: fixed;
        width: 1920px;
        height: 1080px;
        left: 50%;
        top: 50%;
        transform-origin: left top;
        overflow: hidden;

        .top {
            width: 100%;
            height: 48px;
        }

        .bottom {
            display: flex;
            gap: 10px;
            padding: 0 15px;
            height: calc(1080px - 48px);

            .left, .right {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .center {
                flex: 1.6;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }

            .panel {
                animation: fadeInUp 0.8s ease both;
                border: 1px solid rgba(0, 242, 255, 0.2);
                border-radius: 2px;
                background: rgba(5, 15, 40, 0.75);
                position: relative;
                overflow: hidden;
                animation-name: fadeInUp;
                animation-duration: 0.8s;
                animation-timing-function: ease;
                animation-fill-mode: both;

                &::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent 5%, #00f2ff, transparent 95%);
                    opacity: 0.7;
                }
            }

            .tourist { flex: 1.2; animation-delay: 0s; }
            .sex { flex: 1; animation-delay: 0.1s; }
            .age { flex: 1; animation-delay: 0.2s; }
            .map { flex: 4; animation-delay: 0.1s; }
            .line { flex: 1; animation-delay: 0.2s; }
            .rank { flex: 1.5; animation-delay: 0.05s; }
            .year { flex: 1; animation-delay: 0.15s; }
            .counter { flex: 1; animation-delay: 0.25s; }
        }
    }
}
</style>
