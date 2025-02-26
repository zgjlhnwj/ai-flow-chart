import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index.vue'),
    // 配置子路由
    children: [
      {
        path: 'sequence-chart',
        name: 'SequenceChart',
        component: () => import('@/package/sequence-chart/main.vue')
      },
      {
        path: 'flow-chart',
        name: 'FlowChart',
        component: () => import('@/package/flow-chart/main.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 