<script lang="ts">
	import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
	import SuccessAlert from '$lib/components/common/SuccessAlert.svelte';
	import { errorState } from '$lib/state/errorState.svelte';
	import { successState } from '$lib/state/successState.svelte';
	
	type FormProps = {
		data: { user: null };
		form: { 
			errors?: { message: string };
			data?: { email: string; password: string };
			success?: boolean;
			successMessage?: string;
		} | null;
	};
	
	let props = $props();
	let email = $state(props.form?.data?.email ?? '');
	let password = $state(props.form?.data?.password ?? '');

	$effect(() => {
		if (props.form?.errors?.message) {
			errorState.showError(props.form.errors.message);
			email = props.form?.data?.email ?? email;
			password = props.form?.data?.password ?? password;
		}

		if (props.form?.success && props.form?.successMessage) {
			successState.showSuccess(props.form.successMessage);
		}
	});
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Trivial Pursuit! - Register</title>
</svelte:head>

<article class="container">
	<h1 class="big-ass-heading gradient-heading">Sign up</h1>

	<ErrorAlert />
	<SuccessAlert />

	<form 
		method="POST" 
		class="form-container flex flex-col gap-4 w-full max-w-md mx-auto"
	>
		<div class="flex flex-col gap-2">
			<label for="email">Email:</label>
			<input 
				class="input variant-form-material" 
				id="email" 
				type="email" 
				name="email" 
				bind:value={email}
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
				bind:value={password}
				required 
			/>
		</div>

		<button 
			class="btn variant-form-material w-full" 
			type="submit"
		>
			Register
		</button>
	</form>

	<div class="text-center mt-4">
		<a class="anchor hover:underline" href="/auth/login">Already registered? Login here.</a>
	</div>
</article>
