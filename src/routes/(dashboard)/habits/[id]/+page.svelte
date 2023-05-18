<script lang="ts">
    import HabitForm from '$lib/components/HabitForm.svelte';
	import type { PageData } from '../../$types';
    
    export let data: PageData;
    const { habit } = data
</script>

<HabitForm habit={habit} action='update'/>