<template>
  <n-form class="foreground">
    <n-form-item label="Фамилия">
      <n-input placeholder="Введите ваше имя" />
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
import { ref } from 'vue'
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'

const inputValue = ref('123123') // Значение по умолчанию

import ContractCmp from '@/components/ContractCmp.vue'
</script>
