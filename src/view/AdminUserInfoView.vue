<template>
  <div v-if="currentUser">
    <n-form class="foreground">
      <n-form-item label="Фамилия">
        <n-input v-model:value="currentUser.lastName" readonly />
      </n-form-item>
      <n-form-item label="Имя">
        <n-input v-model:value="currentUser.firstName" readonly />
      </n-form-item>
      <n-form-item label="Отчество">
        <n-input v-model:value="currentUser.middleName" readonly />
      </n-form-item>
      <n-form-item label="Серия и номер паспорта">
        <n-input v-model:value="currentUser.passport" readonly />
      </n-form-item>
      <n-form-item label="Номер телефона">
        <n-input v-model:value="currentUser.phone" readonly />
      </n-form-item>
      <n-form-item label="Идентификатор">
        <n-input :value="currentUser.id" readonly />
      </n-form-item>
    </n-form>

    <n-button class="w-fit" type="primary" @click="addNewContract">Добавить договор</n-button>

    <div v-for="contract in userContracts" :key="contract.id" class="foreground">
      <n-h2>Договор {{ contract.id }} - {{ contract.address }}</n-h2>
      <n-grid cols="1 s:1 m:2 l:3" responsive="screen" :x-gap="12" :y-gap="8">
        <n-grid-item v-for="meter in contract.meters" :key="meter.id">
          <MeterToAdminCmp :meter="meter" :contractId="contract.id" />
        </n-grid-item>
      </n-grid>
    </div>
  </div>
  <div v-else>
    <n-alert type="error">Пользователь не найден</n-alert>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/stores/counter'
import { computed } from 'vue'
import { NForm, NFormItem, NInput, NH2, NGrid, NGridItem, NButton, NAlert } from 'naive-ui'
import MeterToAdminCmp from '@/components/MeterToAdminCmp.vue'

const route = useRoute()
const router = useRouter()

const currentUser = computed(() => {
  const userId = parseInt(route.params.userId)
  const contractWithUser = store.state.contracts.find(
    (contract) => contract.user && contract.user.id === userId,
  )
  return contractWithUser ? contractWithUser.user : null
})

const userContracts = computed(() => {
  if (!currentUser.value) return []
  return store.state.contracts.filter(
    (contract) => contract.user && contract.user.id === currentUser.value.id,
  )
})

if (!currentUser.value) {
  router.push('/admin/dashboard')
}

const addNewContract = () => {
  console.log('Adding new contract for user:', currentUser.value.id)
}
</script>
