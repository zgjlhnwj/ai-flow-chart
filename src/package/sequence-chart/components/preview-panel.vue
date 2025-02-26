<template>
    <div class="panel panel-preview">
        <div class="panel-header">
            <h2 class="panel-title">预览区</h2>
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

defineProps<{
    diagramSvg: string
}>()

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