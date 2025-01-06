<script lang="ts">
	import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
	import { errorState } from '$lib/state/errorState.svelte';

	type FormProps = {
		data: { topics: any[]; user: any };
		form: { errors?: { form: string } } | null;
	};

	let props = $props();
	let topicName = $state('');
	let addForm = $state<HTMLFormElement | null>(null);

	$effect(() => {
		if (props.form?.errors?.form) {
			errorState.showError(props.form.errors.form);
		}
	});
</script>

<h1 class="big-ass-heading gradient-heading">Topics</h1>

<article class="relative">
	<ErrorAlert />

	{#if props.data.user?.admin}
		<form 
			bind:this={addForm}
			class="form-container flex flex-row gap-2" 
			method="POST" 
			action="?/addTopic"
		>
			<input class="input variant-form-material" id="name" name="name" type="text" bind:value={topicName} required />
			<button class="btn variant-form-material" type="submit">Add</button>
		</form>
	{/if}
</article>

<article class="topics-container">
	<div class="topics">
		{#if props.data.topics.length > 0}
			<ul>
				{#each props.data.topics as topic}
					<li class="flex flex-row gap-2">
						<a class="btn variant-filled variant-filled-primary capitalize" href={`/topics/${topic.id}/questions`}>{topic.name}</a>
						{#if props.data.user?.admin}
							<form method="POST" action="?/deleteTopic">
								<input type="hidden" name="id" value={topic.id} />
								<button class="btn variant-filled-error" type="submit">Delete</button>
							</form>
						{/if}
					</li>
				{/each}
			</ul>
		{:else}
			<p>None have been created.</p>
		{/if}
	</div>
</article>