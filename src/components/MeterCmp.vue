<template>
  <n-h2 prefix="bar"> Счетчик 1 </n-h2>
  <n-grid cols="1 s:1 m:2 " responsive="screen">
    <n-grid-item>
      <n-form-item label="Предыдущие показания" path="name">
        <n-input v-model:value="formData.name" placeholder="1" />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Актуальные показания" path="name">
        <n-input v-model:value="formData.name" placeholder="2" />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Объем потребления" path="name">
        <n-input v-model:value="formData.name" placeholder="3" />
      </n-form-item>
    </n-grid-item>
    <n-grid-item>
      <n-form-item label="Сумма к оплате" path="name">
        <n-input v-model:value="formData.name" placeholder="4" />
      </n-form-item>
    </n-grid-item>
  </n-grid>
  <n-button type="primary" @click="handleSubmit"> Сохранить </n-button>
</template>

<script setup>
import { ref } from 'vue'
import { NFormItem, NInput, NButton, NH2 } from 'naive-ui'

const formData = ref({
  name: '',
  email: '',
  country: null,
  agreement: false,
})

const handleSubmit = () => {
  console.log('Отправленные данные:', formData.value)
}
</script>
