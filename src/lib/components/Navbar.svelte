<script lang="ts">
	import logo from '$lib/assets/habitrend-logo.svg';
	import iconCalendar from '$lib/assets/icon-calendar.svg';
	import iconHabit from '$lib/assets/icon-habit.svg';
	import iconUser from '$lib/assets/icon-user.svg';
</script>

<nav>
	<div class="nav-brand">
		<a href="/">
			<img src={logo} alt="logo-brand" />
		</a>
	</div>
	<ul class="nav-items">
		<li>
			<a href="/">
				<img class="nav-icon" src={iconCalendar} alt="icon-calendar">
			</a>
		</li>
		<li>
			<a href="/habits">
				<img class="nav-icon" src={iconHabit} alt="icon-habits">
			</a>
		</li>
	</ul>
	<div class="nav-bottom">
		<form action="/logout" method="POST">
			<button type="submit">
				<img class="nav-icon" src={iconUser} alt="icon-user">
			</button>
		</form>
	</div>
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

	.nav-brand {
		padding-bottom: 3.5em;
	}

	.nav-items {
		display: flex;
		flex-direction: column;
		row-gap: 2em;
		list-style-type: none;
		margin: 0;
		padding: 0;

		li {
			margin: 0;
			padding: 0;
		}
	}

	.nav-icon {
		width: 2.2em;
		height: 2.2em;
	}
	.nav-bottom {
		margin-top: auto;
	}

	.nav-bottom {
		button {
			background: none;
			border: none;
			cursor: pointer;
		}
	}
</style>
