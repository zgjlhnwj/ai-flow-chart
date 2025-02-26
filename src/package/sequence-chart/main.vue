<template>
    <div class="page-container">
        <div class="panel panel-editor">
            <div class="panel-header">
                <h2 class="panel-title">Mermaid代码编辑区</h2>
            </div>
            <div class="panel-body">
                <textarea id="editor" v-model="code" spellcheck="false" @input="handleInput"></textarea>
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
import { ref, onMounted, nextTick } from 'vue'
import mermaid from 'mermaid'
import SequenceExamples from '@/components/modules/sequence-examples.vue'
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
const errorMessage = ref('');
const showModal = ref(false);
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
        errorMessage.value = '';
        const id = 'mermaid-' + Date.now();
        diagramSvg.value = '';
        await mermaid.parse(code.value.trim());
        const { svg } = await mermaid.render(id, code.value.trim());
        diagramSvg.value = svg;

        // 在渲染完成后设置字体大小
        nextTick(() => {
            const chartElement = document.getElementById('diagram');
            if (chartElement) {
                const fontSize = 14; // 你可以根据需要调整默认字体大小
                chartElement.style.fontSize = `${fontSize}px`;
                // 确保子元素也应用字体大小
                const textElements = chartElement.querySelectorAll('text');
                textElements.forEach(el => {
                    el.style.fontSize = `${fontSize}px`;
                });
            }
        });
    } catch (error) {
        console.error('渲染图表时出错:', error);
        errorMessage.value = '图表语法错误，请检查输入格式是否正确';
    }
};

let timer: any = null;
const handleInput = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
        updateDiagram();
    }, 500);
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