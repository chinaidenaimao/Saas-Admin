<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="tourist-box">
        <div class="header">
            <span class="title">实时游客统计</span>
            <div class="line"></div>
        </div>
        <div class="flipper">
            <span class="digit" v-for="(char, i) in digits" :key="i">{{ char }}</span>
        </div>
        <div class="chart-wrapper">
            <div class="chart" ref="chartRef"></div>
            <div class="chart-label">可预约总量</div>
            <div class="chart-total">999999人</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

const chartRef = ref();
const digits = '216908人'.split('');

onMounted(() => {
    const chart = echarts.init(chartRef.value);
    chart.setOption({
        series: [{
            type: 'pie',
            radius: ['55%', '75%'],
            center: ['50%', '50%'],
            startAngle: 90,
            label: { show: false },
            data: [
                {
                    value: 60,
                    name: '已预约',
                    itemStyle: {
                        color: {
                            type: 'linear',
                            x: 0, y: 0, x2: 1, y2: 0,
                            colorStops: [
                                { offset: 0, color: '#00f2ff' },
                                { offset: 1, color: '#1890ff' }
                            ]
                        },
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 242, 255, 0.4)'
                    }
                },
                {
                    value: 40,
                    name: '剩余',
                    itemStyle: {
                        color: 'rgba(0, 120, 255, 0.1)',
                        borderColor: 'transparent'
                    }
                }
            ],
            animation: true,
            animationDuration: 1500,
            animationEasing: 'cubicOut'
        }],
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(5, 15, 40, 0.9)',
            borderColor: 'rgba(0, 242, 255, 0.3)',
            textStyle: { color: '#fff' }
        }
    });
});
</script>

<style scoped lang="scss">
.tourist-box {
    display: flex;
    flex-direction: column;
    padding: 12px 16px;

    .header {
        .title {
            color: #00f2ff;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: 2px;
        }

        .line {
            width: 60px;
            height: 2px;
            background: linear-gradient(90deg, #00f2ff, transparent);
            margin-top: 6px;
            border-radius: 1px;
        }
    }

    .flipper {
        display: flex;
        justify-content: center;
        gap: 4px;
        margin-top: 12px;

        .digit {
            width: 36px;
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            color: #00f2ff;
            font-size: 24px;
            font-weight: 700;
            font-family: 'Courier New', monospace;
            text-shadow: 0 0 10px rgba(0, 242, 255, 0.6);
        }
    }

    .chart-wrapper {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;

        .chart {
            width: 100%;
            height: 160px;
        }

        .chart-label {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -70%);
            color: rgba(255, 255, 255, 0.55);
            font-size: 12px;
            pointer-events: none;
        }

        .chart-total {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -20%);
            color: #00f2ff;
            font-size: 18px;
            font-weight: 700;
            pointer-events: none;
            text-shadow: 0 0 8px rgba(0, 242, 255, 0.4);
        }
    }
}
</style>
