import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import type { ConfigEnv } from 'vite'
import { resolve } from 'path'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar',
            ],
          },
        ],
        dts: 'src/types/auto-import.d.ts',
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        extensions: ['vue'],
        // 配置文件生成位置
        dts: 'src/types/components.d.ts',
      }),
    ],
    resolve: {
      // 路径别名
      alias: {
        '@': resolve(__dirname, 'src'),
      },
      // 使用路径别名时想要省略的后缀名，可以自己增减
      extensions: ['.js', '.json', '.ts', '.vue'],
    },
    assetsInclude: ['./src/assets'],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/css/common.less";`,
        },
        less: {
          javascriptEnabled: true,
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              'src/assets/style/variables.less',
            )}";`,
          },
        },
      },
    },
    // 服务器
    server: {
      // 配置代理服务器
      proxy: {
        '/api': {
          target: env.VITE_APP_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
