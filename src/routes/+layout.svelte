<script>
  import '../app.css';
</script>

<div class="main-container">
  <nav>
    <img src="habitrend-logo.svg" alt="">
  </nav>
  <slot />
</div>


<style lang="scss">
  .main-container {
    display: grid;
    grid-template-columns: 5em auto 1fr;
    min-height: 100vh;
    justify-content: stretch;
  }

  nav {
    width: 2em;
    padding: 1em;
    background: #03363D;

    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: -2px 0px 9.00396px rgba(0, 0, 0, 0.1);

    img {
      width: 2.2em;
      height: 2.2em;
    }
  }
</style>