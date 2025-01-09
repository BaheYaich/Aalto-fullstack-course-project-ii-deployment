<script>
  import { LightSwitch } from '@skeletonlabs/skeleton';

	let { data } = $props();
	const { user } = data;
</script>

<LightSwitch />
{#if user}
	<ul class="flex flex-row gap-4">
		<li><a class="btn hover:variant-soft-primary" href="/quiz">Quiz</a></li>
		<li><a class="btn hover:variant-soft-primary" href="/topics">Topics</a></li>
		<li>
			<form method="POST" action="/auth/logout">
				<button class="btn variant-filled" type="submit">Logout</button>
			</form>
		</li>
	</ul>
{:else}
	<div class="btn-group variant-filled">
		<a class="" href="/auth/login">Login</a>
		<a class="" href="/auth/register">Register</a>
	</div>
{/if}
