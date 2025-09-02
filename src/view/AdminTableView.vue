<template>
  <div class="admin-dashboard">
    <n-h1>Панель администратора</n-h1>

    <n-card>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :bordered="true"
        :pagination="pagination"
      />
    </n-card>
  </div>
</template>

<script setup>
import { NH1, NCard, NDataTable, NTag } from 'naive-ui'
import { store } from '@/stores/counter'
import { computed, h } from 'vue'

const columns = [
  {
    title: 'Номер договора',
    key: 'contractId',
    sorter: (a, b) => a.contractId - b.contractId,
  },
  {
    title: 'Идентификатор пользователя',
    key: 'userId',
    render: (row) => {
      const user = store.users.find((u) => u.id === row.userId)
      return user ? `${user.lastName} ${user.firstName} (ID: ${row.userId})` : row.userId
    },
  },
  {
    title: 'Дата последней передачи',
    key: 'lastReadingDate',
    render: (row) => row.lastReadingDate || 'Не передавались',
  },
  {
    title: 'Сумма пенальти',
    key: 'totalPenalty',
    render: (row) => `${row.totalPenalty.toFixed(2)} руб.`,
    sorter: (a, b) => a.totalPenalty - b.totalPenalty,
  },
  {
    title: 'Статус',
    key: 'status',
    render: (row) => {
      const hasPenalty = row.totalPenalty > 0
      return h(
        NTag,
        {
          type: hasPenalty ? 'error' : 'success',
        },
        {
          default: () => (hasPenalty ? 'Есть задолженность' : 'Оплачено'),
        },
      )
    },
  },
]

const pagination = {
  pageSize: 10,
}

const tableData = computed(() => {
  const data = []

  store.contracts.forEach((contract) => {
    const user = store.users.find((u) => u.contracts.includes(contract.id))

    if (user) {
      const totalPenalty = contract.meters.reduce((sum, meter) => sum + meter.penalty, 0)
      const lastReadingDate = getLastReadingDate(contract)

      data.push({
        contractId: contract.id,
        userId: user.id,
        lastReadingDate,
        totalPenalty,
      })
    }
  })

  return data
})

function getLastReadingDate() {
  //contract
  const daysAgo = Math.floor(Math.random() * 30)
  const date = new Date()
  date.setDate(date.getDate() - daysAgo)

  return date.toLocaleDateString('ru-RU')
}
</script>

<style scoped>
.admin-dashboard {
  padding: 20px;
}
</style>
