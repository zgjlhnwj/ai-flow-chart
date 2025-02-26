<template>
  <div class="sequence-example">
    <div class="example-item">
      <example-1 />
    </div>
    <div class="example-item">
      <example-1 />
    </div>
  </div>
</template>

<script lang="ts" setup>
// 导入 example-1 组件
import Example1 from '@/components/modules/demo-chat/example-1.vue'

</script>

<style scoped>
.sequence-example {
  max-height: 100vh;
  overflow-y: auto;
}

.example-item+.example-item {
  margin-top: 20px;
}

/* 设置滚动条宽度 */
.sequence-example::-webkit-scrollbar {
  width: 5px;
}

/* 设置滚动条滑块样式 */
.sequence-example::-webkit-scrollbar-thumb {
  background: transparent;
  border-radius: 3px;
}

/* 设置滚动条轨道样式 */
.sequence-example::-webkit-scrollbar-track {
  background: transparent;
}
</style>
