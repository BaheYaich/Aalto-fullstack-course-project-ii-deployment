<script>
    let { data } = $props()
    let topicName = $state('');
  </script>
  
  {#if data.user.admin}
    <h1>Add a Topic</h1>
    <form method="POST" action="?/addTopic">
      <label for="name">Name:</label><br />
      <input id="name" name="name" type="text" bind:value={topicName} /><br />
      <input type="submit" value="Add" />
    </form>
  {/if}
  
  <h2>Topics</h2>
  
  {#if data.topics.length > 0}
    <ul>
      {#each data.topics as topic}
        <li>
          <a href={`/topics/${topic.id}`}>{topic.name}</a>
          {#if data.user.admin}
            <form method="POST" action="?/deleteTopic">
                <input type="hidden" name="id" value={topic.id} />
                <input type="submit" value="Delete!" />
            </form>
          {/if}
        </li>
      {/each}
    </ul>
  {:else}
    <p>None have been created.</p>
  {/if}