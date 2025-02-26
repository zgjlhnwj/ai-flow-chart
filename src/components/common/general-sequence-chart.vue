<template>
    <div class="sequence-chart-container">
        <div :id="chartId" class="mermaid">
            {{ code }}
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import mermaid from 'mermaid'

// 定义 props
interface Props {
    code: string
    config?: {
        theme?: 'default' | 'base' | 'dark' | 'forest' | 'neutral' | 'null'
        sequence?: {
            showSequenceNumbers?: boolean
            actorMargin?: number
            messageMargin?: number
            mirrorActors?: boolean
            fontSize?: number
            actorFontSize?: number
            noteFontSize?: number
            messageFontSize?: number
            wrap?: boolean
            useMaxWidth?: boolean
        }
    }
}

const props = withDefaults(defineProps<Props>(), {
    config: () => ({
        theme: 'default',
        sequence: {
            showSequenceNumbers: false,
            actorMargin: 50,
            messageMargin: 40,
            mirrorActors: false,
            fontSize: 12
        }
    })
})

// 生成唯一的图表ID
const chartId = ref(`mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`)

// 渲染图表的方法
const renderChart = () => {
    try {
        // 清除之前的图表
        const element = document.getElementById(chartId.value)
        if (element) {
            element.innerHTML = props.code
        }
        // 重新渲染
        mermaid.init(undefined, `#${chartId.value}`).then(() => {
            // 渲染完成后强制应用字体大小
            const chartElement = document.getElementById(chartId.value)
            if (chartElement) {
                const fontSize = props.config?.sequence?.fontSize || 12
                chartElement.style.fontSize = `${fontSize}px`
                // 确保子元素也应用字体大小
                const textElements = chartElement.querySelectorAll('text')
                textElements.forEach(el => {
                    el.style.fontSize = `${fontSize}px`
                })
            }
        })
    } catch (error) {
        console.error('Mermaid rendering error:', error)
    }
}

// 监听代码变化
watch(() => props.code, () => {
    nextTick(() => {
        renderChart()
    })
})

// 组件挂载时初始化
onMounted(() => {
    // 初始化mermaid配置
    mermaid.initialize({
        startOnLoad: true,
        theme: props.config?.theme,
        sequence: {
            showSequenceNumbers: props.config?.sequence?.showSequenceNumbers,
            actorMargin: props.config?.sequence?.actorMargin,
            messageMargin: props.config?.sequence?.messageMargin,
            mirrorActors: props.config?.sequence?.mirrorActors,
            // 字体大小配置需要在 sequence 配置对象中直接设置
            fontSize: props.config?.sequence?.fontSize,
            actorFontSize: props.config?.sequence?.fontSize,
            noteFontSize: props.config?.sequence?.fontSize,
            messageFontSize: props.config?.sequence?.fontSize,
            // 确保文本能够正确显示
            wrap: true,
            useMaxWidth: true
        }
    })

    renderChart()
})
</script>

<style scoped>
.sequence-chart-container {
    overflow-x: auto;
    background-color: rgb(244, 244, 244);
    user-select: text;
    /* 允许文本选择 */
}

.mermaid {
    text-align: center;
    user-select: text;
    /* 允许文本选择 */
}
</style>