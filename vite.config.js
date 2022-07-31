import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import path from 'path';

const defaultConfig = {
  server: {
    port: 8080,
    hot: true,
    proxy: {
      '/api': 'http://localhost:8000'
    }
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap' : path.resolve(__dirname, 'node_modules/bootstrap')
    }
  },
}

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     port: 8080,
//     hot: true,
//     proxy: {
//       '/api': 'http://localhost:8000'
//     }
//   },
//   plugins: [vue()],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url)),
//       '~bootstrap' : path.resolve(__dirname, 'node_modules/bootstrap')
//     }
//   },
// });

export default defineConfig(({ command, mode, ssrBuild }) => {
  if (command === 'serve') {

    const isDev = mode === 'development'

    return {
      ...defaultConfig
    }
  } else {
    return defaultConfig
  }
});
