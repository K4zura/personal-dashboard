<script lang="ts">
	import '../../app.css';
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
	<title>Login Dashboard</title>
</svelte:head>

{#if loading}
	<div>Loading...</div>
{:else}
	<main class="flex h-screen w-screen items-center justify-center">
		<div class="relative z-10 flex w-[920px] items-center select-none">
			{@render children()}
		</div>
	</main>
{/if}
