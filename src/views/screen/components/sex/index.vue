<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="sex-box">
        <div class="header">
            <span class="title">男女比例</span>
            <div class="line"></div>
        </div>
        <div class="bars">
            <div class="bar-item">
                <div class="icon male">
                    <img src="../../images/man.png" alt="">
                </div>
                <div class="bar-track">
                    <div class="bar-fill male-fill" :style="{ width: '60%' }">
                        <span class="percent">60%</span>
                    </div>
                </div>
            </div>
            <div class="bar-item">
                <div class="icon female">
                    <img src="../../images/woman.png" alt="">
                </div>
                <div class="bar-track">
                    <div class="bar-fill female-fill" :style="{ width: '40%' }">
                        <span class="percent">40%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.sex-box {
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

    .bars {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 20px;
        padding: 0 10px;

        .bar-item {
            display: flex;
            align-items: center;
            gap: 12px;

            .icon {
                width: 48px;
                height: 48px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                flex-shrink: 0;

                img {
                    width: 32px;
                    height: 32px;
                }

                &.male {
                    background: rgba(24, 144, 255, 0.15);
                    border: 1px solid rgba(24, 144, 255, 0.3);
                }

                &.female {
                    background: rgba(255, 77, 166, 0.15);
                    border: 1px solid rgba(255, 77, 166, 0.3);
                }
            }

            .bar-track {
                flex: 1;
                height: 24px;
                background: rgba(0, 120, 255, 0.06);
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid rgba(0, 150, 255, 0.1);
            }

            .bar-fill {
                height: 100%;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding-right: 10px;
                transition: width 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);

                .percent {
                    color: #fff;
                    font-size: 13px;
                    font-weight: 600;
                    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
                }

                &.male-fill {
                    background: linear-gradient(90deg, rgba(24, 144, 255, 0.3), #1890ff);
                    box-shadow: 0 0 12px rgba(24, 144, 255, 0.3);
                }

                &.female-fill {
                    background: linear-gradient(90deg, rgba(255, 77, 166, 0.3), #ff4da6);
                    box-shadow: 0 0 12px rgba(255, 77, 166, 0.3);
                }
            }
        }
    }
}
</style>
