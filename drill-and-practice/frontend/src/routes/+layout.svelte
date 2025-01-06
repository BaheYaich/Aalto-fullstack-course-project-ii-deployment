<script>
	import '../app.css';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
  	import Lead from '$lib/components/unauthenticated/Lead.svelte';
	import Trail from '$lib/components/authenticated/Trail.svelte';
  	import Greeting from '$lib/components/authenticated/Greeting.svelte';
						
	let { data, children } = $props();
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
      <svelte:fragment slot="lead"><Lead /></svelte:fragment>
      <Greeting {data}></Greeting>
      <svelte:fragment slot="trail"><Trail {data}></Trail></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<section class="container mx-auto p-4 h-full grid place-items-center">
		{@render children?.()}
	</section>
</AppShell>
