<template>
    <div class="panel panel-editor">
        <div class="panel-header">
            <h2 class="panel-title">Mermaid代码编辑区</h2>
        </div>
        <div class="panel-body">
            <textarea id="editor" :value="modelValue" @input="handleInput" spellcheck="false"></textarea>
        </div>
        <div class="panel-footer">
            <button class="el-button" @click="updateDiagram">生成图表</button>
            <button class="el-button secondary" @click="showExamples">查看示例</button>
            <div class="tips">
                提示: 建议使用 mermaid 语法, 在文本编辑器中编写, 然后复制粘贴到编辑区运行。
            </div>
            <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
    modelValue: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'show-examples'): void
    (e: 'generate'): void
}>()

const errorMessage = ref('')

let timer: any = null
const handleInput = (e: Event) => {
    const value = (e.target as HTMLTextAreaElement).value
    emit('update:modelValue', value)

    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
        emit('generate')
    }, 500)
}

const updateDiagram = () => {
    emit('generate')
}

const showExamples = () => {
    emit('show-examples')
}

defineExpose({
    setError(message: string) {
        errorMessage.value = message
    }
})
</script>