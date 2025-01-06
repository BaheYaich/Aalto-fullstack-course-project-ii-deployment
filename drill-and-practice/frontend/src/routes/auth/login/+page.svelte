<script lang="ts">
	import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
	import { errorState } from '$lib/state/errorState.svelte';
	
	type FormProps = {
		data: { user: null };
		form: { errors?: { message: string } } | null;
	};
	
	let props: FormProps = $props();

	$effect(() => {
		if (props.form?.errors?.message) {
			errorState.showError(props.form.errors.message);
		}
	});
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Trivial Pursuit! - Log in</title>
</svelte:head>

<article class="container">
	<h1 class="big-ass-heading gradient-heading">Sign in</h1>

	<ErrorAlert />

	<form method="POST" class="form-container flex flex-col gap-4 w-full max-w-md mx-auto">
		<div class="flex flex-col gap-2">
			<label for="email">Email:</label>
			<input 
				class="input variant-form-material" 
				id="email" 
				type="email" 
				name="email" 
				required 
			/>
		</div>

		<div class="flex flex-col gap-2">
			<label for="password">Password:</label>
			<input 
				class="input variant-form-material" 
				id="password" 
				type="password" 
				name="password" 
				required 
			/>
		</div>

		<button 
			class="btn variant-form-material w-full" 
			type="submit"
		>
			Sign in
		</button>
	</form>

	<div class="text-center mt-4">
		<a class="anchor hover:underline" href="/auth/register">Not yet registered? Register here.</a>
	</div>
</article>
