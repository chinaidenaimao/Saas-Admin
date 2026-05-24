<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="age-box">
        <div class="header">
            <span class="title">年龄比例</span>
            <div class="line"></div>
        </div>
        <div class="chart" ref="chartRef"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, onMounted } from 'vue';

const chartRef = ref();

onMounted(() => {
    const chart = echarts.init(chartRef.value);
    chart.setOption({
        color: ['#00f2ff', '#1890ff', '#ff7b1a', '#ff4da6', '#a855f7'],
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(5, 15, 40, 0.9)',
            borderColor: 'rgba(0, 242, 255, 0.3)',
            textStyle: { color: '#fff' },
            formatter: '{b}: {c}%'
        },
        series: [{
            type: 'pie',
            radius: '65%',
            center: ['50%', '55%'],
            label: {
                show: true,
                formatter: '{b}\n{d}%',
                color: 'rgba(255,255,255,0.75)',
                fontSize: 11,
                lineHeight: 16
            },
            labelLine: {
                show: true,
                lineStyle: { color: 'rgba(255,255,255,0.2)' }
            },
            itemStyle: {
                borderColor: 'rgba(5, 15, 40, 0.8)',
                borderWidth: 2,
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.3)'
            },
            emphasis: {
                itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 242, 255, 0.4)'
                },
                label: { fontSize: 13, fontWeight: 'bold' }
            },
            data: [
                { value: 15, name: '18岁以下' },
                { value: 28, name: '18-25岁' },
                { value: 32, name: '26-35岁' },
                { value: 18, name: '36-45岁' },
                { value: 7, name: '46岁以上' }
            ],
            animationType: 'scale',
            animationDuration: 1200,
            animationEasing: 'cubicOut'
        }]
    });
});
</script>

<style scoped lang="scss">
.age-box {
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

    .chart {
        flex: 1;
        min-height: 0;
    }
}
</style>
