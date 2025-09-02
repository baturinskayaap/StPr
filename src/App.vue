<template>
  <n-layout>
    <HeaderCmp v-if="showHeader" />
    <n-layout-content>
      <router-view />
    </n-layout-content>
  </n-layout>
</template>

<script setup>
import { NLayout, NLayoutContent } from 'naive-ui'
import HeaderCmp from '@/components/HeaderCmp.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const showHeader = computed(() => route.meta.requiresAuth)
</script>
