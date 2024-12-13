<script>
	let { data } = $props();
	let topicName = $state('');
</script>

<h1 class="title">Topics</h1>

<article>
	{#if data.user?.admin}
		<h1>Add a Topic</h1>
		<form method="POST" action="?/addTopic">
			<label for="name">Name:</label>
			<input id="name" name="name" type="text" bind:value={topicName} />
			<input type="submit" value="Add" />
		</form>
	{/if}
</article>
<article class="topics-container">
	<div class="topics">
		{#if data.topics.length > 0}
			<ul>
				{#each data.topics as topic}
					<li>
						<a href={`/topics/${topic.id}`}>{topic.name}</a>
						{#if data.user?.admin}
							<form method="POST" action="?/deleteTopic">
								<input type="hidden" name="id" value={topic.id} />
								<button type="submit">Delete!</button>
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

<style>
	.title {
		text-transform: capitalize;
		font-weight: 900;
		background: linear-gradient(
			135deg,
			#ff0000 0%,
			#ff8000 15%,
			#ffff00 30%,
			#00ff00 45%,
			#00ffff 60%,
			#0080ff 75%,
			#8000ff 90%,
			#ff00ff 100%
		);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
		margin: 4rem 0;
		padding: 2rem;
		text-align: center;
		width: 100%;
		font-size: clamp(3rem, 8vw + 1rem, 7rem);
		line-height: 1;
		letter-spacing: -0.03em;
		position: relative;
	}
	article {
		padding: 1rem;
		max-width: 400px;
		margin: 0 auto;
		display: grid;
		place-items: center;
		gap: 1rem;
		border-radius: 4px;
		width: 100%;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		width: 100%;
	}
	.topics-container {
		display: flex;
		flex-direction: row;
		gap: 1rem;
		max-width: inherit;
		width: 100%;

		.topics {
			width: 100%;
			display: block;
			gap: 1rem;
			align-items: start;
			justify-content: center;

			ul {
				width: 100%;
				columns: 3;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				gap: 1rem;
				align-items: start;
				justify-content: center;
				list-style: none;
				padding: 0;
				margin: 0;

				li {
					width: 100%;
					display: block flex;
					flex-direction: row;
					gap: 1rem;
					align-items: center;
					justify-content: space-between;

					a {
						background-color: var(--accent-primary);
						color: var(--text-primary);
						text-decoration: none;
						width: 100%;
						text-transform: capitalize;
						padding: 0.5rem 1rem;
						border-radius: 4px;
						cursor: pointer;
						display: inline-block;
					}

					a:hover {
						background-color: var(--accent-secondary);
					}

					button {
						background-color: var(--error);
						color: var(--text-primary);
						border: none;
						padding: 0.5rem 1rem;
						border-radius: 4px;
						cursor: pointer;
					}

					button:hover {
						background-color: var(--error-dark);
					}
				}
			}
		}
	}

	input[type='text'] {
		padding: 0.5rem;
		border: 1px solid var(--bg-tertiary);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		border-radius: 4px;
	}

	input[type='submit'] {
		background-color: var(--accent-primary);
		color: var(--text-primary);
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
	}

	input[type='submit']:hover {
		background-color: var(--accent-secondary);
	}

	a {
		color: var(--accent-primary);
		text-decoration: none;
	}
	a:hover {
		color: var(--accent-secondary);
	}
</style>
