import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 将 '@' 指向 'src' 文件夹
      '@packages': path.resolve(__dirname, './packages'), // 自定义其他别名
    },
  },
})
