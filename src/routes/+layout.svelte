<script>
  import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="main-container">
  <Navbar/>
  <slot />
</div>


<style lang="scss">
  .main-container {
    display: grid;
    grid-template-columns: 5em auto 1fr;
    min-height: 100vh;
    justify-content: stretch;
  }
</style>