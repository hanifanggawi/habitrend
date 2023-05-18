<script lang="ts">
	import { goto } from '$app/navigation';
	import type { Habit } from '@prisma/client';
	import HabitDelete from './HabitDelete.svelte';
	import Modal from './Modal.svelte';

	export let habit: Habit | null = null;
	export let action: 'add' | 'update' = 'add';
	const actionPath = action === 'add' ? '/habits/add' : `?/update`;

	let showModal = false;

	function handleCancel() {
		goto('/habits');
	}

	function toggleModal() {
		showModal = !showModal;
	}
</script>


<div class="main-container">
	{#if action === 'update'}
		<span class="sub-header">EDIT HABIT</span>
		<h1>{habit?.name}</h1>
	{:else}
		<h1>ADD HABIT</h1>
	{/if}
	<form class="form-box" action={actionPath} method="POST">
		{#if habit}
			<input type="hidden" name="id" value={habit.id} />
		{/if}
		<label class="form-label" for="name">
			<span>Habit Name</span>
			<input
				class="form-input"
				type="text"
				name="name"
				placeholder="Habit Name"
				value={habit?.name || ''}
			/>
		</label>
		<label class="form-label" for="description">
			<span>Habit Description</span>
			<input
				class="form-input"
				type="text"
				name="description"
				placeholder="Habit Description"
				value={habit?.description || ''}
			/>
		</label>
		<div class="form-buttons">
			<button
				class="button-fill danger"
				style={action === 'add' ? 'visibility: hidden;' : ''}
				type="button"
				on:click={toggleModal}
			>
				DELETE
			</button>
			<button class="button-outline" type="button" on:click={handleCancel}>CANCEL</button>
			<button class="button-fill">SAVE</button>
		</div>
	</form>
</div>
<Modal bind:showModal>
	<HabitDelete handleClose={toggleModal} habit={habit}/>
</Modal>

<style lang="scss">
	h1 {
		color: var(--gray-dark);
		margin-bottom: 1em;
		text-transform: uppercase;
	}

	.sub-header {
		text-transform: uppercase;
		font-size: larger;
		color: var(--gray-light);
	}

	form {
		display: flex;
		flex-direction: column;
		row-gap: 1.5em;
		color: var(--gray-dark);
	}

	.form-label {
		display: flex;
		flex-direction: column;
		row-gap: 0.5em;
		color: var(--gray-dark);

		span {
			font-size: larger;
			font-weight: 600;
		}
	}

	.form-input {
		border: none;
		box-shadow: 0px 0px 9.00396px rgba(0, 0, 0, 0.21);
		border-radius: 4px;
		padding: 0.7em 1em;
		font-size: larger;
		min-width: 30em;
		color: var(--gray-dark);

		&:hover,
		&:focus {
			background: var(--gray-medium);
			color: var(--white);
			outline: none;

			&::placeholder {
				color: #c7c7c7;
			}
		}
	}

	.form-buttons {
		padding-top: 2em;
		display: grid;
		grid-template-columns: 1fr auto auto;
		justify-content: flex-end;
		column-gap: 1em;
	}
</style>
