// src/stores/auth.ts
import { defineStore } from 'pinia';
interface UserLogin {
    username: string;
    password: string;
}
export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false, // Lưu trạng thái đăng nhập
    user: {}, // Thông tin người dùng
  }),
  actions: {
    login(user : UserLogin) {
      this.isAuthenticated = true;
      this.user = user;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = {};
    },
  },
});
