<script lang="ts">
	import { selectedHabitRecord } from "../../store";
	import HabitRecordEdit from "./HabitRecordEdit.svelte";
</script>

<section class="sidepanel">
  <HabitRecordEdit habitRecord={$selectedHabitRecord}/>
</section>

<style lang="scss">
  .sidepanel {
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding: 2em 4em;
    background: #FAFAFA;
    box-shadow: 2px 0px 9.00396px rgba(0, 0, 0, 0.1);
    margin-left: -1em;
    width: fit-content;
    justify-self: flex-end;
  }
</style>