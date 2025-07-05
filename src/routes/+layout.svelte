<script lang="ts">
	import '../app.css';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { waitLocale } from 'svelte-i18n';
	import SideBar from '$lib/components/layout/SideBar.svelte';

	let { children } = $props();
	let loading = $state(true);

	onMount(async () => {
		await waitLocale(); // Espera a que el idioma se cargue
		loading = false; // Cambia el estado de carga cuando el idioma esté listo
	});
</script>

<svelte:head>
	<title>Personal Dashboard</title>
</svelte:head>

{#if loading}
	<div>Loading...</div>
{:else}
	<div id="app" class="p-4 md:gap-4">
		<SideBar />

		<main class="flex flex-col gap-4 overflow-y-auto p-3 [grid-area:main]">
			{@render children()}
		</main>
	</div>
{/if}

<style>
	#app {
		display: grid;
		grid-template-areas: 'aside main main';
		gap: 20px; /* Ajusta esto según tus necesidades */
		grid-template-columns: 256px 1fr;
		height: 100vh;
		max-height: 100vh;
	}
</style>
