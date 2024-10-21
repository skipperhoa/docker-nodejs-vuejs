<template>
    <div id="app">
      <!-- Sử dụng dynamic component để chọn layout -->
      <component :is="layout">
         <router-view />
      </component>
    </div>
  </template>

  
  <script lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  
  // Import các layout
  import AuthLayout from '@/layouts/AuthLayout.vue';
  import DashboardLayout from '@/layouts/DashboardLayout.vue';
  
  export default {
    name: 'TheAppLayout',
    setup() {
      const route = useRoute(); // Lấy thông tin route hiện tại
      // Xác định layout dựa trên route hiện tại
      const layout = computed(() => {
        if (route.path.startsWith('/dashboard')) {
          return DashboardLayout;
        } else {
          return AuthLayout; // Layout mặc định cho các trang không thuộc dashboard
        }
      });
  
      return {
        layout,
      };
    },
  };
  </script>
  
  <style>
  /* Style chung cho ứng dụng */
  </style>
  