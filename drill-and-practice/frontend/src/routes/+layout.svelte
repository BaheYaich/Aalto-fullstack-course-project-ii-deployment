<script>
	import Navbar from '$lib/components/authenticated/Navbar.svelte';
	let { data, children } = $props();
</script>

<Navbar {data} />

<main class="main-container">
	{@render children?.()}
	<!-- Render the children slot -->
</main>

<style>
	main.main-container {
		padding: 5rem 1rem 5rem 1rem;
		max-width: 1200px;
		margin: 0 auto;
		display: grid;
		place-items: start;
    grid-template-columns: 1fr;
    width: 100%;
	}
</style>
