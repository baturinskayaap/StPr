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
import { useRoute, useRouter } from 'vue-router'
import { store } from '@/stores/counter'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

//api
const currentUser = computed(() => {
  return store.state.user || { id: route.params.userId }
})

if (!currentUser.value) {
  router.push('/admin/dashboard')
}

const addNewContract = () => {
  // api
  console.log('Adding new contract for user:', currentUser.value.id)
}
</script>
