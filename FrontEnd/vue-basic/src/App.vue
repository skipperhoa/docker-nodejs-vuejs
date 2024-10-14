<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="w-full bg-gray-600 px-5 py-2.5 flex flex-row items-center justify-between">
    <div class="w-8 bg-white h-8 flex flex-col items-center justify-center rounded-md">
      <img alt="Vue logo" class="block w-5 h-5" src="@/assets/logo.svg" width="40" height="40" />
    </div>
    <nav class="flex-1 flex flex-row justify-items-end">
      <ul class="w-full flex flex-row items-center justify-end gap-5">
        <li class="text-white"><RouterLink to="/">Home</RouterLink></li>
        <li class="text-white"><RouterLink to="/about">Product</RouterLink></li>
      </ul>
    </nav>
  </header>
  <div class="w-full px-5">
    <RouterView />
  </div>
</template>

<style scoped>

</style>
