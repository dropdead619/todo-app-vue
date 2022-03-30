// vite.config.js

import { defineConfig } from 'vite';
import path from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/, /\.vue\?vue/, // .vue
        /\.md$/, // .md
      ],

      // global imports to register
      imports: [
        // presets
        'vue',
        'vue-router',
        'vuex',
        // custom
        {
          '@vueuse/core': [
            // named imports
            'useDark', // import { useDark } from '@vueuse/core',
            'useMediaQuery', // import { useMediaQuery } from '@vueuse/core',
            'useToggle', // import { useToggle } from '@vueuse/core',
          ],
        },
      ],

      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },

      // Filepath to generate corresponding .d.ts file.
      // Defaults to './auto-imports.d.ts' when `typescript` is installed locally.
      // Set `false` to disable.
      dts: false,
    })],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
