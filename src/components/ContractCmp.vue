<template>
  <div v-for="contract in userContracts" :key="contract.id">
    <n-form class="foreground">
      <n-form-item label="Номер договора">
        <n-input :value="contract.id" readonly />
      </n-form-item>
      <n-form-item label="Количество счетчиков">
        <n-input :value="contract.meters.length" readonly />
      </n-form-item>
    </n-form>

    <MeterCmp
      v-for="meter in contract.meters"
      :key="meter.id"
      :meter="meter"
      :contract-id="contract.id"
    />
  </div>
</template>

<script setup>
import { NForm, NFormItem, NInput } from 'naive-ui'
import MeterCmp from '@/components/MeterToAdminCmp.vue'
import { store } from '../stores/counter'
import { computed } from 'vue'

const props = defineProps({
  user: Object,
})

const userContracts = computed(() =>
  store.contracts.filter((c) => props.user.contracts.includes(c.id)),
)
</script>
