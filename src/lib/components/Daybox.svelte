<script lang="ts">
	import type { HabitRecord } from "@prisma/client";
	import { selectedHabitRecord, showSidepanel } from "../../store";
  
  export let habitRecord: HabitRecord
  const { date } = habitRecord
  $: status = habitRecord.status

  const today = new Date()
  const isCurrentMonth: boolean = date.getMonth() === today.getMonth()
  const isCurrentMonthTag = !(date.getMonth() === today.getMonth()) ? 'inactive-month' : ''
  const isFutureTag = (today < date) ? 'future-date' : ''

  function selectDay() {
    selectedHabitRecord.set(habitRecord)
    showSidepanel.set(true)
  }
</script>

<div class="daybox {status} {isCurrentMonthTag} {isFutureTag}" on:click={selectDay} on:keypress={selectDay}>
  <span>{date.getDate()}</span>
</div>


<style>
  .daybox {
    display: flex;
    width: 100%;
    height: 100%;
    background: #E3E3E3;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.21);
    border-radius: 4px;
    justify-content: end;
    cursor: pointer;
  }

  .missed {
    background: #FF9D88;
  }
  .unmarked {
    background: #E3E3E3;
  }
  .did {
    background: #3AE9C9;
  }
  .future {
    background: #C6C6C6;
  }

  span {
    color: #4F4F4F;
    padding: .5em;
    line-height: 1em;
    font-weight: 700;
  }

  .inactive-month {
    opacity: 0.7;
    cursor: default;
  }

  .future-date:not(.inactive-month) {
    filter: brightness(95%);
    cursor: default;
  }
</style>