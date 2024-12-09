<script>
    import Navbar from '$lib/components/authenticated/Navbar.svelte';
    let { data, children } = $props(); // Use $props to get data and children
  </script>
  
  <Navbar {data} />  <!-- Pass data to the Navbar component -->
  
  <div class="container">
    {@render children?.()} <!-- Render the children slot -->
  </div>