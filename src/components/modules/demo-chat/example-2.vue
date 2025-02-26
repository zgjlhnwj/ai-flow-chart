<template>
    <div class="example-1">
        <general-mermaid-code-view :code="mermaidCode" title="复杂业务流程示例" />
        <general-sequence-chart :code="mermaidCode" />
    </div>
</template>

<script lang="ts" setup>
import GeneralSequenceChart from '@/components/common/general-sequence-chart.vue'
import GeneralMermaidCodeView from '@/components/common/general-mermaid-code-view.vue'
const mermaidCode = `
sequenceDiagram
    participant 客户端
    participant 网关
    participant 服务A
    participant 服务B
    participant 消息队列
    participant 缓存
    participant 数据库
    客户端->>网关: 发起请求
    网关->>网关: 验证请求
    alt 验证通过
        网关->>服务A: 转发请求
        服务A->>缓存: 查询缓存
        alt 缓存命中
            缓存-->>服务A: 返回数据
        else 缓存未命中
            服务A->>数据库: 查询数据
            数据库-->>服务A: 返回数据
            服务A->>缓存: 更新缓存
        end
        服务A->>消息队列: 发送事件通知
        服务A-->>网关: 返回处理结果
        par 异步处理
            消息队列->>服务B: 消费事件
            服务B->>数据库: 更新相关数据
        end
        网关-->>客户端: 返回响应
    else 验证失败
        网关-->>客户端: 返回错误信息
    end
`
</script>

<style scoped>
.example-1 {
    width: 100%;
    height: 100%;
}
</style>