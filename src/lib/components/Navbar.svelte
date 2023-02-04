<script lang="ts">
	import logo from '$lib/assets/habitrend-logo.svg';
</script>

<nav>
  <a href="/">
    <img src={logo} alt="logo-brand" />
  </a>
</nav>

<style lang="scss">
	nav {
		width: 2em;
		padding: 2em 1em;
		background: #03363d;

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
