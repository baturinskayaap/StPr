<template>
  <n-layout-header bordered class="header">
    <n-icon size="24">
      <Lightning />
    </n-icon>
    <span>Личный кабинет</span>

    <div v-if="store.auth.isLoggedIn">
      <span v-if="store.auth.currentUser">
        {{ store.auth.currentUser.lastName }}
      </span>
      <n-button @click="handleLogout" text>
        <n-icon>
          <Exit />
        </n-icon>
      </n-button>
    </div>
  </n-layout-header>
</template>

<script setup>
import { NLayoutHeader, NIcon, NButton } from 'naive-ui'
import { Lightning, Exit } from '@vicons/carbon'
import { store } from '@/stores/counter'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleLogout = () => {
  store.logout()
  router.push('/login')
}
</script>
