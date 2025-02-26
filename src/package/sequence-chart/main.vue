<template>
    <div class="page-container">
        <editor-panel v-model="code" @generate="updateDiagram" @show-examples="showExamples" ref="editorRef" />
        <preview-panel :diagram-svg="diagramSvg" ref="previewRef" />
    </div>

    <!-- 示例弹窗 -->
    <div v-if="showModal" class="modal" @click.self="closeExamples">
        <div class="modal-content">
            <span class="modal-close" @click="closeExamples">&times;</span>
            <SequenceExamples v-if="showModal" class="modal-iframe" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import mermaid from 'mermaid'
import SequenceExamples from '@/components/modules/sequence-examples.vue'
import EditorPanel from './components/editor-panel.vue'
import PreviewPanel from './components/preview-panel.vue'

const DEFAULT_SEQUENCE_DIAGRAM =
    `sequenceDiagram
      participant 用户
      participant 系统
      participant 数据库
      用户->>系统: 登录请求
      系统->>数据库: 查询用户信息
      数据库-->>系统: 返回用户数据
      alt 登录成功
          系统-->>用户: 显示成功信息
      else 登录失败
          系统-->>用户: 显示错误信息
      end`;

const code = ref(DEFAULT_SEQUENCE_DIAGRAM);
const diagramSvg = ref('');
const showModal = ref(false);
const editorRef = ref();
const previewRef = ref();

// 修改 mermaid 配置
mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    sequence: {
        diagramMarginX: 50,
        diagramMarginY: 10,
        boxTextMargin: 5,
        noteMargin: 10,
        messageMargin: 35,
        mirrorActors: true
    }
});

const updateDiagram = async () => {
    try {
        editorRef.value?.setError('');
        const id = 'mermaid-' + Date.now();
        diagramSvg.value = '';
        await mermaid.parse(code.value.trim());
        const { svg } = await mermaid.render(id, code.value.trim());
        diagramSvg.value = svg;
        previewRef.value?.updateFontSize();
    } catch (error) {
        console.error('渲染图表时出错:', error);
        editorRef.value?.setError('图表语法错误，请检查输入格式是否正确');
    }
};

const showExamples = () => {
    showModal.value = true;
};

const closeExamples = () => {
    showModal.value = false;
};

onMounted(() => {
    setTimeout(() => {
        updateDiagram();
    }, 1000);
});

// 修改 mermaid 初始化配置
onMounted(() => {
    mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        sequence: {
            showSequenceNumbers: true,
            actorMargin: 50,
            messageMargin: 40,
            mirrorActors: false,
            // 移除 fontSize 相关配置，改用 JS 动态设置
            wrap: true,
            useMaxWidth: true
        }
    })
})
</script>

<style lang="scss">
@use './style/index.scss';
</style>