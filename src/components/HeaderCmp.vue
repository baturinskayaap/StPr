<template>
  <n-grid :cols="2" class="foreground">
    <n-grid-item class="header">
      <n-icon size="24">
        <Lightning />
      </n-icon>
      <span>Личный кабинет</span>
    </n-grid-item>

    <n-grid-item v-if="store.state.isLoggedIn" class="header" style="justify-self: end">
      <span v-if="store.state.user">{{ store.state.user.lastName }}</span>
      <n-button @click="handleLogout">
        <n-icon>
          <Exit />
        </n-icon>
      </n-button>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { NGrid, NGridItem, NIcon, NButton } from 'naive-ui'
import { Lightning, Exit } from '@vicons/carbon'
import { store } from '../stores/counter'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  store.logout()
  router.push('/login')
}
</script>
