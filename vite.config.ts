/// <reference types="vitest" />

import path from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Layouts from 'vite-plugin-vue-layouts'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { AntDesignVueResolver, VantResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    Vue({
      reactivityTransform: true,
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages(),

    // https://github.com/JohnCampionJr/vite-plugin-vue-layouts
    Layouts(),

    // https://github.com/antfu/unplugin-auto-import
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
      ],
      dts: true,
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    // https://github.com/antfu/vite-plugin-components
    Components({
      dts: true,
      resolvers: [VantResolver(), AntDesignVueResolver()],
    }),

    // https://github.com/antfu/unocss
    // see unocss.config.ts for config
    Unocss(),

    // https://github.com/vuejs/babel-plugin-jsx
    // options are passed on to @vue/babel-plugin-jsx
    VueJsx({
      optimize: true,
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://interface.muwai.com',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },

  // https://github.com/vitest-dev/vitest
  test: {
    environment: 'jsdom',
  },
})
