<template>
    <div class="panel panel-preview">
        <div class="panel-header">
            <h2 class="panel-title">预览区</h2>
            <div class="panel-actions">
                <button class="download-btn" @click="handleDownload" title="下载时序图">
                    <i class="fas fa-download"></i>
                </button>
            </div>
        </div>
        <div class="panel-body">
            <div class="preview-container">
                <div v-if="diagramSvg" class="mermaid" id="diagram" v-html="diagramSvg"></div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'

const props = defineProps<{
    diagramSvg: string
}>()

const handleDownload = () => {
    if (!props.diagramSvg) return

    // 获取实际的 SVG 元素
    const svgElement = document.getElementById('diagram')?.querySelector('svg') as SVGSVGElement
    if (!svgElement) return

    // 获取 SVG 的尺寸
    const width = svgElement.clientWidth
    const height = svgElement.clientHeight

    // 创建 Canvas
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    // 将 SVG 转换为 Base64 编码的字符串
    const svgString = new XMLSerializer().serializeToString(svgElement)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(svgBlob)

    // 创建图片对象
    const img = new Image()
    img.onload = () => {
        const ctx = canvas.getContext('2d')
        if (ctx) {
            // 绘制图片到 Canvas
            ctx.fillStyle = 'white'  // 设置白色背景
            ctx.fillRect(0, 0, width, height)
            ctx.drawImage(img, 0, 0)

            // 转换为 PNG 并下载
            canvas.toBlob((blob) => {
                if (blob) {
                    const link = document.createElement('a')
                    link.href = URL.createObjectURL(blob)
                    link.download = `sequence-diagram-${Date.now()}.png`
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    URL.revokeObjectURL(link.href)
                }
            }, 'image/png')
        }
        URL.revokeObjectURL(url)
    }
    img.src = url
}

defineExpose({
    updateFontSize() {
        nextTick(() => {
            const chartElement = document.getElementById('diagram')
            if (chartElement) {
                const fontSize = 14
                chartElement.style.fontSize = `${fontSize}px`
                const textElements = chartElement.querySelectorAll('text')
                textElements.forEach(el => {
                    el.style.fontSize = `${fontSize}px`
                })
            }
        })
    }
})
</script>

<style scoped>
.panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.panel-actions {
    display: flex;
    gap: 8px;
}

.download-btn {
    padding: 4px 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #666;
    transition: color 0.3s;
}

.download-btn:hover {
    color: #1890ff;
}
</style>