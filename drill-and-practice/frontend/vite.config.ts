import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    postcss: './postcss.config.js'
  },
  test: {
    include: ['src/**/*.{test,spec}.{js,ts}']
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
  }
} as UserConfig);