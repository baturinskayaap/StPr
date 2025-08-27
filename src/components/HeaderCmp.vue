<template>
  <n-grid :cols="2" class="foreground">
    <n-grid-item class="header">
      <n-icon>
        <Lightning />
      </n-icon>
      <span>Личный кабинет</span>
    </n-grid-item>

    <n-grid-item class="header" style="justify-self: end">
      <n-icon>
        <Lightning />
      </n-icon>
      <span>Личный кабинет</span>
    </n-grid-item>
  </n-grid>
</template>

<script setup>
import { NGrid, NGridItem, NIcon } from 'naive-ui'
import { Lightning } from '@vicons/carbon'
</script>
