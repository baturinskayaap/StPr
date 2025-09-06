<template>
  <n-config-provider>
    <n-message-provider>
      <n-layout>
        <HeaderCmp v-if="showHeader" />
        <n-layout-content>
          <router-view />
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<script setup>
import { NConfigProvider, NLayout, NLayoutContent, NMessageProvider } from 'naive-ui'
import HeaderCmp from '@/components/HeaderCmp.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const showHeader = computed(() => route.meta.requiresAuth)
</script>
