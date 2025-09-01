<template>
  <n-form class="foreground">
    <n-form-item label="Серийный номер">
      <n-input :value="meter.id" readonly />
    </n-form-item>
    <n-form-item label="Текущие показания">
      <n-input :value="meter.currentReading" />
    </n-form-item>
    <n-form-item label="Предыдущие показания">
      <n-input :value="meter.prevReading" readonly />
    </n-form-item>
  </n-form>
</template>

<script setup>
import { NForm, NFormItem, NInput } from 'naive-ui'

defineProps({
  meter: Object,
  contractId: Number,
})
</script>
