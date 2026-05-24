<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="map-box">
        <div class="map-chart" ref="mapRef"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import chinaJSON from './china.json';

const mapRef = ref();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
echarts.registerMap('china', chinaJSON as any);

onMounted(() => {
    const chart = echarts.init(mapRef.value);

    // 景区散点数据
    const scenicSpots = [
        { name: '故宫', coord: [116.40, 39.92] },
        { name: '张家界', coord: [110.48, 29.12] },
        { name: '九寨沟', coord: [103.92, 33.26] },
        { name: '黄山', coord: [118.17, 30.13] },
        { name: '峨眉山', coord: [103.48, 29.59] }
    ];

    // 飞线数据
    const flyLines = [
        { from: [116.40, 39.92], to: [104.07, 30.67] },  // 北京 → 成都
        { from: [116.40, 39.92], to: [113.26, 23.13] },  // 北京 → 广州
        { from: [116.40, 39.92], to: [121.47, 31.23] }   // 北京 → 上海
    ];

    chart.setOption({
        geo: {
            map: 'china',
            roam: false,
            zoom: 1.2,
            center: [104, 36],
            label: {
                show: true,
                color: 'rgba(255, 255, 255, 0.4)',
                fontSize: 10
            },
            itemStyle: {
                areaColor: 'rgba(6, 30, 80, 0.6)',
                borderColor: 'rgba(0, 242, 255, 0.25)',
                borderWidth: 1
            },
            emphasis: {
                itemStyle: {
                    areaColor: 'rgba(0, 120, 255, 0.4)',
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 242, 255, 0.3)'
                },
                label: {
                    color: '#00f2ff',
                    fontSize: 12
                }
            },
            select: { disabled: true }
        },
        series: [
            // 景区涟漪散点
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                data: scenicSpots.map(s => ({
                    name: s.name,
                    value: [...s.coord, 100]
                })),
                symbolSize: 10,
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke',
                    scale: 4,
                    period: 4
                },
                itemStyle: {
                    color: '#00f2ff',
                    shadowBlur: 10,
                    shadowColor: 'rgba(0, 242, 255, 0.6)'
                },
                label: {
                    show: true,
                    position: 'right',
                    formatter: '{b}',
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: 11
                },
                zlevel: 1
            },
            // 飞线
            {
                type: 'lines',
                coordinateSystem: 'geo',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 4,
                    trailLength: 0.4,
                    symbol: 'arrow',
                    symbolSize: 6,
                    color: '#00f2ff'
                },
                lineStyle: {
                    color: {
                        type: 'linear',
                        x: 0, y: 0, x2: 1, y2: 0,
                        colorStops: [
                            { offset: 0, color: 'rgba(0, 242, 255, 0.1)' },
                            { offset: 0.5, color: 'rgba(0, 242, 255, 0.6)' },
                            { offset: 1, color: 'rgba(0, 242, 255, 0.1)' }
                        ]
                    },
                    width: 2,
                    curveness: 0.3,
                    opacity: 0.6
                },
                data: flyLines.map(l => ({
                    coords: [l.from, l.to]
                }))
            }
        ],
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
.map-box {
    width: 100%;
    height: 100%;

    .map-chart {
        width: 100%;
        height: 100%;
    }
}
</style>
