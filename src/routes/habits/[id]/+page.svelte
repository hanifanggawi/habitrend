<script lang="ts">
	import type { PageData } from './$types';
    import HabitForm from '$lib/components/HabitForm.svelte';
    
    export let data: PageData;
    const { habit } = data
</script>

<HabitForm habit={habit} action='update'/>