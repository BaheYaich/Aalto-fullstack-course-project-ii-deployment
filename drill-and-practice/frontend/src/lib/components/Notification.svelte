<script lang="ts">
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    
    export let message: string;
    export let type: 'success' | 'error';
    export let duration = 5000;
    
    let visible = true;
    
    onMount(() => {
        const timer = setTimeout(() => {
            visible = false;
        }, duration);

        return () => clearTimeout(timer);
    });
</script>

{#if visible}
    <div 
        class="notification {type}"
        transition:fade={{ duration: 200 }}
    >
        {message}
    </div>
{/if}

<style>
    .notification {
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 4px;
    }
    
    .success {
        background-color: rgb(220, 252, 231);
        color: rgb(22, 101, 52);
    }
    
    .error {
        background-color: rgb(254, 226, 226);
        color: rgb(185, 28, 28);
    }
</style> 