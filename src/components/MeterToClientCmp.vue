<template>
  <n-h2 prefix="bar"> Счетчик 1 </n-h2>
  <n-grid cols="1 s:1 m:2 " responsive="screen">
    <n-grid-item>
      <n-form-item label="Предыдущие показания">
        <n-input v-model:value="meterData.prevReading" />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Актуальные показания">
        <n-input v-model:value="meterData.prevReading" />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Объем потребления">
        <n-input v-model:value="meterData.prevReading" />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Начисленные пенни">
        <n-input v-model:value="meterData.prevReading" />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Сумма к оплате">
        <n-input v-model:value="meterData.prevReading" />
      </n-form-item>
    </n-grid-item>
  </n-grid>
  <n-button type="primary" @click="handleSubmit" class="w-fit"> Сохранить </n-button>
</template>

<script setup>
import { store } from '../stores/counter'
import { NFormItem, NInput, NButton, NH2 } from 'naive-ui'

const props = defineProps({
  meterId: Number,
  contractId: Number,
})

const meterData = store.contracts
  .find((c) => c.id === props.contractId)
  ?.meters // Теперь здесь массив объектов, а не ID
  .find((m) => m.id === props.meterId)

const handleSubmit = () => {
  store.updateMeter(props.contractId, meterData)
}
</script>
