import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter({
			runtime: 'nodejs18.x',
			edge: false,
			split: false,
			external: [],
		}),
		files: {
			assets: 'static',
			lib: 'src/lib',
			routes: 'src/routes',
			appTemplate: 'src/app.html'
		}
	}
};

export default config;