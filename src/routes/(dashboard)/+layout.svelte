<script lang="ts">
  import '../../app.scss';
	import Navbar from '$lib/components/Navbar.svelte';
	import { onMount } from 'svelte';
	import { supabaseClient } from '$lib/database/supabase';
	import { invalidateAll } from '$app/navigation';

  onMount(() => {
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(() => {
      invalidateAll()
    })

    return () => {
      subscription.unsubscribe();
    }
  })
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