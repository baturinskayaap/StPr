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
    title: 'Пользователь',
    key: 'userInfo',
    render: (row) => {
      return row.user
        ? `${row.user.lastName} ${row.user.firstName} (ID: ${row.user.id})`
        : 'Неизвестный пользователь'
    },
  },
  {
    title: 'Адрес',
    key: 'address',
    render: (row) => row.address || 'Не указан',
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
  return store.state.contracts.map((contract) => {
    const totalPenalty = contract.meters?.reduce((sum, meter) => sum + (meter.penalty || 0), 0) || 0

    return {
      contractId: contract.id,
      address: contract.address,
      user: contract.user,
      totalPenalty,
    }
  })
})

const rowProps = (row) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => handleRowClick(row),
  }
}

const handleRowClick = (row) => {
  if (row.user) {
    router.push({
      name: 'AdminUserInfo',
      params: { userId: row.user.id },
    })
  }
}
</script>
