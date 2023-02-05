<script lang="ts">
	import type { PageData } from "./$types";
	import editIcon from '$lib/assets/edit-icon.svg';
	import { goto } from "$app/navigation";

  export let data: PageData
  const { habits } = data

  function handleClick() {
    goto('/habits/add')
  }
</script>

<div class="main-container">
  <div class="page-header">
    <h1>HABITS</h1>
    <button class="button-fill" on:click={handleClick}>
      NEW HABIT
    </button>
  </div>
  <div class="habits">
    {#each habits as habit (habit.id)}
       <a href="/habits/{habit.id}" class="habit">
          <h3>{habit.name}</h3>
          <p>{habit.description || 'No description'}</p>
          <img class="edit-icon" src={editIcon} alt="edit">
       </a>
    {/each}
  </div>
</div>

<style lang="scss"> 
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 2em;
  }
  h1 {
    color: var(--gray-dark);
    margin: 0;
  }

  .habits {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
    min-width: 30em;
  }
  .habit {
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    color: var(--gray-dark);
    box-shadow: 0px 0px 9.00396px rgba(0, 0, 0, 0.21);
    border-radius: 5px;
    padding: 1.2em 1.5em;
    row-gap: .3em;
    position: relative;
    cursor: pointer;

    h3 {
      font-weight: 700;
      font-size: larger;
      text-transform: uppercase;
    }

    p {
      font-weight: lighter;
    }

    &:hover {
      background: var(--gray-dark);
      color: var(--white);
    }

    &:hover .edit-icon{
      filter: brightness(0) invert(1);
    }
  }

  .edit-icon {
    position: absolute;
    bottom: 1.2em;
    right: 1.2em;
    width: 1em;
    height: 1em;
  }
</style>