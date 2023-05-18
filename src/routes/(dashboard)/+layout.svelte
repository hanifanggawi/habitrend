<script lang="ts">
  import '../../app.scss';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar/>
<div class="page-container">
  <slot />
</div>


<style lang="scss">
  .page-container {
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: stretch;
    height: 100vh;
    padding-left: 3em;
  }
</style>