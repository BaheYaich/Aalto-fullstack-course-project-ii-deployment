import { writable } from 'svelte/store';

function createSuccessState() {
    const { subscribe, set, update } = writable({
        message: ''
    });

    return {
        subscribe,
        showSuccess: (message: string) => set({ message }),
        clear: () => set({ message: '' }),
    };
}

export const successState = createSuccessState(); 