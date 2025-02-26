<template>
    <div class="fullscreen-preview" @wheel.prevent="handleWheel">
        <div class="preview-toolbar">
            <div class="zoom-controls">
                <button class="toolbar-btn" @click="handleZoomOut" title="缩小">
                    <i class="fas fa-search-minus"></i>
                </button>
                <span class="zoom-text">{{ Math.round(zoomLevel * 100) }}%</span>
                <button class="toolbar-btn" @click="handleZoomIn" title="放大">
                    <i class="fas fa-search-plus"></i>
                </button>
            </div>
            <div class="toolbar-actions">
                <button class="toolbar-btn" @click="handleDownload" title="下载PNG">
                    <i class="fas fa-download"></i>
                </button>
                <button class="toolbar-btn" @click="$emit('close')" title="退出全屏">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
        <div class="preview-content" :style="{ transform: `scale(${zoomLevel})` }">
            <div class="mermaid" v-html="diagramSvg"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
    diagramSvg: string
}>()

defineEmits<{
    (e: 'close'): void
}>()

const zoomLevel = ref(2)
const ZOOM_STEP = 0.1
const MAX_ZOOM = 5
const MIN_ZOOM = 0.5

const handleZoomIn = () => {
    if (zoomLevel.value < MAX_ZOOM) {
        zoomLevel.value += ZOOM_STEP
    }
}

const handleZoomOut = () => {
    if (zoomLevel.value > MIN_ZOOM) {
        zoomLevel.value -= ZOOM_STEP
    }
}

const handleWheel = (event: WheelEvent) => {
    // 检查是否按住 Ctrl 键或使用触摸板双指缩放
    if (event.ctrlKey || Math.abs(event.deltaY) < 100) {
        const delta = -event.deltaY / 500
        const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoomLevel.value + delta))
        zoomLevel.value = newZoom
    }
}

const handleDownload = async () => {
    // 创建一个临时的 canvas 元素
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    // 获取SVG元素
    const svgElement = document.querySelector('.mermaid svg') as SVGElement
    if (!svgElement || !ctx) return

    // 获取SVG的实际渲染尺寸
    const svgRect = svgElement.getBoundingClientRect()
    const width = svgRect.width * zoomLevel.value
    const height = svgRect.height * zoomLevel.value

    // 设置canvas尺寸
    canvas.width = width
    canvas.height = height

    // 获取原始SVG并设置尺寸
    const clonedSvg = svgElement.cloneNode(true) as SVGElement
    clonedSvg.setAttribute('width', String(width))
    clonedSvg.setAttribute('height', String(height))

    // 创建SVG的Blob URL
    const svgData = new XMLSerializer().serializeToString(clonedSvg)
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
    const svgUrl = URL.createObjectURL(svgBlob)

    // 创建图片对象
    const img = new Image()
    img.src = svgUrl

    // 等待图片加载完成后绘制到canvas
    await new Promise((resolve) => {
        img.onload = () => {
            ctx.fillStyle = 'white'
            ctx.fillRect(0, 0, width, height)
            ctx.drawImage(img, 0, 0, width, height)
            resolve(null)
        }
    })

    // 创建下载链接
    const link = document.createElement('a')
    link.download = 'sequence-diagram.png'
    link.href = canvas.toDataURL('image/png')
    link.click()

    // 清理资源
    URL.revokeObjectURL(svgUrl)
}
</script>

<style scoped>
.fullscreen-preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: white;
    z-index: 1000;
    display: flex;
    flex-direction: column;
}

.preview-toolbar {
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    z-index: 100;
}

.zoom-controls {
    display: flex;
    align-items: center;
    gap: 8px;
}

.zoom-text {
    min-width: 60px;
    text-align: center;
    font-size: 18px;
}

.toolbar-btn {
    padding: 8px;
    border: none;
    background: transparent;
    cursor: pointer;
    color: #666;
    transition: color 0.3s;
    font-size: 18px;
}

.toolbar-btn:hover {
    color: #1890ff;
}

.preview-content {
    flex: 1;
    overflow: auto;
    padding: 24px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: center center;
    touch-action: none;
    /* 防止触摸设备上的默认缩放行为 */
}

.toolbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>