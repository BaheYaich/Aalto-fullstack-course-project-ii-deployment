<script lang="ts">
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '@sveltejs/kit';
	import Notification from '$lib/components/Notification.svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	let form = $props<{ data?: any }>();

	let email = $state('');
	let password = $state('');
	let isSubmitting = $state(false);
	let notificationKey = $state(0);
	let notification = $state<{ type: 'success' | 'error'; message: string } | null>(null);

	// Reset notification when user starts typing
	$effect(() => {
		if (email || password) {
			notification = null;
		}
	});

	const handleSubmit: SubmitFunction = () => {
		isSubmitting = true;

		return async ({ result }) => {
			isSubmitting = false;

			if (result.type === 'success') {
				notificationKey++;
				notification = {
					type: 'success',
					message: result.data?.message ?? 'Registration successful'
				};
				email = '';
				password = '';
				if (result.data?.redirect) {
					goto(result.data.redirect);
				}
			} else if (result.type === 'failure') {
				const errors = (result.data?.errors as Record<string, string>) || {};
				notificationKey++;
				notification = {
					type: 'error',
					message: Object.values(errors)[0]?.toString() || 'Registration failed'
				};
			}
		};
	};
</script>

{#if notification}
	{#key notificationKey}
		<Notification message={notification.message} type={notification.type} />
	{/key}
{/if}

<article class="container">
	<h1>Sign up</h1>
	<form method="POST" use:enhance={handleSubmit}>
		<label for="email">Email:</label>
		<input
			type="email"
			id="email"
			name="email"
			bind:value={email}
			required
			class:error-field={form?.errors?.email}
		/>
		{#if form?.errors?.email}
			<p class="error" transition:fade>{form.errors.email}</p>
		{/if}

		<label for="password">Password:</label>
		<input
			type="password"
			id="password"
			name="password"
			bind:value={password}
			required
			class:error-field={form?.errors?.password}
		/>
		{#if form?.errors?.password}
			<p class="error" transition:fade>{form.errors.password}</p>
		{/if}

		<button class="button" type="submit" disabled={isSubmitting}>
			{isSubmitting ? 'Registering...' : 'Register'}
		</button>
	</form>
	<a href="/auth/login">Already registered? Login here.</a>
</article>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 400px;
		margin: 0 auto;
		padding: 2rem;
		background-color: var(--bg-secondary);
		border-radius: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        width: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	.error {
		color: var(--error);
		font-size: 0.875rem;
		margin-top: 0.25rem;
	}

	input {
		padding: 0.5rem;
		border: 1px solid var(--bg-tertiary);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		border-radius: 4px;
	}

	input.error-field {
		border-color: var(--error);
	}

	.button:hover {
		background-color: var(--accent-secondary);
	}
</style>
