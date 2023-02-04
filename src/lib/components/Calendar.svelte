<script lang="ts">
	import { page } from "$app/stores";
	import type { Habit, HabitRecord } from "@prisma/client";
  import { goto, invalidate } from '$app/navigation';
	import { get } from "svelte/store";
	import { habitRecordStore } from "../../store";
	import { DAY_NAMES } from "../constants";
	import Daybox from "./Daybox.svelte";

  export let habitRecords: HabitRecord[]
  habitRecordStore.set(habitRecords)
  const today = new Date()
  const year = today.getFullYear()

  const habits: Habit[] = get(page).data.habits
  const habitId: number = Number(get(page).params.habitId)

  const displayMonth = today.toLocaleString('default', { month: 'long' }).toLocaleUpperCase() + " " + year

  let selectedHabitId = habitId
  async function handleHabitSelect() {
    await goto(`/records/${selectedHabitId}`)
    window.location.reload()
  }
</script>

<div class="calendar-box">
  <div class="calendar-header">
    <h1>{displayMonth}</h1>
    <label for="habit" class="habit-label">
      Habit: 
      <select name="habit" bind:value={selectedHabitId} on:change={handleHabitSelect}>
        {#each habits as habit (habit.id)}
           <option value={habit.id} selected={habit.id === habitId}> {habit.name} </option>
        {/each}
      </select>
    </label>
  </div>
  <div class="calendar">
    {#each DAY_NAMES as dayname}
       <span class="day-label"> {dayname} </span>
    {/each}
    {#each $habitRecordStore as habitRecord (habitRecord.id)}
      <Daybox habitRecord={habitRecord}/>
    {/each}
  </div>
</div>

<style lang="scss">
  .calendar-box {
    padding: 2em 4em;
  }

  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1em;
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
    margin: 0;
    font-weight: bold;
    color: var(--gray-dark);
  }

  .habit-label {
    font-weight: 600;
    color: var(--gray-light);
  }

  select {
    font-weight: 700;
    border: none;
    background: #fff;
    padding: .7em 1em;
    border-radius: 4px;
    appearance: none;
    cursor: pointer;
    margin-left: 1em;
		box-shadow: 2px 2px 9.00396px rgba(0, 0, 0, 0.08);
    text-transform: uppercase;
    color: var(--gray-dark);
    text-align: center;


    &:focus {
      outline: none;
    }
  }

  option {
    appearance: none;
    cursor: pointer;
    font-weight: 600;
    text-transform: uppercase;
  }
</style>