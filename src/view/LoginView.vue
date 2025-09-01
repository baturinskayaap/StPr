<template>
  <n-card class="login-form">
    <n-tabs type="line">
      <n-tab-pane name="user" tab="Пользователь">
        <n-input v-model:value="userCode" placeholder="Введите ваш код" />
        <n-button @click="handleUserLogin" class="mt-4">Войти</n-button>
      </n-tab-pane>

      <n-tab-pane name="admin" tab="Администратор">
        <n-input v-model:value="adminPass" type="password" placeholder="Пароль администратора" />
        <n-button @click="handleAdminLogin" class="mt-4">Войти</n-button>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<script setup>
import { ref } from 'vue'
import { store } from '../stores/counter'
import { NCard, NTabs, NTabPane, NInput, NButton } from 'naive-ui'

const userCode = ref('')
const adminPass = ref('')

const handleUserLogin = () => {
  store.login(userCode.value)
}

const handleAdminLogin = () => {
  store.login(adminPass.value, true)
}
</script>
