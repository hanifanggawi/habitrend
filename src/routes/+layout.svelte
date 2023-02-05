<script>
  import '../app.scss';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="page-container">
  <Navbar/>
  <slot />
</div>


<style lang="scss">
  .page-container {
    display: grid;
    grid-template-columns: 5em auto 1fr;
    min-height: 100vh;
    justify-content: stretch;
  }
</style>