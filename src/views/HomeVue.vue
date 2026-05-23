<template>
  <div class="home-container">
    <!-- 统计卡片 -->
    <el-row :gutter="20" class="stat-cards">
      <el-col :span="6" v-for="item in statList" :key="item.title">
        <div class="stat-card" :style="{ background: item.bg }">
          <div class="stat-card-body">
            <div class="stat-info">
              <span class="stat-title">{{ item.title }}</span>
              <span class="stat-value">{{ item.value }}</span>
            </div>
            <div class="stat-icon-wrap">
              <el-icon :size="48" color="rgba(255,255,255,0.85)"><component :is="item.icon" /></el-icon>
            </div>
          </div>
          <div class="stat-footer">
            <span>{{ item.footer }}</span>
          </div>
        </div>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card shadow="never" class="chart-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">商品类别销量</span>
              <el-tag size="small" effect="plain">本月</el-tag>
            </div>
          </template>
          <div ref="barChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" class="chart-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">商品属性占比</span>
              <el-tag size="small" effect="plain">本月</el-tag>
            </div>
          </template>
          <div ref="pieChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="chart-row">
      <el-col :span="12">
        <el-card shadow="never" class="chart-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">近7日订单趋势</span>
              <el-tag size="small" effect="plain">本周</el-tag>
            </div>
          </template>
          <div ref="lineChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="never" class="chart-card">
          <template #header>
            <div class="card-header">
              <span class="card-title">品牌销量 TOP10</span>
              <el-tag size="small" effect="plain">本月</el-tag>
            </div>
          </template>
          <div ref="rankChartRef" class="chart-container"></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, markRaw, } from 'vue'
import * as echarts from 'echarts'
import { User, ShoppingCart, UserFilled, Document } from '@element-plus/icons-vue'

const statList = reactive([
  {
    title: '用户总数',
    value: '1,280',
    icon: markRaw(User),
    bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    footer: '日新增 +120',
  },
  {
    title: '商品总数',
    value: '3,560',
    icon: markRaw(ShoppingCart),
    bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    footer: '日新增 +58',
  },
  {
    title: '在线人数',
    value: '862',
    icon: markRaw(UserFilled),
    bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    footer: '较昨日 +15%',
  },
  {
    title: '今日订单',
    value: '456',
    icon: markRaw(Document),
    bg: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    footer: '较昨日 +8%',
  },
])

const barChartRef = ref<HTMLElement>()
const pieChartRef = ref<HTMLElement>()
const lineChartRef = ref<HTMLElement>()
const rankChartRef = ref<HTMLElement>()

let barChart: echarts.ECharts
let pieChart: echarts.ECharts
let lineChart: echarts.ECharts
let rankChart: echarts.ECharts

const chartTheme = {
  textColor: '#8492a6',
  splitLineColor: '#f0f2f5',
}

// 柱状图 - 商品类别销量
const initBarChart = () => {
  barChart = echarts.init(barChartRef.value!)
  barChart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 0,
      textStyle: { color: '#333' },
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    },
    grid: { left: '2%', right: '4%', bottom: '2%', top: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      data: ['手机', '电脑', '服装', '食品', '家电', '美妆', '图书'],
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisTick: { show: false },
      axisLabel: { color: chartTheme.textColor, fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: chartTheme.splitLineColor, type: 'dashed' } },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: chartTheme.textColor, fontSize: 12 },
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        barWidth: '45%',
        data: [1200, 980, 1560, 870, 1120, 680, 450],
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#667eea' },
            { offset: 1, color: '#764ba2' },
          ]),
          borderRadius: [6, 6, 0, 0],
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#5a6fd6' },
              { offset: 1, color: '#6a4196' },
            ]),
          },
        },
      },
    ],
  })
}

