<template>
  <div class="search-container">
    <el-input
      v-model="searchQuery"
      placeholder="输入关键词搜索新闻"
      class="search-input"
      @keyup.enter="performSearch"
    >
      <template #append>
        <el-button icon="Search" @click="performSearch" />
      </template>
    </el-input>

    <el-divider />

    <NewsList :news-list="searchResults" :loading="isLoading" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import NewsList from '@/views/NewsList.vue';
import { searchNews } from '@/api/newsApi';

const searchQuery = ref('');
const searchResults = ref([]);
const isLoading = ref(false);

const performSearch = async () => {
  try {
    isLoading.value = true;
    const response = await searchNews(searchQuery.value);
    searchResults.value = response.data;
  } catch (error) {
    console.error('搜索失败:', error);
    ElMessage.error('搜索失败，请稍后重试');
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
.search-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
}

.search-input {
  margin-bottom: 20px;
}
</style>