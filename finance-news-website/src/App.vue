<script setup>
import { ref } from 'vue'
import NewsList from '@/views/NewsList.vue'

const categories = ['全部', '股票', '基金', '债券']
const selectedCategory = ref('全部')
</script>

<template>
  <div id="app">
    <!-- 导航栏部分 -->
    <el-header class="main-header">
      <div class="header-content">
        <div class="logo-container">
          <img src="./assets/logo.png" class="logo">
          <h1>财经新闻</h1>
        </div>
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
        <div class="auth-buttons">
          <el-button type="primary" @click="goToAuth('login')">登录</el-button>
          <el-button @click="goToAuth('register')">注册</el-button>
        </div>
      </div>
    </el-header>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAuth = (mode) => {
  router.push({ path: '/auth', query: { mode } })
}
</script>

<style scoped>
.main-header {
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.auth-buttons {
  display: flex;
  gap: 10px;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 15px;
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

<NewsList :category="selectedCategory" />
