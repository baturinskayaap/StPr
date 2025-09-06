<template>
  <div class="meter-container">
    <n-h1>Панель администратора</n-h1>

    <n-card>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :bordered="true"
        :pagination="pagination"
        :rowProps="rowProps"
      />
    </n-card>
  </div>
</template>

<script setup>
import { NH1, NCard, NDataTable, NTag } from 'naive-ui'
import { store } from '@/stores/counter'
import { computed, h } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

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
      const user = store.state.user
      return user ? `${user.lastName} ${user.firstName} (ID: ${row.userId})` : row.userId
    },
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

  store.state.contracts.forEach((contract) => {
    const totalPenalty = contract.meters.reduce((sum, meter) => sum + meter.penalty, 0)

    data.push({
      contractId: contract.id,
      userId: store.state.user?.id || 'N/A',
      totalPenalty,
    })
  })

  return data
})

const rowProps = (row) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => handleRowClick(row),
  }
}

const handleRowClick = (row) => {
  router.push({
    name: 'AdminUserInfo',
    params: { userId: row.userId },
  })
}
</script>
