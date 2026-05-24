<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="counter-box">
        <div class="header">
            <span class="title">预约渠道数据统计</span>
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
        color: ['#00f2ff', '#1890ff', '#ff7b1a', '#a855f7', '#00e096'],
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(5, 15, 40, 0.9)',
            borderColor: 'rgba(0, 242, 255, 0.3)',
            textStyle: { color: '#fff' },
            formatter: '{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: 10,
            top: 'center',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 12,
            textStyle: {
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: 11
            },
            formatter: (name: string) => {
                const data: Record<string, number> = {
                    '智慧文旅平台': 40,
                    '携程': 30,
                    '美团': 15,
                    '其他': 10,
                    '官网': 5
                };
                return `${name}  ${data[name]}%`;
            }
        },
        series: [{
            type: 'pie',
            radius: ['40%', '68%'],
            center: ['35%', '50%'],
            avoidLabelOverlap: false,
            label: {
                show: false
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#fff'
                },
                itemStyle: {
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 242, 255, 0.4)'
                }
            },
            labelLine: { show: false },
            itemStyle: {
                borderColor: 'rgba(5, 15, 40, 0.8)',
                borderWidth: 2
            },
            data: [
                { value: 40, name: '智慧文旅平台' },
                { value: 30, name: '携程' },
                { value: 15, name: '美团' },
                { value: 10, name: '其他' },
                { value: 5, name: '官网' }
            ],
            animationType: 'scale',
            animationDuration: 1200,
            animationEasing: 'cubicOut'
        }],
        graphic: [{
            type: 'text',
            left: '28%',
            top: 'center',
            style: {
                text: '预约渠道',
                fill: 'rgba(255, 255, 255, 0.5)',
                fontSize: 13,
                textAlign: 'center'
            }
        }]
    });
});
</script>

<style scoped lang="scss">
.counter-box {
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
