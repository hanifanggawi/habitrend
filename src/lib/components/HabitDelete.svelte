<script lang="ts">
	import type { Habit } from "@prisma/client";

  export let habit: Habit | null
  export let handleClose: () => void;
</script>

<div class="modal-content">
  <p class="modal-message">
    Are you sure you want to delete habit <strong>{habit?.name.toUpperCase()}</strong>? <br> 
    All records of this habit will also be deleted
  </p>
  <form class="buttons" action="?/delete" method="POST">
    <button class="button-fill danger" type="submit">
      DELETE
    </button>
    <button class="button-fill" type="button" on:click={handleClose}>
      CANCEL
    </button>
  </form>
</div>


<style>
  .modal-content {
    display: flex;
    flex-direction: column;
    row-gap: 1em;
  }

	.modal-message {
		text-align: center;
	}

  .buttons {
    display: flex;
    column-gap: 1em;
    justify-content: center;
  }
</style>
