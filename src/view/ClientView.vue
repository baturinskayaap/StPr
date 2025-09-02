<template>
  <div v-for="contract in userContracts" :key="contract.id" class="foreground">
    <n-h1>Договор {{ contract.id }}</n-h1>
    <n-grid cols="2" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item v-for="meter in contract.meters" :key="meter.id">
        <MeterCmp :meterId="meter.id" :contractId="contract.id" />
      </n-grid-item>
    </n-grid>
  </div>

  <div class="foreground w-fit">
    <n-h2>Итого: {{ totalAmount }}</n-h2>
    <n-button type="primary" @click="handleSubmit"> Оплатить </n-button>
  </div>
</template>

<script setup>
import MeterCmp from '@/components/MeterToClientCmp.vue'
import { NGrid, NGridItem, NH1, NH2, NButton } from 'naive-ui'
import { store } from '@/stores/counter'
import { computed } from 'vue'

const userContracts = computed(() => {
  if (!store.auth.currentUser) return []
  return store.getUserContracts(store.auth.currentUser.id)
})

const totalAmount = computed(() => {
  return userContracts.value.reduce((total, contract) => {
    return total + contract.meters.reduce((sum, meter) => sum + meter.amount, 0)
  }, 0)
})
</script>
