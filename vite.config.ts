import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const { resolve } = require('path')

function _resolve(path: string): string {
  return resolve(__dirname, path)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    // 配置别名
    alias: {
      '@': _resolve('./src'),
    },
  },
})
