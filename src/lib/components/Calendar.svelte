<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from "$app/stores";
	import type { Habit, HabitRecord } from "@prisma/client";
	import { habitRecordStore } from "../../store";
	import { DAY_NAMES, MONTH_NAMES } from "../constants";
	import { getDateQuery } from "../util";
	import Daybox from "./Daybox.svelte";
	import iconCalendar from '$lib/assets/icon-calendar.svg';
	import MonthPicker from './MonthPicker.svelte';

  export let habitRecords: HabitRecord[]
  habitRecordStore.set(habitRecords)
  
  const habits: Habit[] = $page.data.habits
  const habitId: number = Number($page.params.habitId)

  const { selectedMonth, selectedYear } = getDateQuery($page.url)

  const displayMonth = MONTH_NAMES[selectedMonth] + " " + selectedYear

  let openMonthPicker: boolean = false

  let selectedHabitId = habitId
  async function handleHabitSelect() {
    await goto(`/records/${selectedHabitId}`)
    window.location.reload()
  }
</script>

<div class="main-container">
  <div class="calendar-header">
    <div class="month-display" on:click={() => { openMonthPicker = !openMonthPicker }} on:keypress>
      <h1>{displayMonth}</h1>
      <img class="month-select-button" src={iconCalendar} alt="change-month">
    </div>
    
    <label for="habit" class="habit-label">
      Habit: 
      <select name="habit" bind:value={selectedHabitId} on:change={handleHabitSelect}>
        {#each habits as habit (habit.id)}
           <option value={habit.id} selected={habit.id === habitId}> {habit.name} </option>
        {/each}
      </select>
    </label>
  
    <MonthPicker open={openMonthPicker} />
  </div>
  <div class="day-names">
    {#each DAY_NAMES as dayname}
       <span class="day-label"> {dayname} </span>
    {/each}
  </div>
  <div class="calendar">
    {#each $habitRecordStore as habitRecord (habitRecord.id)}
      <Daybox habitRecord={habitRecord}/>
    {/each}
  </div>
</div>

<style lang="scss">
  .calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1em;
    position: relative;
  }

  .day-names {
    display: grid;
    gap: 1em;
    grid-template-columns: repeat(7, 6em);
    padding-bottom: 1em;
  }

  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 6em);
    grid-auto-rows: 6em;
    grid-auto-columns: 6em;
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
    text-transform: uppercase;
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
    background: var(--gray-dark);
    color: white;
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
    border-radius: 0px;
    padding: 1em;
  }

  .month-display {
    display: flex;
    column-gap: 1em;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;

    &:hover .month-select-button {
      opacity: 1;
    }
  }

  .month-select-button {
    opacity: 0;
    filter: invert(76%);
    height: 1.5em;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
</style>