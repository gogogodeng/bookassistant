import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/bookhelper/',
  plugins: [vue()],
  build: {
    outDir: '../' // 打包文件的输出目录
  }
})
