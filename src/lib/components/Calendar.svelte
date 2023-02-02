<script lang="ts">
	import Daybox from "./Daybox.svelte";

  const monthlyDates: Date[] = []
  const today = new Date()
  const month = today.getMonth()
  const year = today.getFullYear()

  const firstDayofMonth = new Date(year, month, 1)
  const lastDayOfMonth = new Date(year, month+1, 0);

  const prevMonthDayCount = firstDayofMonth.getDay()
  const nextMonthDayCount = 6 - lastDayOfMonth.getDay()
  for (let i = 1; i < lastDayOfMonth.getDate() + 1; i++) {
    monthlyDates.push(new Date(year, month, i))
  }
  const daynames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
  const monthName = today.toLocaleString('default', { month: 'long' }).toLocaleUpperCase()
</script>

<div class="calendar-box">
  <h1>{monthName}</h1>
  <div class="calendar">
    {#each daynames as dayname}
       <span class="day-label"> {dayname} </span>
    {/each}
    {#each {length: prevMonthDayCount} as _, i}
      <Daybox date={new Date(year, month -1, i)} isCurrentMonth={false}/>
    {/each}
    {#each monthlyDates as day}
       <Daybox date={day}/>
    {/each}
    {#each {length: nextMonthDayCount} as _, i}
      <Daybox date={new Date(year, month +1, i+1)} isCurrentMonth={false}/>
    {/each}
  </div>
</div>

<style>
  .calendar-box {
    padding: 2em;
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