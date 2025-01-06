<script lang="ts">
    import { successState } from '$lib/state/successState.svelte';
    import { fade } from 'svelte/transition';
</script>

{#if $successState.message}
    <div 
        transition:fade={{ duration: 200 }}
        class="alert variant-ghost-success flex justify-between items-center p-4 mb-4"
    >
        <div class="flex-grow">
            {$successState.message}
        </div>
    </div>
{/if} 