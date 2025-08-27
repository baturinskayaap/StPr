<template>
  <n-form class="foreground">
    <n-form-item label="Фамилия">
      <n-input v-model:value="currentUser.lastName" />
    </n-form-item>
    <n-form-item label="Имя">
      <n-input placeholder="Введите ваше имя" />
    </n-form-item>
    <n-form-item label="Отчество">
      <n-input placeholder="Введите ваше имя" />
    </n-form-item>
    <n-form-item label="Серия и номер паспорта">
      <n-input placeholder="Введите ваше имя" />
    </n-form-item>
    <n-form-item label="Номер телефона">
      <n-input placeholder="Введите ваше имя" />
    </n-form-item>
    <n-form-item label="Идентификатор">
      <n-input type="text" v-model:value="inputValue" placeholder="Введите ID" readonly />
    </n-form-item>
  </n-form>

  <n-button class="w-fit" type="primary">Добавить договор</n-button>

  <ContractCmp />
</template>

<script setup>
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { store } from '../stores/counter'
// import { ref } from 'vue'
const currentUser = store.users[0] // Для примера берем первого пользователя
</script>
