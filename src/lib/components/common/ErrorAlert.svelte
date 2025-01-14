<script lang="ts">
    import { fade } from 'svelte/transition';
    import { errorState } from '$lib/state/errorState.svelte';
</script>

{#if errorState.getMessage() && errorState.getVisible()}
    <div class="alert variant-ghost-error mb-4" transition:fade={{ duration: 200 }}>
        {errorState.getMessage()}
    </div>
{/if} 