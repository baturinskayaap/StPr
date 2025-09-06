<template>
  <n-card class="login-form">
    <n-input v-model:value="userCode" placeholder="Введите ваш код" />
    <n-button @click="handleUserLogin" class="mt-4" :loading="loading"> Войти </n-button>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '@/stores/counter'
import { NCard, NInput, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useMessage } from 'naive-ui'

const router = useRouter()
const message = useMessage()
const userCode = ref('')
const loading = ref(false)

const handleUserLogin = async () => {
  loading.value = true
  const isAdminAttempt = userCode.value === 'admin123'

  try {
    const success = await store.login(userCode.value, isAdminAttempt)

    if (success) {
      if (store.state.isAdmin) {
        router.push({ name: 'AdminDashboard' })
      } else {
        router.push({ name: 'Client' })
      }
    }
  } catch (error) {
    message.error(error.message || 'Ошибка входа')
  } finally {
    loading.value = false
  }
}
</script>
