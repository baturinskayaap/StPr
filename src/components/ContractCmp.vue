<template>
  <n-form class="foreground">
    <n-form-item label="Номер договора">
      <n-input placeholder="Введите ваше имя" />
    </n-form-item>
    <n-form-item label="Количество счетчиков">
      <n-input placeholder="Введите ваше имя" />
    </n-form-item>
  </n-form>

  <MeterCmp />
</template>

<script setup>
import { NForm, NFormItem, NInput } from 'naive-ui'

import MeterCmp from '@/components/MeterToAdminCmp.vue'
</script>
