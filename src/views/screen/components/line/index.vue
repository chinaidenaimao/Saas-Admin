<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="line-box">
        <div class="header">
            <span class="title">未来30天游客量趋势图</span>
            <div class="line-bar"></div>
        </div>
        <div class="chart" ref="chartRef"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

const chartRef = ref();

const dates = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(2025, 4, 5 + i);
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
});

const data = [
    3200, 4500, 5800, 7200, 8100, 9500, 11000,
    12500, 13800, 15200, 14600, 13200, 11800, 10500,
    9800, 11200, 12800, 14500, 16200, 17800, 19500,
    18200, 16800, 15500, 14200, 16500, 18000, 19800,
    20500, 21000
];

onMounted(() => {
    const chart = echarts.init(chartRef.value);
    chart.setOption({
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(5, 15, 40, 0.9)',
            borderColor: 'rgba(0, 242, 255, 0.3)',
            textStyle: { color: '#fff' },
            formatter: (params: any) => {
                const p = params[0];
                return `${p.axisValue}<br/>访问量: <b>${(p.value / 10000).toFixed(1)}w</b>`;
            }
        },
        grid: {
            left: 50,
            right: 20,
            top: 10,
            bottom: 25
        },
        xAxis: {
            type: 'category',
            data: dates,
            boundaryGap: false,
            axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.2)' } },
            axisTick: { show: false },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: 10,
                interval: 4
            }
        },
        yAxis: {
            type: 'value',
            max: 21000,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: {
                color: 'rgba(255, 255, 255, 0.45)',
                fontSize: 10,
                formatter: (v: number) => v >= 10000 ? (v / 10000) + 'w' : v + ''
            },
            splitLine: {
                lineStyle: { color: 'rgba(0, 150, 255, 0.06)' }
            }
        },
        series: [{
            type: 'line',
            data: data,
            smooth: true,
            symbol: 'none',
            lineStyle: {
                color: '#ff7b1a',
                width: 2,
                shadowBlur: 8,
                shadowColor: 'rgba(255, 123, 26, 0.4)'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0, y: 0, x2: 0, y2: 1,
                    colorStops: [
                        { offset: 0, color: 'rgba(255, 123, 26, 0.35)' },
                        { offset: 0.7, color: 'rgba(255, 123, 26, 0.05)' },
                        { offset: 1, color: 'rgba(255, 123, 26, 0)' }
                    ]
                }
            },
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }]
    });
});
</script>

<style scoped lang="scss">
.line-box {
    display: flex;
    flex-direction: column;
    padding: 8px 16px;

    .header {
        .title {
            color: #00f2ff;
            font-size: 14px;
            font-weight: 500;
            letter-spacing: 1px;
        }

        .line-bar {
            width: 50px;
            height: 2px;
            background: linear-gradient(90deg, #00f2ff, transparent);
            margin-top: 4px;
            border-radius: 1px;
        }
    }

    .chart {
        flex: 1;
        min-height: 0;
    }
}
</style>
