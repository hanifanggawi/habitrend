<script lang="ts">
	import type { HabitRecord } from "@prisma/client";
	import { habitRecordStore } from "../../store";
	import Daybox from "./Daybox.svelte";

  export let habitRecords: HabitRecord[]
  habitRecordStore.set(habitRecords)
  const today = new Date()
  const year = today.getFullYear()

  const daynames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const displayMonth = today.toLocaleString('default', { month: 'long' }).toLocaleUpperCase() + " " + year
</script>

<div class="calendar-box">
  <h1>{displayMonth}</h1>
  <div class="calendar">
    {#each daynames as dayname}
       <span class="day-label"> {dayname} </span>
    {/each}
    {#each $habitRecordStore as habitRecord (habitRecord.id)}
      <Daybox habitRecord={habitRecord}/>
    {/each}
  </div>
</div>

<style>
  .calendar-box {
    padding: 2em 4em;
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 6em);
    grid-template-rows: 1em repeat(5, 6em);
    gap: 1em;
    justify-content: start;
  }

  .day-label {
    color: var(--gray-dark);
    text-align: center;
    justify-self: center;
    font-weight: 700;
    width: 100%;
  }

  h1 {
    margin-top: 0;
    font-weight: bold;
    color: var(--gray-dark);
  }
</style>