<template>
    <div class="general-mermaid-code-view">
        <div class="example">
            <div class="example-header">
                <div class="example-title">购物流程示例</div>
                <button class="copy-btn" :class="{ 'copied': isCopied }" @click="copyCode">
                    {{ isCopied ? '复制成功' : '复制代码' }}
                </button>
            </div>
            <pre>{{ code }}</pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const props = defineProps<{
    code: string
}>()

const isCopied = ref(false)

const copyCode = async () => {
    try {
        await navigator.clipboard.writeText(props.code)
        isCopied.value = true
    } catch (err) {
        alert('复制失败，请重试')
    }
}
</script>

<style lang="scss" scoped>
.example {
    margin-bottom: 30px;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 4px;
}

.example pre {
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    color: #666;
    font-size: 14px;
}

.example-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 15px;
}

.example-title {
    font-size: 18px;
    color: #303133;
    margin: 0;
    font-size: 16px;
}

.copy-btn {
    padding: 5px 15px;
    background-color: #409EFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 12px;
    transition: all 0.3s;

    &.copied {
        background-color: #67C23A;
    }

    &:hover {
        background-color: #66b1ff;

        &.copied {
            background-color: #85ce61;
        }
    }
}
</style>
