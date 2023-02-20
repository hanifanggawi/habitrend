<script lang="ts">
	import Calendar from '$lib/components/Calendar.svelte';
	import Sidepanel from '$lib/components/Sidepanel.svelte';
	import type { HabitRecord } from '@prisma/client';
	import { showSidepanel } from '../../../../store';
	import type { PageData } from './$types';
    
	export let data: PageData
	const habitRecords: HabitRecord[] = data.habitRecords
</script>

<Calendar habitRecords={habitRecords}/>
{#if $showSidepanel}
	<Sidepanel/>
{/if}