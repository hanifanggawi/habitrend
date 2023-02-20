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