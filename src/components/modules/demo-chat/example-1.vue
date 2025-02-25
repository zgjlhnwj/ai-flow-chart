<template>
    <div class="example-1">
        <general-mermaid-code-view :code="mermaidCode" />
        <general-sequence-chart :code="mermaidCode" />
    </div>
</template>

<script lang="ts" setup>
import GeneralSequenceChart from '@/components/common/general-sequence-chart.vue'
import GeneralMermaidCodeView from '@/components/common/general-mermaid-code-view.vue'
const mermaidCode = `sequenceDiagram
    participant C as Customer
    participant S as Shop
    participant P as Payment
    participant W as Warehouse

    C->>S: Browse Products
    S->>C: Display Products List
    C->>S: Select Product
    C->>S: Add to Cart
    C->>S: Checkout
    S->>P: Request Payment
    P->>C: Payment Form
    C->>P: Submit Payment
    P->>S: Payment Confirmed
    S->>W: Create Order
    W->>W: Process Order
    W->>S: Order Shipped
    S->>C: Order Confirmation
    W->>C: Delivery Tracking`
</script>

<style scoped>
.example-1 {
    width: 100%;
    height: 100%;
}
</style>