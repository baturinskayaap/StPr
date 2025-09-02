<template>
  <n-h2 prefix="bar"> Счетчик {{ meterId }} </n-h2>
  <n-grid cols="1 s:1 m:2" responsive="screen">
    <n-grid-item>
      <n-form-item label="Предыдущие показания">
        <n-input v-model:value="meterData.prevReading" readonly />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Актуальные показания">
        <n-input v-model:value="meterData.currentReading" />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Объем потребления">
        <n-input :value="meterData.consumption" readonly />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Начисленные пенни">
        <n-input :value="meterData.penalty" readonly />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Сумма к оплате">
        <n-input :value="meterData.amount" readonly />
      </n-form-item>
    </n-grid-item>
  </n-grid>
  <n-button type="primary" @click="handleSubmit" class="w-fit"> Сохранить </n-button>
</template>

<script setup>
import { store } from '@/stores/counter'
import { NFormItem, NInput, NButton, NH2, NGrid, NGridItem } from 'naive-ui'
import { computed } from 'vue'

const props = defineProps({
  meterId: Number,
  contractId: Number,
})

const meterData = computed(() => {
  const contract = store.contracts.find((c) => c.id === props.contractId)
  return contract ? contract.meters.find((m) => m.id === props.meterId) : {}
})

const handleSubmit = () => {
  store.updateMeter(props.contractId, { ...meterData.value })
}
</script>
