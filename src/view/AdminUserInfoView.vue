<template>
  <n-form class="foreground">
    <n-form-item label="Фамилия">
      <n-input v-model:value="currentUser.lastName" />
    </n-form-item>
    <n-form-item label="Имя">
      <n-input v-model:value="currentUser.firstName" />
    </n-form-item>
    <n-form-item label="Отчество">
      <n-input v-model:value="currentUser.middleName" />
    </n-form-item>
    <n-form-item label="Серия и номер паспорта">
      <n-input v-model:value="currentUser.passport" />
    </n-form-item>
    <n-form-item label="Номер телефона">
      <n-input v-model:value="currentUser.phone" />
    </n-form-item>
    <n-form-item label="Идентификатор">
      <n-input :value="currentUser.id" readonly />
    </n-form-item>
  </n-form>

  <n-button class="w-fit" type="primary" @click="addNewContract">Добавить договор</n-button>

  <ContractCmp :user="currentUser" />
</template>

<script setup>
import { NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { store } from '@/stores/counter'
import { computed } from 'vue'
import ContractCmp from '@/components/ContractCmp.vue'

const currentUser = computed(() => store.auth.currentUser)

const addNewContract = () => {
  const newContractId = Math.max(...store.contracts.map((c) => c.id), 0) + 1
  const newContract = {
    id: newContractId,
    meters: [
      {
        id: 1,
        prevReading: 0,
        currentReading: 0,
        consumption: 0,
        penalty: 0,
        amount: 0,
      },
    ],
  }

  store.contracts.push(newContract)
  currentUser.value.contracts.push(newContractId)
}
</script>
