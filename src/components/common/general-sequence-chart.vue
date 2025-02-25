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
            mirrorActors: false
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
        mermaid.init(undefined, `#${chartId.value}`)
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
        ...props.config
    })

    renderChart()
})
</script>

<style scoped>
.sequence-chart-container {
    overflow-x: auto;
    background-color: rgb(244, 244, 244);
}

.mermaid {
    text-align: center;
}
</style>