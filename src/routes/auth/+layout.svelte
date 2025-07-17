<script lang="ts">
	import '../../app.css';
	import '$lib/i18n';
	import { onMount } from 'svelte';
	import { waitLocale } from 'svelte-i18n';
	import ThemeSelector from '$lib/components/shared/ThemeSelector.svelte';
	import LangSelector from '$lib/components/shared/LangSelector.svelte';
	// Ejemplo Svelte: selector de tema
	let theme = $state('light');

	// Persistir en localStorage
	function applyTheme(t: string) {
		theme = t;
		document.documentElement.className = t; // reemplaza completa
		localStorage.setItem('theme', t);
	}
	function onChange(event: Event) {
		const select = event.target as HTMLSelectElement; // ① cast explícito
		applyTheme(select.value);
	}

	// Cargar preferencia al iniciar

	let { children } = $props();
	let loading = $state(true);

	onMount(async () => {
		applyTheme(localStorage.getItem('theme') ?? theme);
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
	<!-- <main class="flex h-screen w-screen items-center justify-center">
		<div class="relative z-10 flex w-[920px] items-center select-none">
			{@render children()}
		</div>
	</main> -->
	<main class="bg-dark relative flex h-dvh items-center justify-center">
		<div class="absolute top-5 right-5 flex gap-2">
			<ThemeSelector />
			<LangSelector />
		</div>
		<div
			class="bg-surface border-primary relative flex h-min w-[450px] min-w-80 flex-col items-center overflow-hidden border-4 px-8 py-6"
		>
			<span class="bg-tertiary absolute -inset-2 size-8 rotate-45"></span>
			<span class="bg-accent absolute -top-2 -right-2 size-8 rotate-45"></span>
			<span class="bg-error absolute -bottom-2 -left-2 size-8 rotate-45"></span>
			<span class="bg-success absolute -right-2 -bottom-2 size-8 rotate-45"></span>
			{@render children()}
		</div>
	</main>
{/if}
