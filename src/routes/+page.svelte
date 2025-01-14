<script lang="ts">
	let props = $props();
	let stats = $state(props.data.stats);
	let user = $state(props.data.user);
</script>

<article class="text-center grid gap-10">
	<h1 class="text-4xl font-bold">Quiz Application</h1>

	<p>
		Welcome to our interactive quiz platform! This application allows users to explore various topics,
		create multiple-choice questions, and test their knowledge through engaging quizzes. Whether you're
		interested in Science, Video Games, Music, Geography, Comedy, or Philosophy, there's something here
		for everyone.
	</p>

	<p>
		<b>Key Features:</b>
	</p>
	<ul class="list-none mt-4 space-y-2">
		<li>✨ Create and manage quiz topics</li>
		<li>📝 Add multiple-choice questions</li>
		<li>🎯 Take quizzes and track your progress</li>
		<li>📊 View your performance statistics</li>
		<li>🔄 Practice mode for continuous learning</li>
	</ul>

	<div class="stats-container grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
		<div class="stat-card p-6 rounded-lg bg-surface-100-800-token">
			<h3 class="text-2xl font-bold">{stats.topicCount}</h3>
			<p>Topics Available</p>
		</div>
		<div class="stat-card p-6 rounded-lg bg-surface-100-800-token">
			<h3 class="text-2xl font-bold">{stats.questionCount}</h3>
			<p>Total Questions</p>
		</div>
		<div class="stat-card p-6 rounded-lg bg-surface-100-800-token">
			<h3 class="text-2xl font-bold">{stats.answerCount}</h3>
			<p>Questions Answered</p>
		</div>
	</div>

	{#if !user}
		<p>
			Ready to start? <a class="anchor" href="/auth/register">Register</a> for a new account or 
			<a class="anchor" href="/auth/login">log in</a> if you're already a member!
		</p>
	{/if}
</article>

<style>
	.stat-card {
		transition: transform 0.2s ease-in-out;
	}

	.stat-card:hover {
		transform: translateY(-5px);
	}

	ul li {
		opacity: 0.9;
	}
</style>


