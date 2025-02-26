<template>
    <div class="example-1">
        <general-mermaid-code-view :code="mermaidCode" title="购物流程示例" />
        <general-sequence-chart :code="mermaidCode" />
    </div>
</template>

<script lang="ts" setup>
import GeneralSequenceChart from '@/components/common/general-sequence-chart.vue'
import GeneralMermaidCodeView from '@/components/common/general-mermaid-code-view.vue'
const mermaidCode = `
sequenceDiagram
    participant 用户
    participant 商城
    participant 支付系统
    participant 库存系统
    用户->>商城: 选择商品
    商城->>库存系统: 检查库存
    库存系统-->>商城: 返回库存状态
    alt 库存充足
        商城-->>用户: 显示确认订单
        用户->>商城: 确认购买
        商城->>支付系统: 发起支付
        支付系统-->>用户: 跳转支付页面
        用户->>支付系统: 完成支付
        支付系统-->>商城: 支付成功通知
        商城->>库存系统: 扣减库存
        商城-->>用户: 显示购买成功
    else 库存不足
        商城-->>用户: 显示库存不足
    end
`
</script>

<style scoped>
.example-1 {
    width: 100%;
    height: 100%;
}
</style>