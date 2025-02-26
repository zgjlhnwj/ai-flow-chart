<template>
    <div class="syntax-doc">
        <h4>时序图语法文档</h4>
        <div class="syntax-section">
            <div class="section-title">基本语法</div>
            <div class="section-content">
                <pre>{{ basicCode }}</pre>
                <div class="preview">
                    <general-sequence-chart :code="basicCode" />
                </div>
            </div>
        </div>

        <div class="syntax-section">
            <div class="section-title">激活与去激活</div>
            <div class="section-content">
                <pre>{{ activateCode }}</pre>
                <div class="preview">
                    <general-sequence-chart :code="activateCode" />
                </div>
            </div>
        </div>

        <div class="syntax-section">
            <div class="section-title">注释</div>
            <div class="section-content">
                <pre>{{ noteCode }}</pre>
                <div class="preview">
                    <general-sequence-chart :code="noteCode" />
                </div>
            </div>
        </div>

        <div class="syntax-section">
            <div class="section-title">循环</div>
            <div class="section-content">
                <pre>{{ loopCode }}</pre>
                <div class="preview">
                    <general-sequence-chart :code="loopCode" />
                </div>
            </div>
        </div>

        <div class="syntax-section">
            <div class="section-title">条件判断</div>
            <div class="section-content">
                <pre>{{ altCode }}</pre>
                <div class="preview">
                    <general-sequence-chart :code="altCode" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import GeneralSequenceChart from '@/components/common/general-sequence-chart.vue'

const basicCode = `sequenceDiagram
    participant A as 参与者A
    participant B as 参与者B
    
    A->>B: 实线带箭头
    B-->>A: 虚线带箭头
    A->B: 实线无箭头
    B-->A: 虚线无箭头`

const activateCode = `sequenceDiagram
    participant A
    participant B
    activate A
    A->>B: 激活状态消息
    deactivate A
    
    A->>+B: 激活B
    B-->>-A: 去激活B`

const noteCode = `sequenceDiagram
    A->>B: 消息
    Note left of A: 左侧注释
    Note right of B: 右侧注释
    Note over A,B: 跨越注释`

const loopCode = `sequenceDiagram
    loop 循环描述
        A->>B: 消息
    end`

const altCode = `sequenceDiagram
    alt 成功情况
        A->>B: 成功处理
    else 失败情况
        A->>B: 失败处理
    end`
</script>

<style scoped>
.syntax-doc {
    width: 100%;
    height: 100%;
    max-height: 80vh;
    overflow-y: auto;

    /* 隐藏滚动条 - Webkit浏览器 */
    &::-webkit-scrollbar {
        display: none;
    }

    /* 隐藏滚动条 - Firefox */
    scrollbar-width: none;
    /* 隐藏滚动条 - IE */
    -ms-overflow-style: none;
}

.syntax-section {
    margin-bottom: 30px;
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.section-content {
    display: flex;
    gap: 20px;
    align-items: flex-start;
}

.preview {
    flex: 1;
    min-width: 300px;
    background-color: #fff;
    border-radius: 6px;
    padding: 10px;
    border: 1px solid #e9ecef;
}

pre {
    flex: 1;
    margin: 0;
    background-color: #f8f9fa;
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
    border: 1px solid #e9ecef;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    font-size: 14px;
    line-height: 1.5;
    user-select: text;
    -webkit-user-select: text;
    -moz-user-select: text;
    -ms-user-select: text;
    cursor: text;
}

.section-title {
    margin-bottom: 16px;
    color: #2c3e50;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 2px solid #eee;
    padding-bottom: 8px;
}

h2 {
    color: #2c3e50;
    margin-bottom: 24px;
    font-size: 1.8em;
}
</style>