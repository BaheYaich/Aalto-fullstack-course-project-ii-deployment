/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
    plugins: [sveltekit()],
    test: {
        include: [
            'src/lib/**/*.{test,spec}.{js,ts}',
            'src/lib/**/tests/**/*.{test,spec}.{js,ts}'
        ],
        environment: 'jsdom',
        setupFiles: ['src/tests/unit/setup.ts'],
        globals: true
    },
    resolve: {
        alias: {
            $lib: '/src/lib'
        }
    }
}); 