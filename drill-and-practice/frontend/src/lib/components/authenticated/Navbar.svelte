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
          <input type="submit" value="Logout" />
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