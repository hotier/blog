import { createRouter, createWebHistory } from 'vue-router'

import NewsDetail from '@/views/NewsDetail.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/NewsList.vue'),
      props: { category: '全部' }
    },
    {
      path: '/news/:id',
      component: NewsDetail,
      props: true
    },
    { path: '/search', component: () => import('@/views/SearchView.vue') }
  ]
})