<script lang="ts">
	import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
	import { errorState } from '$lib/state/errorState.svelte';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalStore, ModalSettings } from '@skeletonlabs/skeleton';
	import OptionsModal from './[questionId]/options/OptionsModal.svelte';
	
	function generateUniqueGradient() {
		const hue1 = Math.floor(Math.random() * 360);
		const hue2 = (hue1 + 120) % 360;

		const color1 = `hsl(${hue1}, 70%, 60%)`;
		const color2 = `hsl(${hue2}, 70%, 60%)`;

		return `linear-gradient(135deg, ${color1}, ${color2})`;
	}

	type FormProps = {
		data: { 
			questions: any[];
			topic: { name: string, id: number };
			user: any;
		};
		form: { 
				errors?: { form: string };
				data?: { question_text: string };
		} | null;
	};
	
	let props = $props();
	let question_text = $state(props.form?.data?.question_text ?? '');
	let addForm = $state<HTMLFormElement | null>(null);

	type Question = {
		id: number;
		question_text: string;
		user_id: number;
		gradient?: string;
	};

	let questionsWithGradients = $state(
		props.data.questions.map((question: Question) => ({
			...question,
			gradient: generateUniqueGradient()
		}))
	);

	$effect(() => {
		if (props.form?.errors?.form) {
			errorState.showError(props.form.errors.form);
			question_text = props.form?.data?.question_text ?? question_text;
		}
	});

	function openOptionsModal(questionId: number, questionText: string) {
		const modal: ModalSettings = {
			type: 'component',
			component: {
				ref: OptionsModal,
				props: {
					topicId: props.data.topic.id,
					questionId: questionId,
					questionText: questionText
				}
			},
			backdropClasses: 'bg-black/95',
			modalClasses: 'w-modal-wide max-w-2xl'
		};
		modalStore.trigger(modal);
	}

	const modalStore = getModalStore();
</script>

<a href="/topics" class="no-underline">
	<h1 class="big-ass-heading gradient-heading hover:scale-[1.02] transition-transform">
		{props.data.topic?.name} Questions
	</h1>
</a>

<article class="relative w-full">
	<ErrorAlert />

	{#if props.data.user}
		<form 
			bind:this={addForm}
			class="form-container flex flex-row gap-2 mb-8 w-full" 
			method="POST" 
			action="?/addQuestion"
		>
			<input 
				class="input variant-form-material w-full" 
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

<div class="grid 
	grid-cols-1 
	sm:grid-cols-2 
	md:grid-cols-3 
	gap-8">
	{#each questionsWithGradients as question}
		<div 
			class="question-card 
				relative
				rounded-xl 
				shadow-lg 
				overflow-hidden 
				transform 
				transition-all 
				duration-300 
				hover:scale-105 
				hover:shadow-2xl
				p-10"
			style="background: {question.gradient}"
		>
			<button 
				class="w-full h-full text-left"
				onclick={() => openOptionsModal(question.id, question.question_text)}
			>
				<h2 class="text-3xl font-bold text-white drop-shadow-md text-center">
					{question.question_text}
				</h2>
			</button>

			{#if props.data.user && (props.data.user.admin || props.data.user.id === question.user_id)}
				<form 
					method="POST" 
					action="?/deleteQuestion" 
					class="absolute top-4 right-4 z-10 
							delete-question-btn"
				>
					<input type="hidden" name="id" value={question.id} />
					<button 
						type="submit"
						class="bg-red-500 text-white rounded-full w-8 h-8 
								flex items-center justify-center 
								hover:bg-red-600 
								focus:outline-none 
								shadow-md"
					>
						<span class="text-lg font-bold">&times;</span>
					</button>
				</form>
			{/if}
		</div>
	{/each}
</div>

<style>
	.delete-question-btn {
		opacity: 1;
	}
</style>