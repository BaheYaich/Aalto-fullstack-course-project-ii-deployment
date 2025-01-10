import { defineConfig } from 'vite'
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    host: '0.0.0.0',
    port: 5174,
  }
});