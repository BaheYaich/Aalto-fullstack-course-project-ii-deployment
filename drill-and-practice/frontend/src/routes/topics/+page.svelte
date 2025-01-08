<script lang="ts">
	import { onMount } from 'svelte';
	import ErrorAlert from '$lib/components/common/ErrorAlert.svelte';
	import { errorState } from '$lib/state/errorState.svelte';

	// Gradient generation utility
	function generateUniqueGradient() {
		// Generate random, vibrant colors
		const hue1 = Math.floor(Math.random() * 360);
		const hue2 = (hue1 + 120) % 360; // Complementary color

		const color1 = `hsl(${hue1}, 70%, 60%)`;
		const color2 = `hsl(${hue2}, 70%, 60%)`;

		return `linear-gradient(135deg, ${color1}, ${color2})`;
	}

	type Topic = {
		id: number;
		name: string;
		gradient?: string;
	};

	let props = $props();
	let topicName = $state(props.form?.data?.name ?? '');
	let addForm = $state<HTMLFormElement | null>(null);

	let topicsWithGradients: Topic[] = $state([]);

	$effect(() => {
		// Generate unique gradients for each topic
		topicsWithGradients = props.data.topics.map((topic: Topic) => ({
			...topic,
			gradient: generateUniqueGradient()
		}));
	});

	$effect(() => {
		if (props.form?.errors?.form) {
			errorState.showError(props.form.errors.form);
			topicName = props.form?.data?.name ?? topicName;
		}
	});
</script>

<div class="topics-container w-full p-4 md:p-8">
	<article class="relative">
		<ErrorAlert />

		<h1 class="text-4xl font-bold mb-8 text-center">Topics</h1>

		{#if props.data.user?.admin}
			<form 
				bind:this={addForm}
				class="form-container flex flex-row gap-2 mb-8 w-full" 
				method="POST" 
				action="?/addTopic"
			>
				<input 
					class="input variant-form-material w-full" 
					id="name" 
					name="name" 
					type="text" 
					bind:value={topicName} 
					required 
				/>
				<button class="btn variant-form-material" type="submit">Add</button>
			</form>
		{/if}
	</article>
	
	<div class="grid 
		grid-cols-1 
		sm:grid-cols-2 
		md:grid-cols-3 
		lg:grid-cols-4 
		gap-8">
		{#each topicsWithGradients as topic}
			<a 
				href={`/topics/${topic.id}/questions`} 
				class="topic-card 
					relative
					rounded-xl 
					shadow-lg 
					overflow-hidden 
					transform 
					transition-all 
					duration-300 
					hover:scale-105 
					hover:shadow-2xl
					p-10
					block
					no-underline"
				style="background: {topic.gradient}"
			>
				{#if props.data.user?.admin}
					<form 
						method="POST" 
						action="?/deleteTopic" 
						class="absolute top-4 right-4 z-10 
							   delete-topic-btn"
					>
						<input type="hidden" name="id" value={topic.id} />
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
				<div class="h-full flex items-center justify-center">
					<h2 class="text-3xl font-bold text-white drop-shadow-md text-center capitalize">
						{topic.name}
					</h2>
				</div>
			</a>
		{/each}
	</div>
</div>

<style>
	.delete-topic-btn {
		opacity: 1;
	}
</style>