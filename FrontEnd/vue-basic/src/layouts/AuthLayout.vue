<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
    <header class="w-full bg-gray-600 px-5 py-2.5 flex flex-row items-center justify-between">
      <div class="w-8 bg-white h-8 flex flex-col items-center justify-center rounded-md">
        <img alt="Vue logo" class="block w-5 h-5" src="@/assets/logo.svg" width="40" height="40" />
      </div>
    </header>
    <div class="w-full px-5">
      <RouterView />
    </div>
  </template>