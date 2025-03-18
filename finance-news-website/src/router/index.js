import { createRouter, createWebHistory } from 'vue-router'

import NewsDetail from '@/views/NewsDetail.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/components/NewsList.vue'),
      props: { category: '全部' }
    },
    {
      path: '/news/:id',
      component: NewsDetail,
      props: true
    }
  ]
})