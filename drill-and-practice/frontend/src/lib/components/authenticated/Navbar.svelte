<script>
  let { data } = $props();
  const { user } = data;
</script>

<nav>
  <a href="/">Home</a>

  {#if user}
    <p>Welcome, {user.email}!</p>
    <ul>
      <li><a href="/topics">Topics</a></li>
      <li>
        <!-- Logout form using POST method -->
        <form method="POST" action="/auth/logout">
          <button class="button" type="submit">Logout</button>
        </form>
      </li>
    </ul>
  {:else}
    <p>Hello, Stranger!</p>
    <ul>
      <li><a href="/auth/login">Login</a></li>
      <li><a href="/auth/register">Register</a></li>
    </ul>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--bg-secondary);
    border-bottom: 1px solid var(--bg-tertiary);
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 100;

    p {
      margin: 0;
    }

    a {
      color: var(--text-primary);
      text-decoration: none;
    }

    ul {
      display: flex;
      align-items: center;
      gap: 1rem;
      list-style: none;
      margin: 0;
      padding: 0;
    }
  }
</style>

