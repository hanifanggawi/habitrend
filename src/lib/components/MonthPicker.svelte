<script lang="ts">
	import { goto } from "$app/navigation";
	import { MONTH_NAMES } from "../constants";

  export let open: boolean

  const today = new Date()
  let month: number
  let year: number = today.getFullYear()

  async function handleChange() {
    const params = new URLSearchParams({
      month: String(month),
      year: String(year)
    })
    await goto(`?${params}`)
    window.location.reload()
  }
</script>

{#if open}
  <div class="picker">
    <div class="year-picker">
      <button class="arrow-left" on:click={() => year--}></button>
      <span class="year">{year}</span>
      <button class="arrow-right" on:click={() => year++}></button>
    </div>
    <div class="month-picker">
      {#each MONTH_NAMES as monthName, monthIndex}
        <label class="month-label">
          <input type=radio bind:group={month} name="status" value={monthIndex} on:change={handleChange}>
          <span class="radio-text">{monthName}</span>
        </label>
      {/each}
    </div>
  </div>
{/if}


<style lang="scss">
  .picker {
    padding: 1em;
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    background: white;
    border-radius: 4px;
    box-shadow: var(--light-shadow);
    position: absolute;
    left: 0;
    top: 3em;
    z-index: 10;
  }

  label {
    display: flex;
    justify-content: center;
    background: #F2F2F0;
    padding: 0.6em;
    border-radius: 4px;
    font-weight: 500;
    font-size: smaller;
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
  }

  .month-picker {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    gap: 0.5em;
  }

  .year-picker {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    column-gap: 0.5em;
  }

  .year {
    margin-left: .1em;
    font-weight: 600;
  }

  .arrow-left, .arrow-right {
    cursor: pointer;
    color: var(--gray-dark);
    font-weight: 700;
    height: .40em;
    width: .40em;
    border:  solid var(--gray-dark);
    border-width:0 0 3.5px 3.5px ;
    background: none;
    margin-left: 5px;
    padding: 0;
  }

  .arrow-right {
      transform: rotate(225deg);
  }

  .arrow-left {
      transform: rotate(45deg);
  }
</style>
