<script lang="ts">
  export let showModal: boolean
</script>

{#if showModal}
  <div class="modal-box">
    <div class="alert-box">
      <slot>
      </slot>
    </div>
  </div>
{/if}

<style>
  .modal-box {
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  .alert-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #1b1b1b;
    padding: 2em;
    min-width: 10vh;
    max-width: 33vw;
    background: #ffffff;
    border-radius: 4px;
    row-gap: 2em;
    box-shadow: 0px 0px 15px 5px rgba(29, 29, 29, 0.25);
  }
</style>