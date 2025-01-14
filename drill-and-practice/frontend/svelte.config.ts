import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { sveltePreprocess } from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		sveltePreprocess()
	],
	kit: {
		adapter: adapter({
			runtime: 'edge',
			regions: ['fra1']  // Frankfurt region for EU compliance
		})
	}
};

export default config;