// 饼图 - 商品属性占比
const initPieChart = () => {
  pieChart = echarts.init(pieChartRef.value!)
  pieChart.setOption({
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 0,
      textStyle: { color: '#333' },
      formatter: '{b}: {c} 件 ({d}%)',
    },
    legend: {
      bottom: '2%',
      left: 'center',
      textStyle: { color: chartTheme.textColor, fontSize: 12 },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
    },
    color: ['#667eea', '#43e97b', '#fa709a', '#fbc2eb', '#fee140'],
    series: [
      {
        name: '商品属性',
        type: 'pie',
        radius: ['42%', '68%'],
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 3 },
        label: { show: false },
        emphasis: {
          scale: true,
          scaleSize: 8,
          label: { show: true, fontSize: 16, fontWeight: 600 },
        },
        data: [
          { value: 1048, name: '电子产品' },
          { value: 735, name: '服装鞋帽' },
          { value: 580, name: '食品饮料' },
          { value: 484, name: '家居用品' },
          { value: 300, name: '美妆护肤' },
        ],
      },
    ],
  })
}

// 折线图 - 近7日订单趋势
const initLineChart = () => {
  lineChart = echarts.init(lineChartRef.value!)
  lineChart.setOption({
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 0,
      textStyle: { color: '#333' },
    },
    grid: { left: '2%', right: '4%', bottom: '2%', top: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisTick: { show: false },
      axisLabel: { color: chartTheme.textColor, fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: chartTheme.splitLineColor, type: 'dashed' } },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: chartTheme.textColor, fontSize: 12 },
    },
    series: [
      {
        name: '订单量',
        type: 'line',
        smooth: 0.4,
        symbol: 'circle',
        symbolSize: 6,
        data: [320, 332, 301, 334, 390, 430, 410],
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(102,126,234,0.25)' },
            { offset: 1, color: 'rgba(102,126,234,0.02)' },
          ]),
        },
        lineStyle: { color: '#667eea', width: 2.5 },
        itemStyle: { color: '#667eea', borderWidth: 2, borderColor: '#fff' },
      },
    ],
  })
}

// 条形图 - 品牌销量TOP10
const initRankChart = () => {
  rankChart = echarts.init(rankChartRef.value!)
  const brands = ['华为', '小米', '苹果', 'Nike', '海尔', '茅台', '阿迪达斯', '联想', '美的', '优衣库']
  const sales = [9800, 8600, 8200, 7500, 6800, 6200, 5800, 5200, 4800, 4200]
  rankChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      backgroundColor: 'rgba(255,255,255,0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 0,
      textStyle: { color: '#333' },
    },
    grid: { left: '2%', right: '12%', bottom: '2%', top: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      splitLine: { lineStyle: { color: chartTheme.splitLineColor, type: 'dashed' } },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: chartTheme.textColor, fontSize: 12 },
    },
    yAxis: {
      type: 'category',
      data: brands.reverse(),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#555', fontSize: 12 },
    },
    series: [
      {
        name: '销量',
        type: 'bar',
        barWidth: '55%',
        data: sales.reverse(),
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#43e97b' },
            { offset: 1, color: '#38f9d7' },
          ]),
          borderRadius: [0, 6, 6, 0],
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#38d16a' },
              { offset: 1, color: '#2de0c4' },
            ]),
          },
        },
        label: { show: true, position: 'right', color: '#8492a6', fontSize: 11 },
      },
    ],
  })
}

const handleResize = () => {
  barChart?.resize()
  pieChart?.resize()
  lineChart?.resize()
  rankChart?.resize()
}

onMounted(() => {
  initBarChart()
  initPieChart()
  initLineChart()
  initRankChart()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
  barChart?.dispose()
  pieChart?.dispose()
  lineChart?.dispose()
  rankChart?.dispose()
})
</script>

<style scoped>
.home-container {
  padding: 16px;
  background: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.stat-cards {
  margin-bottom: 20px;
}

.stat-card {
  border-radius: 12px;
  padding: 24px 20px 16px;
  color: #fff;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
}

.stat-card::after {
  content: '';
  position: absolute;
  top: -30%;
  right: -20%;
  width: 120px;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.stat-card-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.stat-info {
  display: flex;
  flex-direction: column;
}

.stat-title {
  font-size: 13px;
  opacity: 0.85;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.stat-value {
  font-size: 32px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.stat-icon-wrap {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.18);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-footer {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 12px;
  opacity: 0.85;
}

.chart-row {
  margin-bottom: 20px;
}

.chart-card {
  border-radius: 12px;
  border: none;
}

.chart-card :deep(.el-card__header) {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f2f5;
}

.chart-card :deep(.el-card__body) {
  padding: 12px 16px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #303133;
}

.chart-container {
  width: 100%;
  height: 320px;
}
</style>
