import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue'],
    }),
  ],
  // #region note：
  // 1. 如果直接寫死 /repo-name/ 在本地開發時會出錯，要根據環境來設置 base 的值
  // 2. 在 vite.config.js 中是沒有 import.meta 的，所以我們要改成使用 process.env
  // 3. NODE_ENV 是固定名稱
  // 4. process.env.NODE_ENV 會是 development 或 production
  // #endregion
  base: process.env.NODE_ENV === 'production' ? '/VueHW7/' : '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
