<script setup>
import { ref } from 'vue'
import NewsList from './components/NewsList.vue'

const categories = ['全部', '股票', '基金', '债券']
const selectedCategory = ref('全部')
</script>

<template>
  <nav class="navbar">
    <h1>财经新闻</h1>
    <div class="filter-buttons">
      <button 
        v-for="category in categories"
        :key="category"
        @click="selectedCategory = category"
        :class="{ active: selectedCategory === category }"
      >
        {{ category }}
      </button>
    </div>
  </nav>
  <NewsList :category="selectedCategory" />
</template>

<style>
.navbar {
  background-image: url('https://images.unsplash.com/photo-1638913662380-9799def8ffb1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80');
  background-size: cover;
  background-position: center;
  padding: 1rem;
  color: black;
  background-color: rgba(255, 255, 255, 0.9);

  padding: 1rem;
  background: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.filter-buttons {
  margin-top: 1rem;
}

button {
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid #007bff;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

button.active {
  background: #007bff;
  color: white;
}
</style>
