<script lang="ts">
	import type { HabitStatus } from "../types";
  import { DateTime } from "luxon";
	import { habitRecordStore, selectedHabitRecord } from "../../store";
  import { page } from '$app/stores';
	import type { Habit, HabitRecord } from "@prisma/client";

  export let habitRecord: HabitRecord = $selectedHabitRecord
  const habit: Habit = $page.data.habit
  let selectedStatus = habitRecord.status as HabitStatus
  let displayDate = DateTime.fromJSDate(habitRecord.date).toFormat('EEEE, dd LLLL')
  selectedHabitRecord.subscribe(habitRecord => {
    console.log('DISINI habitRecord.id', habitRecord.id)
    selectedStatus = habitRecord.status as HabitStatus
    displayDate = DateTime.fromJSDate(new Date(habitRecord.date)).toFormat('EEEE, dd LLLL')
  })

  async function updateRecord() {
    const reqBody = {
      habitId: habitRecord.habitId,
      status: selectedStatus,
      date: habitRecord.date
    }
    console.log('DISINI reqBody', reqBody)
    const response = await fetch('/api/habit-record', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody)
    })
    const { data: updatedHabitRecord } = await response.json()
    console.log('DISINI updatedHabitRecord', updatedHabitRecord)
    habitRecordStore.update((habitRecords) => {
      const index = habitRecords.findIndex(record => record.id === habitRecord.id)
      habitRecords[index] = { 
        ...updatedHabitRecord, 
        date: new Date(updatedHabitRecord.date)
      }
      return habitRecords
    })
    return updatedHabitRecord
  }

</script>

<div>
  <div class="date-header">
    {displayDate}
  </div>
  <div class="habit">
    <div class="habit-name">{habit?.name}</div>
    <div class="input-group">
      {#each ['done', 'missed', 'unmarked'] as status}
        <label class="{status}" style={selectedStatus === status ? `box-shadow:inset 0px 0px 0px 2px var(--${status});` : ''}>
          <input class={status} type=radio bind:group={selectedStatus} name="status" value={status} checked={selectedStatus === status} on:change={updateRecord}>
          <span class="radio-text">{status}</span>
        </label>
      {/each}
    </div>
  </div>
</div>

<style lang="scss">
  .date-header {
    font-weight: bold;
    color: var(--gray-dark);
    font-size: 1.1em;
    border-bottom: 2px solid var(--gray-dark);
    text-transform: uppercase;
    padding: 0.5em 0;
    margin-bottom: 1em;
  }

  .habit {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

  .input-group {
    display: flex;
    column-gap: 1em;
  }

  label {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F2F2F0;
    padding: 0.7em;
    border-radius: 4px;
    column-gap: 1em;
    font-weight: 600;
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
      background: #ecece7;
    }
  }

  input[type="radio"] {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
    font: inherit;
    width: 1.5em;
    height: 1.5em;
    border-radius: 4px;
  }

  .habit-name {
    font-weight: 600;
  }

  .radio-text {
    text-transform: capitalize;
  }
</style>