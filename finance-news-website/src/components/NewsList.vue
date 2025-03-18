<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import newsData from '@/data/news.json'

const router = useRouter()
const props = defineProps(['category'])

const newsItems = newsData

const filteredNews = computed(() => {
  return props.category === '全部' 
    ? newsItems 
    : newsItems.filter(item => item.category === props.category)
})

const handleClick = (id) => {
  router.push(`/news/${id}`)
}
</script>

<template>
  <div class="news-container">
    <div 
      v-for="item in filteredNews" 
      :key="item.id" 
      class="news-card"
      @click="handleClick(item.id)"
    >
      <h3>{{ item.title }}</h3>
      <div class="meta">
        <span class="category">{{ item.category }}</span>
        <span class="date">{{ item.date }}</span>
      </div>
      <p class="summary">{{ item.summary }}</p>
    </div>
  </div>
</template>

<style scoped>
.news-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 30vh; /* 继续缩短长度 */
  transition: all 0.3s ease-in-out;
}

.news-card {
  height: 200px; /* 继续缩短长度 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 280px;
  transition: transform 0.2s, opacity 0.3s ease-in-out;
  opacity: 1;
  transform-origin: center top;
  will-change: transform, opacity;
}

h3 {
  flex-grow: 0;
}

.summary {
  flex-grow: 1;
  margin-bottom: 1rem;
}

.news-card:hover {
  transform: translateY(-2px);
}

.news-card-enter-active,
.news-card-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.news-card-enter-from,
.news-card-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

@media (max-width: 640px) {
  .news-container {
    padding: 1rem;
    grid-template-columns: 1fr;
  }
  .news-card {
    min-width: auto;
  }
}

h3 {
  color: black;
  margin-bottom: 0.5rem;
}

.meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9em;
  color: #666;
}

.category {
  background: #e9ecef;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.summary {
  color: black;
  line-height: 1.6;
}
</style>