<article class="container">
	<h1>Sign in</h1>

	<form method="POST">
		<label for="email">Email:</label>
		<input id="email" type="email" name="email" required />

		<label for="password">Password:</label>
		<input id="password" type="password" name="password" required />

		<button class="button" type="submit">Login</button>
	</form>

	<a href="/auth/register">Not yet registered? Register here.</a>
</article>

<style>
	.container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
    margin: 0 auto;
		max-width: 400px;
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

	input {
		padding: 0.5rem;
		border: 1px solid var(--bg-tertiary);
		background-color: var(--bg-primary);
		color: var(--text-primary);
		border-radius: 4px;
	}

  .button {
		border: none;
		cursor: pointer;
	}

	.button:hover {
		background-color: var(--accent-secondary);
	}
</style>
