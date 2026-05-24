<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="year-box">
        <div class="header">
            <span class="title">年度游客量对比</span>
            <div class="line"></div>
        </div>
        <div class="chart" ref="chartRef"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

const chartRef = ref();
const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

onMounted(() => {
    const chart = echarts.init(chartRef.value);
    chart.setOption({
        color: ['#ff7b1a', '#1890ff', '#ff4da6'],
        tooltip: {
            trigger: 'axis',
            backgroundColor: 'rgba(5, 15, 40, 0.9)',
            borderColor: 'rgba(0, 242, 255, 0.3)',
            textStyle: { color: '#fff' }
        },
        legend: {
            top: 0,
            right: 10,
            itemWidth: 12,
            itemHeight: 8,
            textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 11 }
        },
        grid: {
            left: 45,
            right: 10,
            top: 25,
            bottom: 20
        },
        xAxis: {
            type: 'category',
            data: months,
            axisLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.2)' } },
            axisTick: { show: false },
            axisLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 10 }
        },
        yAxis: {
            type: 'value',
            max: 12000,
            axisLine: { show: false },
            axisTick: { show: false },
            axisLabel: { color: 'rgba(255,255,255,0.45)', fontSize: 10 },
            splitLine: { lineStyle: { color: 'rgba(0, 150, 255, 0.06)' } }
        },
        series: [
            {
                name: '2021',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: [2200, 2800, 3500, 4800, 6200, 7800, 9500, 10200, 8600, 6500, 4200, 3100],
                lineStyle: { width: 2, color: '#ff7b1a' },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(255, 123, 26, 0.25)' },
                            { offset: 1, color: 'rgba(255, 123, 26, 0)' }
                        ]
                    }
                }
            },
            {
                name: '2022',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: [1800, 2200, 3200, 4500, 5800, 7200, 8800, 9500, 7800, 5800, 3800, 2600],
                lineStyle: { width: 2, color: '#1890ff' },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(24, 144, 255, 0.25)' },
                            { offset: 1, color: 'rgba(24, 144, 255, 0)' }
                        ]
                    }
                }
            },
            {
                name: '2023',
                type: 'line',
                smooth: true,
                symbol: 'none',
                data: [3200, 3800, 5200, 6800, 8500, 10200, 11500, 11800, 9800, 7500, 5200, 4200],
                lineStyle: { width: 2, color: '#ff4da6' },
                areaStyle: {
                    color: {
                        type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
                        colorStops: [
                            { offset: 0, color: 'rgba(255, 77, 166, 0.25)' },
                            { offset: 1, color: 'rgba(255, 77, 166, 0)' }
                        ]
                    }
                }
            }
        ],
        animationDuration: 1500,
        animationEasing: 'cubicOut'
    });
});
</script>

<style scoped lang="scss">
.year-box {
    display: flex;
    flex-direction: column;
    padding: 10px 16px;

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

    .chart {
        flex: 1;
        min-height: 0;
    }
}
</style>
