<script lang="ts">
	let { data } = $props();
	const { user } = data;

	function getNameFromEmail(email: string) {
		return email ? email.split('@')[0] : 'Stranger';
	}
</script>

{#if user}
	<p class="capitalize">Welcome, {getNameFromEmail(user.email)}!</p>
{:else}
	<p>Hello, Stranger!</p>
{/if}
