import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const { resolve } = require('path')

function _resolve(path: string): string {
  return resolve(__dirname, path)
}

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, __dirname)
  return {
    base: './',
    plugins: [
      vue(), 
      vueJsx(),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
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
