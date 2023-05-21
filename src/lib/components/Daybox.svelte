<script lang="ts">
	import { page } from "$app/stores";
	import type { HabitRecord } from "@prisma/client";
	import { selectedHabitRecord, showSidepanel } from "../../store";
	import { getDateQuery } from "../util";
  
  export let habitRecord: HabitRecord
  const { date } = habitRecord
  $: status = habitRecord.status

  const { selectedMonth, selectedYear } = getDateQuery($page.url)

  const today = new Date()
  const selectedDay = new Date(selectedYear, selectedMonth, today.getDate())

  const isCurrentMonthTag = (date.getMonth() !== selectedDay.getMonth()) ? 'inactive-month' : ''
  const isFutureTag = (date > today) ? 'future-date' : ''
  let selectedTag: string
  selectedHabitRecord.subscribe(habitRecord => {
    const isSelected = (date.toLocaleDateString() === habitRecord?.date.toLocaleDateString())
    const isToday = ((today.toLocaleDateString() === date.toLocaleDateString()) && !habitRecord)
    selectedTag = (isToday || isSelected) ? 'selected' : ''
  })
  function selectDay() {
    selectedHabitRecord.set(habitRecord)
    showSidepanel.set(true)
  }
</script>

<div class="daybox {status} {isCurrentMonthTag} {isFutureTag} {selectedTag}" on:click={selectDay} on:keypress={selectDay}>
  <span>{date.getDate()}</span>
</div>


<style lang="scss">
  .daybox {
    display: flex;
    width: 100%;
    height: 100%;
    background: #E3E3E3;
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.21);
    border-radius: 4px;
    justify-content: end;
    cursor: pointer;

    &:not(.future-date):hover {
      box-shadow:inset 0px 0px 0px 2.5px var(--gray-light);
    }
  }

  .missed {
    background: #FF9D88;
  }
  .unmarked {
    background: #E3E3E3;
  }
  .done {
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

  .inactive-month:not(.future-date) {
    opacity: 0.7;
    cursor: default;
  }

  .future-date.inactive-month {
    span {
      color: var(--gray-light);
    }
  }

  .future-date {
    filter: brightness(80%);
    cursor: default;
  }

  .selected {
    box-shadow:inset 0px 0px 0px 2.5px #757575;
  }
</style>