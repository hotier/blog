<template>
  <div class="auth-container">
    <el-form :model="form" label-width="80px" class="auth-form">
      <h2>{{ isLogin ? '用户登录' : '用户注册' }}</h2>
      
      <el-form-item label="用户名">
        <el-input v-model="form.username" />
      </el-form-item>
      
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password" />
      </el-form-item>

      <el-form-item v-if="!isLogin" label="确认密码">
        <el-input v-model="form.confirmPassword" type="password" />
      </el-form-item>

      <el-button type="primary" @click="handleSubmit">
        {{ isLogin ? '登录' : '注册' }}
      </el-button>
      
      <el-button link type="primary" @click="toggleMode">
        {{ isLogin ? '切换到注册' : '切换到登录' }}
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

// 添加类型定义
type AuthForm = {
  username: string;
  password: string;
  confirmPassword: string;
};

const form = ref<AuthForm>({
  username: '',
  password: '',
  confirmPassword: ''
});

const isLogin = ref<boolean>(true);

const router = useRouter();

const toggleMode = () => {
  isLogin.value = !isLogin.value;
  form.value = { username: '', password: '', confirmPassword: '' };
};

const handleSubmit = async (): Promise<void> => {


  // 添加空值检查
  // 密码强度校验正则（至少8位，包含大小写字母和数字）
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

  if (!form.value?.username || !form.value?.password) {
    ElMessage.warning('请填写完整信息');
    return;
  }

  if (!isLogin.value && !passwordRegex.test(form.value.password)) {
    ElMessage.warning('密码需至少8位，包含大小写字母和数字');
    return;
  }

  if (!isLogin.value && form.value.password !== form.value.confirmPassword) {
    ElMessage.error('两次密码输入不一致');
    return;
  }

  try {
    // TODO: 调用后端认证接口
    ElMessage.success(isLogin.value ? '登录成功' : '注册成功');
    router.push('/');
  } catch (error) {
    ElMessage.error(`操作失败: ${error.message}`);
  }
};
</script>

<style scoped>
.auth-container {
  display: flex;
  justify-content: center;
  padding: 2rem;
}

.auth-form {
  width: 400px;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 4px;
}
</style>