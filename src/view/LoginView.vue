<template>
  <n-card class="login-form">
    <n-input v-model:value="userCode" placeholder="Введите ваш код" />
    <n-button @click="handleUserLogin" class="mt-4">Войти</n-button>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../stores/counter'
import { NCard, NInput, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'

const router = useRouter()
const userCode = ref('')

const handleUserLogin = () => {
  const isAdminAttempt = userCode.value === 'admin123'
  store.login(userCode.value, isAdminAttempt)

  if (store.auth.isLoggedIn) {
    if (store.auth.isAdmin) {
      router.push({ name: 'AdminDashboard' })
    } else {
      router.push({ name: 'Client' })
    }
  }
}
</script>
