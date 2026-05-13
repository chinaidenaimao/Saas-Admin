import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { loadEnv } from 'vite'
// https://vite.dev/config/
export default defineConfig(({mode}) => {
  const env=loadEnv(mode,process.cwd())
  return {
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    css:{
      preprocessorOptions:{
        scss:{
          additionalData: `@use '@/style/Variable.scss' as *;`,
        }
      }
    },
    server: {
      proxy: {
       [env.VITE_BASE_URL]: {
          target: env.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    },
  }
})
