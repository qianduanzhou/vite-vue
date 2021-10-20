import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const { resolve } = require('path')

function _resolve(path: string): string {
  return resolve(__dirname, path)
}

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, __dirname)
  return {
    plugins: [vue(), vueJsx()],
    resolve: {
      // 配置别名
      alias: {
        '@': _resolve('./src'),
      },
    },
    server: {
      proxy: {
        '/local': {
          target: env.VITE_NORMALURL,
          rewrite: path => path.replace(/^\/local/, ''),
          changeOrigin: true,
        }
      }
    }
  }
})
