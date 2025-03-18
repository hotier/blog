<script setup>
import { useRoute } from 'vue-router'
import newsData from '@/data/news.json'

const route = useRoute()
const newsItem = newsData.find(item => item.id === Number(route.params.id))
</script>

<template>
  <div class="detail-container">
    <h1>{{ newsItem.title }}</h1>
    <div class="meta">
      <span class="category">{{ newsItem.category }}</span>
      <span class="date">{{ newsItem.date }}</span>
    </div>
    <div class="content">
      {{ newsItem.content }}
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  color: #666;
}

.content {
  line-height: 1.8;
  font-size: 1.1rem;
  color: #333;
}
</style>