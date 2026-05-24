<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="rank-box">
        <div class="header">
            <span class="title">热门景区排行</span>
            <div class="line"></div>
        </div>
        <div class="table-header">
            <span class="col-rank">排名</span>
            <span class="col-name">景区</span>
            <span class="col-bar">预约数量</span>
            <span class="col-num">数值</span>
        </div>
        <div class="table-body">
            <div class="table-row" v-for="(item, i) in list" :key="item.name">
                <span class="col-rank">
                    <span class="rank-badge" :class="'rank-' + (i + 1)">{{ i + 1 }}</span>
                </span>
                <span class="col-name">{{ item.name }}</span>
                <span class="col-bar">
                    <span class="bar-track">
                        <span class="bar-fill" :style="{ width: (item.value / maxValue * 100) + '%' }"></span>
                    </span>
                </span>
                <span class="col-num">{{ item.label }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const list = [
    { name: '峨眉山', value: 800, label: '8.00w' },
    { name: '故宫', value: 720, label: '7.20w' },
    { name: '张家界', value: 680, label: '6.80w' },
    { name: '九寨沟', value: 550, label: '5.50w' },
    { name: '黄山', value: 490, label: '4.90w' }
];
const maxValue = 800;
</script>

<style scoped lang="scss">
.rank-box {
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

    .table-header {
        display: flex;
        align-items: center;
        padding: 8px 0;
        margin-top: 8px;
        border-bottom: 1px solid rgba(0, 150, 255, 0.15);
        color: rgba(255, 255, 255, 0.45);
        font-size: 12px;
    }

    .table-body {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .table-row {
            display: flex;
            align-items: center;
            padding: 6px 0;
            transition: background 0.3s;

            &:hover {
                background: rgba(0, 242, 255, 0.03);
            }
        }
    }

    .col-rank {
        width: 40px;
        display: flex;
        justify-content: center;

        .rank-badge {
            width: 22px;
            height: 22px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            font-size: 12px;
            font-weight: 700;
            color: rgba(255, 255, 255, 0.8);
            background: rgba(0, 120, 255, 0.15);

            &.rank-1 {
                background: linear-gradient(135deg, #ff7b1a, #ff4da6);
                color: #fff;
                box-shadow: 0 0 8px rgba(255, 123, 26, 0.4);
            }

            &.rank-2 {
                background: linear-gradient(135deg, #1890ff, #00f2ff);
                color: #fff;
            }

            &.rank-3 {
                background: linear-gradient(135deg, #00e096, #00f2ff);
                color: #fff;
            }
        }
    }

    .col-name {
        width: 70px;
        color: rgba(255, 255, 255, 0.8);
        font-size: 13px;
    }

    .col-bar {
        flex: 1;
        padding: 0 8px;

        .bar-track {
            display: block;
            height: 10px;
            background: rgba(0, 120, 255, 0.08);
            border-radius: 5px;
            overflow: hidden;

            .bar-fill {
                display: block;
                height: 100%;
                border-radius: 5px;
                background: linear-gradient(90deg, #00f2ff, #1890ff);
                box-shadow: 0 0 6px rgba(0, 242, 255, 0.3);
                transition: width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
        }
    }

    .col-num {
        width: 50px;
        text-align: right;
        color: #00f2ff;
        font-size: 13px;
        font-weight: 600;
    }
}
</style>
