<script setup>
import { ref } from 'vue'
import NewsList from '@/views/NewsList.vue'
import { useRouter } from 'vue-router'
import { ElButton, ElHeader } from 'element-plus'
import 'element-plus/dist/index.css'

const categories = ['全部', '股票', '基金', '债券']
const selectedCategory = ref('全部')
const router = useRouter()

const goToAuth = (mode) => {
  router.push({ path: '/auth', query: { mode } })
}
</script>

<template>
  <div id="app">
    <!-- 导航栏部分 -->
    <el-header class="main-header">
      <div class="header-content">
        <div class="logo-container">
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
        </div>
        <div class="auth-buttons">
          <el-button type="primary" @click="goToAuth('login')">登录</el-button>
          <el-button @click="goToAuth('register')">注册</el-button>
        </div>
      </div>
    </el-header>
    <NewsList :category="selectedCategory" />
  </div>
</template>

<style scoped>
.main-header {
  background: #fff;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 200px;
}

.header-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.left-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}

.auth-buttons {
  margin-top: 1rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.filter-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  width: 100%;
}

/* 合并重复的logo-container样式 */
.logo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

/* 移除其他重复的.logo-container定义 */

.header-content {
  height: 100%;
  justify-content: center; /* 添加垂直居中 */
}

.filter-buttons {
  justify-content: center !important; /* 强制水平居中 */
}

.auth-buttons {
  position: absolute;
  right: 2rem;
  top: 1rem;
}

.filter-buttons {
  margin-top: 0;
  width: 100%;
  justify-content: flex-start;
}

.auth-buttons {
  margin-top: 1rem;
  align-self: flex-end;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 2rem;
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
