<script lang="ts">
	import type { HabitRecord, HabitStatus } from "../types";
  import { DateTime } from "luxon";

  export let habitRecord: HabitRecord = {
    id: 1,
    date: new Date(),
    habit: {
      id: 1,
      name: 'Workout'
    },
    status: 'did'
  }
  export let selectedStatus: HabitStatus = habitRecord.status
  const displayDate = DateTime.fromJSDate(habitRecord.date).toFormat('EEEE, dd LLLL')
</script>

<section class="sidepanel">
  <div class="date-header">
    {displayDate}
  </div>
  <div class="habit">
    <div class="habit-name">{habitRecord.habit.name}</div>
    <div class="input-group">
      {#each ['did', 'missed'] as status}
        <label class="{status}" style={selectedStatus === status ? `box-shadow:inset 0px 0px 0px 2px var(--${status});` : ''}>
          <input class={status} type=radio bind:group={selectedStatus} name="status" value={status} checked={selectedStatus === status}>
          <span class="radio-text">{status}</span>
        </label>
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  .sidepanel {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em;
    background: #FAFAFA;
    box-shadow: 2px 0px 9.00396px rgba(0, 0, 0, 0.1);
    margin-left: -1em;
    width: fit-content;
  }

  .date-header {
    border-bottom: 1px solid darkgray;
    padding: 0 0 1em 0;
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