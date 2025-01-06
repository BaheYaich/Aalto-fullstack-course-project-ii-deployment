<script lang="ts">
	import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
	import { errorState } from '$lib/state/errorState.svelte';
	
	type FormProps = {
		data: { 
			questions: any[];
			topic: { name: string };
			user: any;
		};
		form: { errors?: { form: string } } | null;
	};
	
	let props = $props();
	let question_text = $state('');
	let addForm = $state<HTMLFormElement | null>(null);

	$effect(() => {
		if (props.form?.errors?.form) {
			errorState.showError(props.form.errors.form);
		}
	});
</script>

<a href="/topics" class="no-underline">
	<h1 class="big-ass-heading gradient-heading hover:scale-[1.02] transition-transform">
		{props.data.topic?.name} Questions
	</h1>
</a>

<article class="relative">
	<ErrorAlert />

	{#if props.data.user?.admin}
		<form 
			bind:this={addForm}
			class="form-container flex flex-row gap-2" 
			method="POST" 
			action="?/addQuestion"
		>
			<input 
				class="input variant-form-material" 
				id="question_text" 
				name="question_text" 
				type="text" 
				bind:value={question_text} 
				required 
			/>
			<button class="btn variant-form-material" type="submit">Add Question</button>
		</form>
	{/if}
</article>

<article class="questions-container">
	<div class="questions">
		{#if props.data.questions.length > 0}
			<ul class="flex flex-col gap-2">
				{#each props.data.questions as question}
					<li class="flex flex-row gap-2">
						<a class="btn variant-filled variant-filled-primary" href={`topics/${question.topic_id}/questions/${question.id}`}>{question.question_text}</a>
						{#if props.data.user?.admin}
							<form method="POST" action="?/deleteQuestion">
								<input type="hidden" name="id" value={question.id} />
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