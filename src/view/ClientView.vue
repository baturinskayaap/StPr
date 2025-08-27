<template>
  <div class="foreground">
    <n-h1>Договор 1</n-h1>
    <n-grid cols="2" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item>
        <MeterCmp />
      </n-grid-item>
      <n-grid-item>
        <MeterCmp />
      </n-grid-item>
    </n-grid>
  </div>

  <div class="foreground w-fit">
    <n-h2>Итого: 1234</n-h2>
    <n-button type="primary" @click="handleSubmit"> Оплатить </n-button>
  </div>
</template>

<script setup>
import MeterCmp from '@/components/MeterToClientCmp.vue'
import { NGrid, NGridItem, NH1, NH2 } from 'naive-ui'
</script>
